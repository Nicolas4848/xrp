"use client";

import { ArrowRight, ShieldCheck, Zap, Activity } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative py-24 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">

      {/* 1. Background Ambience */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-250 h-150 bg-blue-50/50 dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Main CTA Container - Glass/Gradient Border Style */}
        <div className="relative rounded-[2.5rem] p-1 bg-linear-to-br from-purple-100 via-white to-blue-100 dark:from-purple-900/30 dark:via-slate-900 dark:to-blue-900/30 shadow-2xl shadow-blue-900/10 dark:shadow-none">

          {/* Inner Content Background */}
          <div className="relative bg-white dark:bg-slate-900 rounded-[2.3rem] overflow-hidden">

            {/* Grid Pattern Overlay inside the card */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] mask-image:linear-gradient(to_bottom,white,transparent) opacity-50 dark:opacity-20 pointer-events-none" />

            <div className="grid lg:grid-cols-2 gap-12 p-8 md:p-12 lg:p-16 items-center relative z-10">

              {/* Left: Text & Action */}
              <div className="space-y-8 text-center lg:text-left">

                <div className="space-y-6">
                  {/* Urgency Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider animate-pulse">
                    <Activity size={14} />
                    High Network Traffic
                  </div>

                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1] drop-shadow-sm">
                    DO NOT MISS <br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                      THIS OPPORTUNITY
                    </span>
                  </h2>

                  <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium max-w-lg mx-auto lg:mx-0">
                    Holders are actively claiming up to <span className="text-slate-900 dark:text-white font-bold">50,000 XRP</span> from pools and events. With prices hovering around <span className="text-green-600 dark:text-green-400 font-bold">$1.95–$2.00</span>, the window to maximize your allocation is closing fast.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                  <Link href={'/dapp'} className="w-full sm:w-auto">
                    <button className="w-full group relative bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all duration-300 shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)] hover:shadow-[0_0_50px_-5px_rgba(124,58,237,0.7)] hover:-translate-y-1 flex items-center justify-center gap-3 overflow-hidden">

                      {/* Button Shimmer */}
                      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />

                      <span className="relative z-20">Claim Allocation</span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform relative z-20" />
                    </button>
                  </Link>

                  <Link href={'/dapp'} className="w-full sm:w-auto">
                    <button className="w-full px-10 py-5 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 flex items-center justify-center gap-2">
                      <ShieldCheck size={18} />
                      Verify Eligibility
                    </button>
                  </Link>
                </div>

                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  *Snapshots are taken daily. Unclaimed tokens will be burned.
                </p>
              </div>

              {/* Right: Live Network Visualization Card */}
              <div className="relative group perspective-1000">
                {/* Floating Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2rem] blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 transform scale-95 translate-y-4" />

                {/* Card Container */}
                <div className="relative bg-slate-50 dark:bg-slate-950 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">

                  {/* Header Bar */}
                  <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                      XRPL Mainnet Live
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 space-y-6">

                    {/* Live Stat 1 */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Current TPS</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">1,542</p>
                      </div>
                      <div className="h-10 w-24 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                        <Activity className="text-green-500 animate-pulse" />
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold text-slate-700 dark:text-slate-300">
                        <span>Pool Capacity</span>
                        <span>87% Filled</span>
                      </div>
                      <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[87%] relative">
                          <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]" />
                        </div>
                      </div>
                    </div>

                    {/* Recent Claims List (Simulated) */}
                    <div className="space-y-3 pt-2">
                      <p className="text-xs text-slate-400 font-bold uppercase">Recent Claims</p>
                      {[
                        { id: "0x3a...8f9", amount: "12,500 XRP", time: "2s ago" },
                        { id: "0x7b...2c1", amount: "4,200 XRP", time: "5s ago" },
                        { id: "0x9c...a44", amount: "8,950 XRP", time: "8s ago" },
                      ].map((claim, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-sm">
                          <span className="font-mono text-slate-500 dark:text-slate-400">{claim.id}</span>
                          <span className="font-bold text-green-600 dark:text-green-400">+{claim.amount}</span>
                          <span className="text-slate-400 text-xs">{claim.time}</span>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes shimmer {
            100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}