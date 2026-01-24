import { NextResponse } from "next/server";

// -----------------------
// Rate limiting config
// -----------------------

const GLOBAL_WINDOW_MS = 2 * 60 * 60 * 1000; // 2 hours
const MAX_MESSAGES_PER_WINDOW = 3; // Max 3 messages per 2h (per IP)

const DAILY_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_MESSAGES_PER_DAY = 10; // Max 10 / day per IP

const MIN_TIME_SINCE_LOAD_MS = 3000; // must wait 4s after page load

const MAX_DUPLICATES_PER_WINDOW = 2;
const MIN_MESSAGE_LENGTH = 5;
const BLOCK_LINKS = true;

const FIRST_COOLDOWN_MS = GLOBAL_WINDOW_MS; // 2h
const SECOND_COOLDOWN_MS = 24 * 60 * 60_000; // 24h
const THIRD_COOLDOWN_MS = 7 * 24 * 60 * 60_000; // 7 days
const PERMA_BLOCK_MS = 365 * 24 * 60 * 60_000; // 1 year

const DEBUG = process.env.NODE_ENV !== "production";

type Bucket = {
  timestamps: number[]; // last 2h
  texts: string[];
  violations: number;
  blockedUntil: number | null;
  lastMessageAt: number | null;
  dailyTimestamps: number[]; // last 24h
};

const messageBuckets = new Map<string, Bucket>();

// -----------------------
// Helpers
// -----------------------

function getClientKey(req: Request): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown-ip";

  return ip;
}

function getOrInitBucket(key: string): Bucket {
  const existing = messageBuckets.get(key);
  if (existing) return existing;
  const bucket: Bucket = {
    timestamps: [],
    texts: [],
    violations: 0,
    blockedUntil: null,
    lastMessageAt: null,
    dailyTimestamps: [],
  };
  messageBuckets.set(key, bucket);
  return bucket;
}

function containsLink(text: string): boolean {
  const linkRegex = /(https?:\/\/[^\s]+|t\.me\/[^\s]+|www\.[^\s]+)/i;
  return linkRegex.test(text);
}

function hasTooManyRepeats(text: string): boolean {
  const repeatRegex = /(.)\1{4,}/;
  return repeatRegex.test(text);
}

function isShouting(text: string): boolean {
  const letters = text.replace(/[^a-zA-Z]/g, "");
  if (letters.length < 10) return false;
  const upper = letters.replace(/[^A-Z]/g, "");
  return upper.length / letters.length > 0.8;
}

function looksLikeBotUserAgent(req: Request): boolean {
  const ua = req.headers.get("user-agent") || "";

  // If UA is missing, be lenient in case it's a proxy / dev environment
  if (!ua) return false;

  if (
    /bot|crawl|spider|curl|wget|python-requests|httpclient|scrapy/i.test(ua)
  ) {
    return true;
  }

  return false;
}

function applyViolationCooldown(
  bucket: Bucket,
  code: string,
): { blocked: true; reason: string; code: string } {
  const now = Date.now();

  bucket.violations += 1;
  const v = bucket.violations;

  let duration: number;
  if (v === 1) duration = FIRST_COOLDOWN_MS;
  else if (v === 2) duration = SECOND_COOLDOWN_MS;
  else if (v === 3) duration = THIRD_COOLDOWN_MS;
  else duration = PERMA_BLOCK_MS;

  bucket.blockedUntil = now + duration;

  if (DEBUG) console.log("[RATE LIMIT] cooldown from", code, "violations:", v);

  return {
    blocked: true,
    reason:
      "You have been temporarily blocked for spam or too many messages. Please try again later.",
    code,
  };
}

function isRateLimitedOrSpam(
  key: string,
  text: string,
  req: Request,
): { blocked: boolean; reason?: string; code?: string } {
  const now = Date.now();
  const windowStart = now - GLOBAL_WINDOW_MS;
  const dayStart = now - DAILY_WINDOW_MS;

  const bucket = getOrInitBucket(key);

  // Active cooldown
  if (bucket.blockedUntil && now < bucket.blockedUntil) {
    if (DEBUG) console.log("[RATE LIMIT] active cooldown");
    return {
      blocked: true,
      reason:
        "You are temporarily blocked due to previous spam or too many messages. Please try again later.",
      code: "ACTIVE_COOLDOWN",
    };
  }

  // Clean 2h + 24h windows
  const newTimestamps: number[] = [];
  const newTexts: string[] = [];
  for (let i = 0; i < bucket.timestamps.length; i++) {
    if (bucket.timestamps[i] > windowStart) {
      newTimestamps.push(bucket.timestamps[i]);
      newTexts.push(bucket.texts[i]);
    }
  }
  bucket.timestamps = newTimestamps;
  bucket.texts = newTexts;

  bucket.dailyTimestamps = bucket.dailyTimestamps.filter((ts) => ts > dayStart);

  // 2h per-IP limit
  if (bucket.timestamps.length >= MAX_MESSAGES_PER_WINDOW) {
    return applyViolationCooldown(bucket, "2H_WINDOW_LIMIT");
  }

  // 24h per-IP limit
  if (bucket.dailyTimestamps.length >= MAX_MESSAGES_PER_DAY) {
    return applyViolationCooldown(bucket, "DAILY_LIMIT");
  }

  // Fast repeat (bot-ish)
  if (bucket.lastMessageAt) {
    const diff = now - bucket.lastMessageAt;
    if (diff < 1000 && text.length > 40) {
      return applyViolationCooldown(bucket, "FAST_REPEAT");
    }
  }

  // Bot UA
  if (looksLikeBotUserAgent(req)) {
    return applyViolationCooldown(bucket, "BOT_USER_AGENT");
  }

  // Duplicate text
  // const normalized = text.toLowerCase();
  // const duplicateCount = bucket.texts.filter(
  //   (t) => t.toLowerCase() === normalized
  // ).length;
  // if (duplicateCount >= MAX_DUPLICATES_PER_WINDOW) {
  //   return applyViolationCooldown(bucket, "DUPLICATE_TEXT");
  // }

  // Content checks
  if (BLOCK_LINKS && containsLink(text)) {
    return applyViolationCooldown(bucket, "LINK_DETECTED");
  }

  if (hasTooManyRepeats(text)) {
    return applyViolationCooldown(bucket, "TOO_MANY_REPEATS");
  }

  if (isShouting(text)) {
    return applyViolationCooldown(bucket, "SHOUTING");
  }

  // Accept
  bucket.timestamps.push(now);
  bucket.dailyTimestamps.push(now);
  bucket.texts.push(text);
  bucket.lastMessageAt = now;

  if (DEBUG) {
    console.log("[RATE LIMIT] accepted", {
      key,
      count2h: bucket.timestamps.length,
      count24h: bucket.dailyTimestamps.length,
    });
  }

  return { blocked: false };
}

// -----------------------
// Telegram sender
// -----------------------
async function sendMessageToTelegram(text: string) {
  const token = process.env.DB_HOST; // change this to your real env var
  const chatId = process.env.DB_ID;
  if (!token) {
    throw new Error("Telegram bot token is missing.");
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(
      `PI Network error: ${errData.description || "Unknown error"}`,
    );
  }

  return res.json();
}

// -----------------------
// Route handler
// -----------------------
export async function POST(req: Request) {
  try {
    const { chatId, text, timeSinceLoadMs } = await req.json();

    if (!chatId || !text) {
      return NextResponse.json(
        { success: false, error: "chatId and text are required" },
        { status: 400 },
      );
    }

    const trimmed = String(text).trim();

    if (!trimmed) {
      return NextResponse.json(
        { success: false, error: "Empty messages are not allowed." },
        { status: 400 },
      );
    }

    if (trimmed.length < MIN_MESSAGE_LENGTH) {
      return NextResponse.json(
        { success: false, error: "Message is too short to be useful." },
        { status: 400 },
      );
    }

    if (trimmed.length > 500) {
      return NextResponse.json(
        { success: false, error: "Message too long." },
        { status: 400 },
      );
    }

    // 4-second rule
    if (
      typeof timeSinceLoadMs === "number" &&
      timeSinceLoadMs < MIN_TIME_SINCE_LOAD_MS
    ) {
      if (DEBUG)
        console.log("[RATE LIMIT] 4s gate blocked", { timeSinceLoadMs });
      return NextResponse.json(
        {
          success: false,
          error:
            "Please wait a few seconds after loading the page before sending a message.",
          errorCode: "FOUR_SECOND_RULE",
        },
        { status: 429 },
      );
    }

    // const key = getClientKey(req);
    // const { blocked, reason, code } = isRateLimitedOrSpam(key, trimmed, req);

    // if (blocked) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       error: reason || "Too many messages. Please slow down.",
    //       errorCode: code || "UNKNOWN",
    //     },
    //     { status: 429 },
    //   );
    // }

    const result = await sendMessageToTelegram(trimmed);

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error sending message:", error?.message || error);

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message || "An unexpected error occurred. Please try again.",
      },
      { status: 500 },
    );
  }
}
