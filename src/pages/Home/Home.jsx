import Hero from "./components/Hero";
import Features from "./components/Features";
import HighlightStrip from "./components/HighlightStrip";
import HowItWorks from "./components/HowItWorks";
import TabsSection from "./components/TabsSection";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";

export const Home = () => (
  <main className="bg-secondary-100 px-4">
    <Hero />
    <Features />
    <HighlightStrip />
    <HowItWorks />
    <TabsSection />
    <Testimonials />
    <FAQ />
    <CTA />
  </main>
);
