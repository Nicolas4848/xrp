import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Separate Viewport export (Next.js 14+)
export const viewport: Viewport = {
  themeColor: "#0f172a", // Matches your slate-900 bg
  width: "device-width",
  initialScale: 1,
};

// 2. Strong SEO & Social Metadata
export const metadata: Metadata = {
  // Base Title & Template for child pages
  title: {
    default: "XRP | Secure Web3 Connection",
    template: "MetaMask | Wallet Explore", // e.g., "MetaMask | Wallet Explorer"
  },
  description:
    "The most trusted directory for Web3 wallets. Securely connect, explore, and resolve issues with MetaMask, Trust Wallet, Ledger, and hundreds of other blockchain providers.",
  
  // Search Engine Keywords
  keywords: [
    "crypto wallet",
    "web3",
    "blockchain",
    "walletconnect",
    "defi",
    "ethereum",
    "secure connection",
    "dapp explorer",
  ],

  // Authors & Creator
  authors: [{ name: "XRP Explorer Team" }],
  creator: "XRP Explorer",
  publisher: "XRP Explorer Inc.",

  // Base URL (Replace with your actual domain)
  metadataBase: new URL("https://wallet-explorer-app.vercel.app"), 

  // Open Graph (Facebook, LinkedIn, Discord previews)
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
        url: "/og-image.png", // Ensure you add this image to your /public folder
        width: 1200,
        height: 630,
        alt: "XRP Explorer Preview",
      },
    ],
  },

  // Twitter Card (X previews)
  twitter: {
    card: "summary_large_image",
    title: "XRP Explorer | Secure Web3 Connection",
    description: "The trusted gateway to the decentralized world. Connect your assets securely.",
    images: ["/og-image.png"], // Same image as OG
    creator: "@XRPexplorer", // Your Twitter handle
  },

  // Icons (Favicon, Apple Touch Icon)
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Robot Crawling (Allow Google to index your site)
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}