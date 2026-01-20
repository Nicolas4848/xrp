import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"; // Import the provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Updated Viewport: Changes address bar color based on system theme
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

// 2. Your Strong XRP Metadata
export const metadata: Metadata = {
  title: {
    default: "XRP | Secure Web3 Connection",
    template: "%s | XRP Explorer", // Fixed template to use dynamic page titles
  },
  description:
    "The most trusted directory for Web3 wallets. Securely connect, explore, and resolve issues with MetaMask, Trust Wallet, Ledger, and hundreds of other blockchain providers.",
  
  keywords: [
    "crypto wallet",
    "web3",
    "blockchain",
    "walletconnect",
    "defi",
    "ethereum",
    "secure connection",
    "dapp explorer",
    "XRP",
    "Ripple"
  ],

  authors: [{ name: "XRP Explorer Team" }],
  creator: "XRP Explorer",
  publisher: "XRP Explorer Inc.",

  metadataBase: new URL("https://wallet-explorer-app.vercel.app"), 

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wallet-explorer-app.vercel.app",
    siteName: "XRP Explorer",
    title: "XRP Explorer | Secure Web3 Connection",
    description:
      "Connect seamlessly with the decentralized web. Support for 300+ wallets including MetaMask, Ledger, and Trust wallet.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "XRP Explorer Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "XRP Explorer | Secure Web3 Connection",
    description: "The trusted gateway to the decentralized world. Connect your assets securely.",
    images: ["/og-image.png"],
    creator: "@XRPexplorer",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 3. suppressHydrationWarning is required for next-themes to work without errors
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 4. Wrap app in ThemeProvider */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}