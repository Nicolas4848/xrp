"use client";

import { 
  Wallet, 
  ArrowRightLeft, 
  ShieldCheck, 
  Globe2, 
  Zap, 
  Leaf, 
  Layers, 
  Key,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const features = [
  { title: "Wallet Management", desc: "Securely manage and rectify wallet connections.", icon: Wallet },
  { title: "Instant Migration", desc: "Seamlessly move assets across the ledger.", icon: ArrowRightLeft },
  { title: "Validator Access", desc: "Participate in consensus and validation.", icon: ShieldCheck },
  { title: "Global Liquidity", desc: "Access on-demand liquidity pools worldwide.", icon: Globe2 },
  { title: "Fast Settlement", desc: "Settlement in 3-5 seconds with finality.", icon: Zap },
  { title: "Carbon Neutral", desc: "One of the most sustainable blockchains.", icon: Leaf },
  { title: "Tokenization", desc: "Issue tokens and NFTs on the XRPL.", icon: Layers },
  { title: "Account Recovery", desc: "Tools for account access and key management.", icon: Key },
];

export default function Features() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      
      {/* 1. Central Ambient Glow (Continues the lighting theme) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-purple-50/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* 2. Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-100 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
               Capabilities
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              Advanced Tools for the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Internet of Value
              </span>
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Manage, migrate, and validate with the power of the XRP Ledger.
            </p>
          </div>

          <button className="hidden md:flex items-center gap-2 text-slate-900 font-bold hover:text-purple-600 transition-colors group">
             View All Features 
             <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3. Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-purple-100 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon Container with Gradient Hover */}
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 mb-6 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all duration-300">
                <feature.icon size={24} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-purple-700 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                {feature.desc}
              </p>
              
              <div className="flex items-center text-sm font-bold text-slate-300 group-hover:text-blue-600 transition-colors">
                Learn more <ArrowRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button (Visible only on small screens) */}
        <div className="mt-8 md:hidden flex justify-center">
         <Link href={'/dapp'}>
            <button className="flex items-center gap-2 text-slate-900 font-bold hover:text-purple-600 transition-colors">
                View All Features <ArrowRight size={20} />
            </button>
         </Link>
        </div>

      </div>
    </section>
  );
}