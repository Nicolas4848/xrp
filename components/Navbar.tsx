"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, ArrowRight, Sun, Moon, Laptop } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Developers", href: "/dapp" },
        { name: "Use Cases", href: "/dapp" },
        { name: "Community", href: "/dapp" },
        { name: "Resources", href: "/dapp" },
    ];

    return (
        <>
            <nav
                className={`fixed w-full z-50 top-0 start-0 transition-all duration-300 border-b ${scrolled
                        ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-sm py-2"
                        : "bg-transparent border-transparent py-4"
                    }`}
            >
                <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto px-4 md:px-8">

                    {/* Logo Area */}
                    <Link href="/" className="flex items-center group">
                        <div className="relative transition-transform duration-300 group-hover:scale-105">
                            {/* dark:invert turns the black logo white in dark mode */}
                            <Image
                                src={'/XRPLedger_DevPortal-black.svg'}
                                alt="XRP LOGO"
                                height={40}
                                width={140}
                                priority
                                className="object-contain dark:invert transition-all duration-300"
                            />
                        </div>
                    </Link>

                    {/* Desktop Links - Centered */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors group py-2"
                            >
                                {link.name}
                                {/* Animated Underline */}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 ease-out group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">

                        {/* Theme Toggle Button */}
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 rounded-full hidden text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-all"
                                aria-label="Toggle Theme"
                            >
                                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        )}

                        {/* Desktop CTA */}
                        <div className="hidden md:block">
                            <Link href="/dapp">
                                <button className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-bold text-white transition duration-300 ease-out border-2 border-slate-900 dark:border-white rounded-full shadow-md group">
                                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-600 group-hover:translate-x-0 ease">
                                        <ArrowRight size={18} />
                                    </span>
                                    <span className="absolute flex items-center justify-center w-full h-full text-white dark:text-slate-900 bg-slate-900 dark:bg-white transition-all duration-300 transform group-hover:translate-x-full ease">
                                        Connect
                                    </span>
                                    <span className="relative invisible">Connect</span>
                                </button>
                            </Link>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 w-10 h-10 text-slate-900 dark:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors md:hidden"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl md:hidden transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
                    }`}
                style={{ top: '0px', paddingTop: '80px' }}
            >
                <div className="flex flex-col items-center justify-center space-y-8 p-6 h-full">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-3xl font-black text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors tracking-tight"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-8 w-full max-w-xs">
                        <Link href="/dapp">
                            <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-full shadow-xl hover:bg-blue-600 dark:hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                                Connect Wallet <ChevronRight size={18} />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}