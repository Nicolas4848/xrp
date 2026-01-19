"use client";

import { Play, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">

      {/* 1. Background Ambience (Subtle Deep Glow) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Main CTA Container - Glass/Gradient Border Style */}
        <div className="relative rounded-3xl p-1 bg-gradient-to-br from-purple-100 via-white to-blue-100 shadow-2xl shadow-blue-900/5">
          <div className="relative bg-white rounded-[22px] overflow-hidden">

            {/* Inner Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 p-8 md:p-12 lg:p-16 items-center">

              {/* Left: Text & Action */}
              <div className="space-y-8 text-center lg:text-left">

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck size={14} className="text-purple-600" />
                    Secure Resolution
                  </div>

                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
                    Ready to resolve <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                      your issues?
                    </span>
                  </h2>

                  <p className="text-lg text-slate-500 leading-relaxed max-w-md mx-auto lg:mx-0">
                    Discover the difference our Resolver Panel can make. We resolve a diverse range of blockchain, cryptocurrency, and DeFi issues with banking-grade security.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href={'/dapp'}>
                    <button className="group relative bg-slate-900 hover:bg-purple-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3">
                      <span>Connect Wallet</span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                  <Link href={'/dapp'}>
                    <button className="px-8 py-4 rounded-xl border-2 border-slate-100 hover:border-slate-300 text-slate-600 font-bold transition-all hover:bg-slate-50">
                      View Documentation
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right: Premium Video Card */}
              <div className="relative group perspective-1000">
                {/* Floating Glow Behind Video */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 transform scale-95 translate-y-4" />

                {/* Video Container */}
                <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/50 shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2 cursor-pointer">

                  {/* Placeholder Image / Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-black opacity-80" />

                  {/* "UI Interface" Mockup Lines (Decoration) */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-white/10 flex items-center px-4 gap-2 border-b border-white/5">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>

                  {/* Play Button Interaction */}
                  <Link
                    href="/dapp"
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 flex items-center justify-center group/btn"
                  >
                    <div className="relative">
                      {/* Pulsing Ring */}
                      <div className="absolute inset-0 bg-white/30 rounded-full animate-ping opacity-0 group-hover/btn:opacity-100" />

                      {/* Main Circle */}
                      <div className="relative w-20 h-20 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:bg-white/20">
                        <Play size={32} className="text-white fill-white ml-1" />
                      </div>
                    </div>
                  </Link>

                  {/* Bottom Label */}
                  <div className="absolute bottom-6 left-0 right-0 text-center">
                    <p className="text-white/60 text-sm font-medium tracking-wide uppercase">Watch Platform Tour</p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}