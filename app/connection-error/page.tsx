"use client";

import Link from "next/link";
import { RefreshCw, ArrowLeft } from "lucide-react";

export default function ConnectionFailed() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-6 overflow-hidden font-sans text-slate-900 dark:text-white selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-500/30 dark:selection:text-blue-200 transition-colors duration-300">

      {/* --- Background Ripple (Top Right) --- */}
      <div className="absolute -top-20 -right-20 w-[600px] h-[600px] pointer-events-none opacity-100">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {/* Mathematically perfect concentric arcs */}
          {[...Array(12)].map((_, i) => (
            <path
              key={i}
              d={`M 0 ${400 - (i * 25)} A ${400 - (i * 25)} ${400 - (i * 25)} 0 0 1 ${400 - (i * 25)} 0`}
              fill="none"
              stroke="url(#waveGrad1)"
              strokeWidth="2"
              className="opacity-60 dark:opacity-40"
            />
          ))}
        </svg>
      </div>

      {/* --- Background Ripple (Bottom Left) --- */}
      <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] pointer-events-none opacity-100 rotate-180">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="waveGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333EA" stopOpacity="0" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {[...Array(12)].map((_, i) => (
            <path
              key={i}
              d={`M 0 ${400 - (i * 25)} A ${400 - (i * 25)} ${400 - (i * 25)} 0 0 1 ${400 - (i * 25)} 0`}
              fill="none"
              stroke="url(#waveGrad2)"
              strokeWidth="2"
              className="opacity-60 dark:opacity-40"
            />
          ))}
        </svg>
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 w-full max-w-lg mx-auto text-center animate-fade-in-up">
        
        {/* PREMIUM BROKEN LINK ICON */}
        <div className="w-40 h-40 mx-auto mb-8 relative drop-shadow-2xl dark:drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
           <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                 <linearGradient id="chainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A855F7" /> {/* Purple */}
                    <stop offset="50%" stopColor="#3B82F6" /> {/* Blue */}
                    <stop offset="100%" stopColor="#F97316" /> {/* Orange Accent */}
                 </linearGradient>
                 {/* Glow Filter */}
                 <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                 </filter>
              </defs>

              <g stroke="url(#chainGrad)" strokeWidth="18" fill="none" strokeLinecap="round" filter="url(#glow)">
                  {/* Top Left Chain Link */}
                  <path d="M 60 140 L 90 110" /> 
                  <path d="M 50 130 A 35 35 0 0 1 50 60 L 90 20 A 35 35 0 0 1 140 70 L 110 100" />
                  
                  {/* Bottom Right Chain Link */}
                  <path d="M 140 60 L 110 90" />
                  <path d="M 150 70 A 35 35 0 0 1 150 140 L 110 180 A 35 35 0 0 1 60 130 L 90 100" />

                  {/* Impact Sparks (The 'Break') */}
                  <line x1="85" y1="85" x2="70" y2="70" strokeWidth="6" />
                  <line x1="115" y1="115" x2="130" y2="130" strokeWidth="6" />
                  <line x1="120" y1="80" x2="135" y2="65" strokeWidth="6" />
                  <line x1="80" y1="120" x2="65" y2="135" strokeWidth="6" />
              </g>
           </svg>
        </div>

        {/* Text */}
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
          Connection Failed
        </h1>

        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl leading-relaxed mb-12 max-w-sm mx-auto font-medium">
          We were unable to establish a secure connection to the provider. Please check your internet and try again.
        </p>

        {/* Actions */}
        <div className="space-y-6 px-4">
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#6D28D9] hover:to-[#1D4ED8] text-white text-lg font-bold py-4 rounded-full shadow-[0_10px_40px_-10px_rgba(124,58,237,0.5)] dark:shadow-[0_10px_40px_-10px_rgba(124,58,237,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
          >
            Try Again <RefreshCw size={22} strokeWidth={2.5} />
          </button>

          <Link 
            href="/dapp"
            className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold hover:text-slate-900 dark:hover:text-white transition-colors text-sm uppercase tracking-wide"
          >
            <ArrowLeft size={16} /> Select Different Wallet
          </Link>
        </div>

      </div>

      <style jsx global>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
