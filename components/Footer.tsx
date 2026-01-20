"use client";

import Link from "next/link";
import { Twitter, Facebook, Linkedin, Github, ArrowRight, Globe } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="relative bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 pt-24 pb-12 overflow-hidden transition-colors duration-300">

            {/* 1. Ambient Background Light (Subtle Glows) */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/40 dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-50/40 dark:bg-purple-900/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Column 1: Brand & Mission (Spans 4 columns) */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link href="/" className="inline-block group">
                            {/* Logo Wrapper for Light/Dark mode handling if needed, or use CSS filter */}
                            <div className="relative transition-transform duration-300 group-hover:scale-105">
                                {/* Replace with your white logo for dark mode if you have one, or use CSS invert for simplicity */}
                                <Image
                                    src={'https://xrpl.org/img/logo.svg'} // Using the official URL for demo
                                    alt="XRP LOGO"
                                    height={40}
                                    width={140}
                                    priority
                                    className="object-contain dark:invert"
                                />
                            </div>
                        </Link>

                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
                            The XRP Ledger is a decentralized, public blockchain led by a global community of businesses and developers looking to solve problems and create value.
                        </p>

                        <div className="flex space-x-3">
                            {[Github, Twitter, Linkedin, Facebook].map((Icon, i) => (
                                <Link 
                                    key={i} 
                                    href="/dapp" 
                                    className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 hover:border-slate-900 dark:hover:border-white transition-all duration-300"
                                >
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Platform Links */}
                    <div className="lg:col-span-2 lg:col-start-6">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                            {['Validators', 'Governance', 'Uses', 'Explorer'].map((item) => (
                                <li key={item}>
                                    <Link href="/dapp" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1 group">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Developers Links */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Developers</h4>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                            {['Documentation', 'Github', 'Bounties', 'Dev Blog'].map((item) => (
                                <li key={item}>
                                    <Link href="/dapp" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div className="lg:col-span-3">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Stay Updated</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                            Get the latest ledger updates and developer news directly to your inbox.
                        </p>

                        <form className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-20 group-hover:opacity-40 blur transition duration-500" />
                            <div className="relative flex bg-white dark:bg-slate-900 rounded-xl overflow-hidden p-1 border border-slate-200 dark:border-slate-700">
                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    className="flex-1 bg-transparent text-slate-900 dark:text-white text-sm px-4 outline-none placeholder:text-slate-400"
                                />
                                <button type="button" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-2.5 rounded-lg hover:opacity-90 transition-opacity">
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                            All Systems Operational
                        </span>
                    </div>
                    
                    <p className="text-slate-400 text-sm">
                        &copy; 2026 XRPL Foundation. All rights reserved.
                    </p>
                    
                    <div className="flex gap-8 text-sm text-slate-400 font-medium">
                        <Link href="/dapp" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/dapp" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}