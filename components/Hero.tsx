"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Zap, ShieldCheck, Gift } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    // --- PERSISTENT COUNTDOWN LOGIC ---
    // 24 Hours in milliseconds
    const DURATION_MS = 24 * 60 * 60 * 1000; 

    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        minutes: 59,
        seconds: 59
    });

    useEffect(() => {
        // 1. Check or Set the Target Time in LocalStorage
        const storedEndTime = localStorage.getItem("airdropEndTime");
        let targetTime: number;

        if (storedEndTime) {
            targetTime = parseInt(storedEndTime, 10);
        } else {
            // First visit: Set deadline to 24 hours from now
            targetTime = Date.now() + DURATION_MS;
            localStorage.setItem("airdropEndTime", targetTime.toString());
        }

        // 2. Update Timer Function
        const updateTimer = () => {
            const now = Date.now();
            const difference = targetTime - now;

            if (difference <= 0) {
                // Timer expired
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                // Optional: Clear storage to restart or keep at 0
                // localStorage.removeItem("airdropEndTime"); 
            } else {
                // Calculate remaining units
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ hours, minutes, seconds });
            }
        };

        // Run immediately and then every second
        updateTimer();
        const timerId = setInterval(updateTimer, 1000);

        return () => clearInterval(timerId);
    }, []);

    // Format helper: 5 -> "05"
    const format = (num: number) => num.toString().padStart(2, "0");

    return (
        <section className="relative min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center overflow-hidden pt-28 pb-12 transition-colors duration-300">

            {/* --- 1. Background Effects --- */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-100/60 dark:bg-purple-900/20 rounded-full blur-[120px] pointer-events-none opacity-80" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-50/60 dark:bg-blue-900/20 rounded-full blur-[120px] pointer-events-none opacity-60" />
            
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] mask-image:linear-gradient(to_bottom,white,transparent) pointer-events-none" />

            {/* --- 2. Main Content --- */}
            <div className="relative z-10 w-full max-w-7xl px-4 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 animate-fade-in-up">
                
                {/* LEFT: Text & Countdown */}
                <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50/80 dark:bg-purple-900/30 backdrop-blur-sm">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-bold text-purple-700 dark:text-purple-300 tracking-widest uppercase">
                            Official Airdrop Live
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[1] drop-shadow-sm">
                        CLAIM YOUR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                            XRP ALLOCATION
                        </span>
                    </h1>

                    <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-xl leading-relaxed">
                        Connect your wallet to verify eligibility and receive up to <span className="text-slate-900 dark:text-white font-bold">50,000 XRP</span> instantly before the snapshot ends.
                    </p>

                    {/* GLASS COUNTDOWN CARD */}
                    <div className="w-full max-w-md bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-800 rounded-3xl p-6 shadow-xl dark:shadow-2xl">
                        <div className="flex items-center gap-2 mb-4 text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wide">
                            <Gift size={16} className="text-purple-500" />
                            <span>Offer Expires In:</span>
                        </div>
                        
                        <div className="flex items-center justify-between gap-2">
                            {/* Hours */}
                            <div className="flex flex-col items-center bg-slate-100 dark:bg-slate-950/50 rounded-2xl p-3 flex-1 border border-slate-200 dark:border-slate-800">
                                <span className="text-3xl md:text-4xl font-black font-mono text-slate-900 dark:text-white">
                                    {format(timeLeft.hours)}
                                </span>
                                <span className="text-[10px] uppercase font-bold text-slate-400">Hours</span>
                            </div>
                            <span className="text-2xl font-black text-slate-300 dark:text-slate-700">:</span>
                            
                            {/* Minutes */}
                            <div className="flex flex-col items-center bg-slate-100 dark:bg-slate-950/50 rounded-2xl p-3 flex-1 border border-slate-200 dark:border-slate-800">
                                <span className="text-3xl md:text-4xl font-black font-mono text-slate-900 dark:text-white">
                                    {format(timeLeft.minutes)}
                                </span>
                                <span className="text-[10px] uppercase font-bold text-slate-400">Mins</span>
                            </div>
                            <span className="text-2xl font-black text-slate-300 dark:text-slate-700">:</span>

                            {/* Seconds */}
                            <div className="flex flex-col items-center bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-3 flex-1 border border-purple-200 dark:border-purple-800/50 relative overflow-hidden">
                                <span className="relative z-10 text-3xl md:text-4xl font-black font-mono text-purple-600 dark:text-purple-400">
                                    {format(timeLeft.seconds)}
                                </span>
                                <span className="relative z-10 text-[10px] uppercase font-bold text-purple-400 dark:text-purple-300">Secs</span>
                                {/* Pulse BG */}
                                <div className="absolute inset-0 bg-purple-500/10 animate-pulse z-0" />
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full pt-2">
                         <Link href={'/dapp'} className="w-full sm:w-auto">
                            <button className="w-full group relative bg-[#7C3AED] hover:bg-[#6D28D9] dark:bg-purple-600 dark:hover:bg-purple-500 text-white text-lg font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 flex items-center justify-center gap-3">
                                <span className="relative z-10">Connect Wallet</span>
                                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                {/* Shimmer */}
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                            </button>
                        </Link>
                        
                        <div className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold text-sm">
                            <ShieldCheck size={18} className="text-green-500" />
                            <span>Secure & Verified</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT: The Hero Image (Floating) */}
                <div className="flex-1 w-full max-w-lg lg:max-w-xl relative">
                    <div className="relative w-full aspect-square animate-float">
                        {/* Glow Behind Image */}
                        <div className="absolute inset-0 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl scale-75 animate-pulse" />
                        
                        <Image
                            src={'https://xrpl.org/img/home-hero.svg'}
                            alt="XRP Ledger"
                            fill
                            className="object-contain drop-shadow-2xl dark:drop-shadow-[0_20px_50px_rgba(168,85,247,0.4)]"
                            priority
                        />
                    </div>
                </div>

            </div>

            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                    transform: translateY(20px);
                }
                @keyframes fade-in-up {
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

        </section>
    );
}