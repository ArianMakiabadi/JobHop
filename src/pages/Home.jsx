import Hero from "./Home/components/Hero";
import Features from "./Home/components/Features";
import HighlightStrip from "./Home/components/HighlightStrip";
import HowItWorks from "./Home/components/HowItWorks";
import TabsSection from "./Home/components/TabsSection";
import Testimonials from "./Home/components/Testimonials";
import FAQ from "./Home/components/FAQ";
import CTA from "./Home/components/CTA";

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
