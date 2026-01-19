"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden pt-24 pb-12">

            {/* 1. Ambient Background Lighting (Premium Glow) */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-100/50 rounded-full blur-[120px] pointer-events-none opacity-60" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none opacity-40" />

            {/* 2. The Purple Wave (Refined & Smoother) */}
            <div className="absolute bottom-0 left-0 w-full md:w-1/2 h-1/2 opacity-100 pointer-events-none z-0">
                <svg viewBox="0 0 500 500" className="w-full h-full text-purple-600" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#A855F7" />
                            <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                    </defs>
                    <path d="M-100 500 Q 150 200 600 500" stroke="url(#waveGrad)" strokeWidth="1.5" fill="none" className="opacity-40" />
                    <path d="M-120 500 Q 130 220 580 500" stroke="url(#waveGrad)" strokeWidth="1.5" fill="none" className="opacity-30" />
                    <path d="M-140 500 Q 110 240 560 500" stroke="url(#waveGrad)" strokeWidth="1.5" fill="none" className="opacity-20" />
                </svg>
            </div>

            {/* 3. The Hero Image (With Float Animation & Depth) */}
            <div className="relative z-10 w-full max-w-5xl h-[350px] md:h-[500px] flex items-center justify-center mb-[-40px] md:mb-[-60px] animate-fade-in-up">
                <div className="relative w-full h-full drop-shadow-2xl">
                    <Image
                        src={'https://xrpl.org/img/home-hero.svg'}
                        alt="XRP Ledger Community"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* 4. Text Content (Glassy & Sharp) */}
            <div className="relative z-20 text-center max-w-4xl px-4 space-y-8 animate-fade-in-up delay-100">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm mx-auto">
                    <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                    <span className="text-xs font-bold text-slate-600 tracking-widest uppercase">
                        XRPL | XRP Ledger
                    </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.95] drop-shadow-sm">
                    The Blockchain <br className="hidden md:block" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                        Built for Business
                    </span>
                </h1>

                {/* CTA Button */}
                <div className="pt-6 flex justify-center">
                    <Link href={'/dapp'}>
                        <button className="group relative bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-lg font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(124,58,237,0.7)] hover:-translate-y-1 flex items-center gap-3 overflow-hidden">

                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

                            <span className="relative z-20">Connect</span>
                            <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform relative z-20" />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Tailwind Animation Config Note */}
            <style jsx global>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                    opacity: 0;
                    transform: translateY(20px);
                }
                @keyframes fade-in-up {
                    to { opacity: 1; transform: translateY(0); }
                }
                .delay-100 { animation-delay: 0.1s; }
            `}</style>

        </section>
    );
}