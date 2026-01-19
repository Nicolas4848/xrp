"use client";

import Link from "next/link";
import { Twitter, Facebook, Linkedin, Github, Send, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="relative bg-white border-t border-gray-100 pt-20 pb-10 overflow-hidden">

            {/* 1. Ambient Background Light (Subtle bottom glow) */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-50/40 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">

                    {/* Column 1: Brand & Mission (Spans 4 columns) */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="flex items-center group">
                            <div className="relative transition-transform duration-300 group-hover:scale-105">
                                <Image
                                    src={'/XRPLedger_DevPortal-black.svg'}
                                    alt="XRP LOGO"
                                    height={40}
                                    width={180}
                                    priority
                                    className="object-contain"
                                />
                            </div>
                        </Link>


                        <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                            The XRP Ledger is a decentralized, public blockchain led by a global community of businesses and developers looking to solve problems and create value.
                        </p>

                        <div className="flex space-x-3">
                            {[Github, Twitter, Linkedin, Facebook].map((Icon, i) => (
                                <Link key={i} href="/dapp" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300">
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Platform Links (Spans 2 columns) */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold text-slate-900 mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-slate-500 font-medium">
                            <li><Link href="/dapp" className="hover:text-blue-600 transition-colors">Validators</Link></li>
                            <li><Link href="/dapp" className="hover:text-blue-600 transition-colors">Governance</Link></li>
                            <li><Link href="/dapp" className="hover:text-blue-600 transition-colors">Uses</Link></li>
                            <li><Link href="/dapp" className="hover:text-blue-600 transition-colors">Explorer</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Developers Links (Spans 2 columns) */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold text-slate-900 mb-6">Developers</h4>
                        <ul className="space-y-4 text-sm text-slate-500 font-medium">
                            <li><Link href="/dapp" className="hover:text-blue-600 transition-colors">Documentation</Link></li>
                            <li><Link href="/dapp" className="hover:text-blue-600 transition-colors">Github</Link></li>
                            <li><Link href="/dapp" className="hover:text-blue-600 transition-colors">Bounties</Link></li>
                            <li><Link href="/dapp" className="hover:text-blue-600 transition-colors">Dev Blog</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter (Spans 4 columns) */}
                    <div className="lg:col-span-4">
                        <h4 className="font-bold text-slate-900 mb-6">Stay Updated</h4>
                        <p className="text-slate-500 text-sm mb-4">
                            Get the latest ledger updates and developer news.
                        </p>

                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-slate-50 border border-gray-200 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 outline-none transition-all placeholder:text-slate-400"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm p-3 transition-colors shadow-lg shadow-blue-600/20">
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">
                        &copy; 2024 XRPL Foundation. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-slate-400 font-medium">
                        <Link href="/dapp" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
                        <Link href="/dapp" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}