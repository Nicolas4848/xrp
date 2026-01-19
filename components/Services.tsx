"use client";

import { 
  Globe, 
  Code2, 
  Zap, 
  Coins, 
  Users, 
  ShieldCheck, 
  ArrowUpRight 
} from "lucide-react";

const benefits = [
  { 
    title: "Public and Decentralized", 
    desc: "Open source, open to anyone to build on, maintained by the community.", 
    icon: Globe 
  },
  { 
    title: "Streamlined Development", 
    desc: "Intentional innovations, tools and documentation reduce time to market.", 
    icon: Code2 
  },
  { 
    title: "High Performance", 
    desc: "Thousands of transactions settled in seconds.", 
    icon: Zap 
  },
  { 
    title: "Low Cost", 
    desc: "At fractions of a penny per transaction, costs are inexpensive enough to enable a wide variety of use cases.", 
    icon: Coins 
  },
  { 
    title: "Motivated Community", 
    desc: "Companies, developers, validators, and users work together to make the XRP Ledger better every day.", 
    icon: Users 
  },
  { 
    title: "Proven Reliability", 
    desc: "10+ years of error-free, uninterrupted performance over more than 63 million ledgers.", 
    icon: ShieldCheck 
  },
];

export default function Services() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      
      {/* 1. Ambient Continuity Lighting (Matches Hero Bottom) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-50/60 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-blue-50/60 rounded-full blur-[80px] pointer-events-none -translate-x-1/2" />

      {/* 2. Seamless Grid Pattern (Fades in from top) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
             backgroundSize: '60px 60px',
             maskImage: 'linear-gradient(to bottom, transparent, black 20%)' 
           }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* 3. Top Section: Narrative Intro (Aligned with Hero Typography) */}
        <div className="flex flex-col lg:flex-row gap-16 lg:items-start mb-24">
            <div className="lg:w-1/2 relative">
                {/* Decorative Line connection */}
                <div className="absolute -left-6 top-2 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-transparent opacity-20 hidden lg:block rounded-full" />
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-100 bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider mb-6">
                    Why XRPL
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-6">
                    The Blockchain <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                        Built for Business
                    </span>
                </h2>
            </div>
            
            <div className="lg:w-1/2 space-y-6 pt-2">
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    The XRP Ledger (XRPL) is a decentralized, public blockchain led by a global community of businesses and developers looking to solve problems and create value.
                </p>
                <p className="text-lg text-slate-500 leading-relaxed font-light">
                    Proven reliable over more than a decade of error-free functioning, the XRPL offers streamlined development, low transaction costs, high performance, and sustainability. So you can build with confidence—and move your most critical projects forward.
                </p>
            </div>
        </div>

        {/* 4. Section Header: Subtitle */}
        <div className="mb-10 flex items-end justify-between border-b border-gray-100 pb-4">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
                Why Developers Choose XRPL
            </h3>
            <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest hidden sm:block">
                Core Benefits
            </span>
        </div>

        {/* 5. The Benefits Grid (Premium Card Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((item, idx) => (
                <div 
                    key={idx} 
                    className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-purple-100 transition-all duration-500 hover:-translate-y-2"
                >
                    {/* Floating Glow on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10" />

                    {/* Icon Container */}
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 mb-6 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <item.icon size={26} strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-700 transition-colors">
                        {item.title}
                    </h4>
                    <p className="text-slate-500 leading-relaxed text-sm">
                        {item.desc}
                    </p>

                    {/* Corner Accent */}
                    <div className="absolute top-6 right-6 text-gray-300 opacity-50 group-hover:opacity-100 group-hover:text-purple-400 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1">
                        <ArrowUpRight size={20} />
                    </div>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
}