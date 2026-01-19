"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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
        { name: "Developers", href: "#" },
        { name: "Use Cases", href: "#" },
        { name: "Community", href: "#" },
        { name: "Resources", href: "#" },
    ];

    return (
        <>
            <nav
                className={`fixed w-full z-50 top-0 start-0 transition-all duration-300 border-b ${
                    scrolled
                        ? "bg-white/90 backdrop-blur-xl border-gray-200 shadow-sm py-2"
                        : "bg-white/50 backdrop-blur-sm border-transparent py-4"
                }`}
            >
                <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto px-4 md:px-8">
                    
                    {/* Logo Area */}
                    <Link href="/" className="flex items-center group">
                        <div className="relative transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src={'/XRPLedger_DevPortal-black.svg'}
                                alt="XRP LOGO"
                                height={60}
                                width={180}
                                priority
                                className="object-contain"
                            />
                        </div>
                    </Link>

                    {/* Desktop Links - Centered */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative text-sm font-semibold text-slate-600 hover:text-black transition-colors group py-2"
                            >
                                {link.name}
                                {/* Animated Underline */}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3">
                        
                        {/* Desktop CTA */}
                        <div className="hidden md:block">
                            <button className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-black rounded-full shadow-md group">
                                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-600 group-hover:translate-x-0 ease">
                                    <ArrowRight size={18} />
                                </span>
                                <span className="absolute flex items-center justify-center w-full h-full text-white bg-black transition-all duration-300 transform group-hover:translate-x-full ease">
                                    Get Started
                                </span>
                                <span className="relative invisible">Get Started</span>
                            </button>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 w-10 h-10 text-slate-900 rounded-full hover:bg-gray-100 focus:outline-none transition-colors md:hidden"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div 
                className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
                }`}
                style={{ top: '0px', paddingTop: '80px' }} 
            >
                <div className="flex flex-col items-center justify-center space-y-6 p-6 h-full">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-bold text-slate-900 hover:text-blue-600 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-8 w-full max-w-xs">
                         <button className="w-full bg-black text-white font-bold py-4 rounded-full shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                            Connect <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}