import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Features from "@/components/Features";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-blue-500/30">
      <Navbar />
      <Hero />
      <Services />
      {/* <Features /> */}
      <CTA />
      <Footer />
    </main>
  );
}