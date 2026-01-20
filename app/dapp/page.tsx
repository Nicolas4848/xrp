"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, ArrowUpRight, LayoutGrid, X, ShieldCheck } from "lucide-react";
import { fetchWallets, type WalletListing } from "./actions";
import Link from "next/link";

// --- Configuration ---
const PROJECT_ID = "cec60107174feafc9d2be90943eee80f";
const BASE_URL = "https://explorer-api.walletconnect.com";

export default function WalletExplorer() {
    const [wallets, setWallets] = useState<WalletListing[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    
    // Active modal state
    const [selectedWallet, setSelectedWallet] = useState<WalletListing | null>(null);

    // --- Fetch Logic ---
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const data = await fetchWallets(search);
            setWallets(data);
            setLoading(false);
        };

        const timer = setTimeout(() => loadData(), 300);
        return () => clearTimeout(timer);
    }, [search]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedWallet) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedWallet]);

    const getWalletImageUrl = (imageId: string) => {
        return `${BASE_URL}/v3/logo/md/${imageId}?projectId=${PROJECT_ID}`;
    };

    return (
        <div className="relative min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pt-32 pb-20 px-4 overflow-hidden selection:bg-blue-100 selection:text-blue-900 transition-colors duration-300">

            {/* 1. Ambient Background Lighting */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-100/60 dark:bg-purple-900/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 z-0" />
            <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-[120px] pointer-events-none translate-y-1/3 z-0" />

            {/* 2. Header Section */}
            <div className="relative z-10 max-w-4xl mx-auto text-center mb-16 space-y-6 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-100 dark:border-blue-900/50 bg-white dark:bg-blue-900/20 shadow-sm text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                    <LayoutGrid size={14} className="text-blue-500 dark:text-blue-400" />
                    Ecosystem Directory
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white drop-shadow-sm leading-[1.1]">
                    Connect Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        Digital Assets
                    </span>
                </h1>

                <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                    The most trusted directory of Web3 wallets. Search and connect with hundreds of providers supported by our protocol.
                </p>
            </div>

            {/* 3. Search Bar */}
            <div className="relative z-20 max-w-xl mx-auto mb-20 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-slate-700 shadow-2xl shadow-blue-900/5 dark:shadow-none rounded-2xl flex items-center p-2 transition-transform duration-300 group-hover:-translate-y-0.5">
                    <div className="pl-4 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                        <Search size={24} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by wallet name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-transparent border-none text-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-0 px-4 py-3 outline-none"
                    />
                </div>
            </div>

            {/* 4. Results Grid */}
            <div className="relative z-10 max-w-[1400px] mx-auto">
                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="bg-white/60 dark:bg-slate-900/60 p-6 rounded-3xl border border-white dark:border-slate-800 shadow-sm flex flex-col items-center animate-pulse">
                                <div className="w-16 h-16 rounded-2xl bg-slate-200/50 dark:bg-slate-800/50 mb-4" />
                                <div className="h-4 w-24 bg-slate-200/50 dark:bg-slate-800/50 rounded mb-2" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {wallets.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 text-slate-400 dark:text-slate-600">
                                <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100 dark:border-slate-800">
                                    <Search size={32} className="opacity-30" />
                                </div>
                                <p className="text-xl font-bold">No wallets found</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                                {wallets.map((wallet) => (
                                    <div
                                        key={wallet.id}
                                        onClick={() => setSelectedWallet(wallet)}
                                        className={`group pb-15 relative bg-white dark:bg-slate-900 flex flex-col items-center p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-2 overflow-hidden hover:border-blue-100 dark:hover:border-blue-900 cursor-pointer`}
                                    >
                                        <div className="relative w-16 h-16 mb-6 transition-transform duration-500 group-hover:scale-110">
                                            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="relative w-full h-full bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                                                <Image
                                                    src={getWalletImageUrl(wallet.image_id)}
                                                    alt={wallet.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="64px"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-center relative z-10 w-full">
                                            <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 text-sm md:text-base">
                                                {wallet.name}
                                            </h3>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                                            <div className="w-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                                                Proceed
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* 5. THE ANIMATED MODAL */}
            {selectedWallet && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    
                    {/* Backdrop with Blur */}
                    <div 
                        className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity animate-fade-in"
                        onClick={() => setSelectedWallet(null)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-scale-up border border-white/50 dark:border-slate-800">
                        
                        {/* Decorative Header Background */}
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-blue-900/20 dark:via-purple-900/10 dark:to-slate-900" />
                        
                        {/* Close Button */}
                        <button 
                            onClick={() => setSelectedWallet(null)}
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <div className="relative z-10 flex flex-col items-center pt-12 pb-8 px-8 text-center">
                            
                            {/* Huge Glowing Logo */}
                            <div className="relative w-28 h-28 mb-6">
                                <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full" />
                                <div className="relative w-full h-full bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden p-1">
                                    <Image
                                        src={getWalletImageUrl(selectedWallet.image_id)}
                                        alt={selectedWallet.name}
                                        fill
                                        className="object-cover rounded-[1.8rem]"
                                        sizes="128px"
                                    />
                                </div>
                            </div>

                            {/* Wallet Info */}
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                                {selectedWallet.name}
                            </h2>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider mb-8 border border-green-100 dark:border-green-800">
                                <ShieldCheck size={12} />
                                Verified Wallet
                            </div>

                            {/* Actions */}
                            <div className="w-full space-y-3">
                                <Link
                                    href={`/dapp/${encodeURIComponent(selectedWallet.name)}?imageId=${selectedWallet.image_id}`}
                                    className="flex items-center justify-center gap-2 w-full bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1"
                                >
                                    Initialize <ArrowUpRight size={18} />
                                </Link>
                                
                                <button 
                                    onClick={() => setSelectedWallet(null)}
                                    className="w-full bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold py-4 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* Global Animation Styles */}
            <style jsx global>{`
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                @keyframes scale-up {
                    0% { opacity: 0; transform: scale(0.95) translateY(10px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
                .animate-scale-up { animation: scale-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}</style>

        </div>
    );
}