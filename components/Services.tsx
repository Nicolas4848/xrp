"use client";

import {
    TrendingUp,
    Activity,
    Globe,
    Wallet,
    ArrowUpRight,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";

export default function Services() {
    return (
        <section className="relative py-24 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">

            {/* 1. Ambient Background (Matches Hero Flow) */}
            <div className="absolute top-0 right-0 w-2000 h-2000 bg-purple-100/40 dark:bg-purple-900/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-150 h-150 bg-blue-50/40 dark:bg-blue-900/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] mask-image:linear-gradient(to_bottom,transparent,white,transparent) pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

                {/* 2. Top Split Layout: Narrative & Stats */}
                <div className="flex flex-col lg:flex-row gap-16 lg:items-start mb-20">

                    {/* Left: The Narrative */}
                    <div className="lg:w-1/2 relative space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-200 dark:border-green-800 bg-green-50/80 dark:bg-green-900/20 backdrop-blur-sm">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">
                                Market Update: Bullish Momentum
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-[1.1]">
                            XRP Ledger Hits <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                                180-Day Activity High
                            </span>
                        </h2>

                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                            Driven by payments, DeFi, and RLUSD integrations, the ledger is processing <span className="text-slate-900 dark:text-white font-bold">1.45 million daily transactions</span>. Meanwhile, exchange reserves have dropped to 1.6 billion tokens as holders move on-chain to secure rewards.
                        </p>

                        {/* Callout Box */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-l-4 border-purple-500 rounded-r-xl">
                            <p className="text-slate-800 dark:text-slate-200 italic font-medium">
                                "With XRP around $1.95–$2.00 amid this surge, and analysts eyeing higher targets on ETF tailwinds, now is the prime time."
                            </p>
                        </div>
                    </div>

                    {/* Right: The ETF Data Card */}
                    <div className="lg:w-1/2 w-full">
                        <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-2xl overflow-hidden group">
                            {/* Glow Effect */}
                            <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500" />

                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
                                        Institutional Inflows
                                    </h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-slate-900 dark:text-white">
                                            $1.37 Billion
                                        </span>
                                        <span className="text-green-500 font-bold text-sm bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                                            +35 Day Streak
                                        </span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <TrendingUp size={24} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <Activity className="text-purple-500" size={20} />
                                        <span className="text-slate-700 dark:text-slate-300 font-bold">Weekly Inflows</span>
                                    </div>
                                    <span className="text-slate-900 dark:text-white font-mono font-bold">$55M - $57M</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <Wallet className="text-orange-500" size={20} />
                                        <span className="text-slate-700 dark:text-slate-300 font-bold">Exchange Reserves</span>
                                    </div>
                                    <span className="text-slate-900 dark:text-white font-mono font-bold">📉 1.6B (Low)</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                                    Institutional demand is fueling ecosystem rewards. Don't let your tokens sit idle.
                                </p>
                                <Link href="/dapp" className="w-full block">
                                    {/* UPDATED GLOWING BUTTON */}
                                    <button className="group relative w-full py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] text-white font-bold shadow-[0_0_25px_-5px_rgba(124,58,237,0.5)] hover:shadow-[0_0_35px_-5px_rgba(124,58,237,0.7)] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 overflow-hidden">

                                        {/* Shimmer Animation Overlay */}
                                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-0" />

                                        {/* Button Content (wrapped in relative z-10 to sit above shimmer) */}
                                        <span className="relative z-10 flex items-center gap-2">
                                            Claim Ecosystem Rewards <ArrowUpRight size={18} />
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Section Divider */}
                <div className="flex items-center gap-4 mb-12">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">Why Act Now?</h3>
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                </div>

                {/* 4. Three Pillars of Opportunity (Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Record Adoption",
                            desc: "Ledger activity is at all-time highs. Real utility is driving real value.",
                            icon: Globe,
                            color: "text-blue-500",
                            bg: "bg-blue-50 dark:bg-blue-900/20"
                        },
                        {
                            title: "Unbreakable Demand",
                            desc: "ETFs have seen zero outflows for 35 days straight. Institutions are buying.",
                            icon: ShieldCheck,
                            color: "text-purple-500",
                            bg: "bg-purple-50 dark:bg-purple-900/20"
                        },
                        {
                            title: "Holder Rewards",
                            desc: "Projects are rewarding loyalty via snapshots. Claim up to 50,000 tokens.",
                            icon: Activity,
                            color: "text-green-500",
                            bg: "bg-green-50 dark:bg-green-900/20"
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group">
                            <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} mb-6 group-hover:scale-110 transition-transform`}>
                                <item.icon size={28} />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                {item.title}
                            </h4>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}