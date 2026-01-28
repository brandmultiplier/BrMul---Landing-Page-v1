import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Alternatives from "@/components/sections/Alternatives";
import Solution from "@/components/sections/Solution";
import NarrativeOS from "@/components/sections/NarrativeOS";
import Proof from "@/components/sections/Proof";
import Protagonists from "@/components/sections/Protagonists";
import Stakes from "@/components/sections/Stakes";
import Science from "@/components/sections/Science";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/navigation/Footer";

export default function Home() {
  return (
    <>
      {/* Section 1: Hero - Dark theme, WebGL gradient, main value prop */}
      <Hero />

      {/* Section 2: The Problem - 3-layer progressive reveal */}
      <Problem />

      {/* Section 3: The Alternatives - Comparison Table */}
      <Alternatives />

      {/* Section 4: The Solution - RUMBLE → ARCHITECT → INSTALL → TUNE */}
      <Solution />

      {/* Section 4: Narrative OS - Product showcase */}
      <NarrativeOS />

      {/* Section 5: Proof Architecture - Case studies & testimonials */}
      <Proof />

      {/* Section 8: Scientific Foundation - Neuroscience backing */}
      <Science />

      {/* Section 11: Pricing */}
      <Pricing />

      {/* Section 9: Final CTA - Form & conversion */}
      <FinalCTA />

      {/* Section 12: FAQ - Objections */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </>
  );
}
