import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import Experience from "@/components/sections/Experience";
import Features from "@/components/sections/Features";
import Showcase from "@/components/sections/Showcase";
import Bundles from "@/components/sections/Bundles";
import Simulator from "@/components/sections/Simulator";
import Reviews from "@/components/sections/Reviews";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Experience />
        <Features />
        <Showcase />
        <Bundles />
        <Simulator />
        <Reviews />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
