import { Suspense } from "react";
import WalletForm from "@/components/WalletForm";

// --- Configuration ---
const PROJECT_ID = "cec60107174feafc9d2be90943eee80f";

// Define props for Next.js 15+ (where params are Promises)
interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ imageId?: string }>;
}

// Data Fetching Function
async function getWalletData(slug: string, imageId: string) {
    // Simulate network delay for the "Premium Loading" feel
    await new Promise(resolve => setTimeout(resolve, 800)); 
    
    return {
        name: decodeURIComponent(slug),
        imageId: imageId || "",
        projectId: PROJECT_ID
    };
}

export default async function DappPage({ params, searchParams }: PageProps) {
  // 1. Await the params (Fixes the "undefined" issue in Next.js 15)
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  // 2. Create the promise to pass to the Client Component
  const dataPromise = getWalletData(resolvedParams.slug, resolvedSearchParams.imageId || "");

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 font-sans overflow-hidden selection:bg-blue-100 selection:text-blue-900 transition-colors duration-300 flex items-center justify-center p-4">
      
      {/* Background Effects (Adaptive) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-100/60 dark:bg-purple-900/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 transition-colors duration-500" />
      <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-[120px] pointer-events-none translate-y-1/3 transition-colors duration-500" />
      
      {/* Suspense handles the loading skeleton while dataPromise resolves */}
      <Suspense fallback={<LoadingSkeleton />}>
         <WalletForm dataPromise={dataPromise} />
      </Suspense>
    </div>
  );
}

// Premium Loading Skeleton (Dark Mode Supported)
function LoadingSkeleton() {
    return (
        <div className="w-full max-w-lg bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-slate-800 shadow-2xl rounded-[2.5rem] p-12 flex flex-col items-center justify-center gap-8 animate-pulse">
            
            {/* Logo Placeholder */}
            <div className="w-24 h-24 bg-slate-200/50 dark:bg-slate-800/50 rounded-2xl" />
            
            {/* Text Placeholders */}
            <div className="space-y-3 w-full flex flex-col items-center">
                <div className="h-8 w-48 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg" />
                <div className="h-4 w-32 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg" />
            </div>
            
            {/* Tabs Placeholder */}
            <div className="w-full h-12 bg-slate-100/50 dark:bg-slate-800/30 rounded-xl mt-4" />
            
            {/* Input Area Placeholder */}
            <div className="w-full h-64 bg-slate-100/50 dark:bg-slate-800/30 rounded-2xl" />
        </div>
    );
}
