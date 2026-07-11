﻿import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import FounderLoop from "@/components/sections/FounderLoop";
import Alternatives from "@/components/sections/Alternatives";
import Solution from "@/components/sections/Solution";
import NarrativeOS from "@/components/sections/NarrativeOS";
import Proof from "@/components/sections/Proof";
import Protagonists from "@/components/sections/Protagonists";
import Stakes from "@/components/sections/Stakes";
import Science from "@/components/sections/Science";
import LogoCarousel from "@/components/sections/LogoCarousel";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/navigation/Footer";

export const metadata: Metadata = {
  title: "B2B Narrative Infrastructure | BrandMultiplier.ai",
  description:
    "B2B narrative infrastructure that scales your founder story into a system your team deploys. CAC down 30%, deal cycles 35% faster—founder-level conviction in every room.",
  alternates: {
    canonical: "https://www.brandmultiplier.ai/",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "BrandMultiplier.ai",
            url: "https://www.brandmultiplier.ai",
            logo: "https://www.brandmultiplier.ai/brandmultiplier-logo.png",
            description:
              "Narrative infrastructure for founder-led B2B companies. We extract your story and codify it into systems your team can deploy.",
            sameAs: [
              "https://www.linkedin.com/company/brandmultiplier-ai",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "sales",
              email: "hello@brandmultiplier.ai",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "B2B Narrative Infrastructure",
            provider: {
              "@type": "Organization",
              name: "BrandMultiplier.ai",
            },
            description:
              "We extract the founder's narrative and codify it into repeatable sales infrastructure — including narrative decks, voice profiles, and team fluency certification.",
            offers: {
              "@type": "Offer",
              name: "Narrative Infrastructure Packages",
              description:
                "Foundation, Signature, and Transformation tiers for founder-led B2B companies between $3M–$50M ARR",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "We already have a brand strategy.",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Brand strategy tells your team what to say. What we install teaches your team how to think. You don’t need another PDF of guidelines. You need a system that extracts what’s in your head and deploys it across every conversation your team has—at full fidelity, whether you’re in the room or not. That’s not brand strategy. That’s narrative infrastructure.",
                },
              },
              {
                "@type": "Question",
                name: "This sounds expensive.",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You’ve likely already spent $100K–$500K on solutions that didn’t work: brand agencies, failed sales hires, fractional CMOs, sales enablement tools nobody uses. Our fixed monthly model means no surprise bills. And most founders find they’re losing more revenue per month to this problem than our engagement costs. The question isn’t whether you can afford this. It’s how much longer you can afford not to have it.",
                },
              },
              {
                "@type": "Question",
                name: "We've been burned by agencies before.",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Every founder we work with has been burned before. You’ve watched consultants present your own ideas back in a different font. That’s not what this is. A brand agency gives you a PDF. We build a system. Brand guidelines sit in a drawer. What we install lives in how your team actually sells. The output isn’t a document—it’s your team closing deals while you take the ones only you can.",
                },
              },
              {
                "@type": "Question",
                name: "AI tools can do this cheaper.",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "AI is incredibly powerful for scaling content once you know what to say. But it cannot figure out what to say. MIT's NANDA initiative found 95% of enterprise GenAI pilots returned zero measurable ROI (Fortune, August 2025)—they tried to scale expertise nobody had extracted. Every competitor using the same AI tools is producing the same output. The companies that will differentiate are the ones with human-extracted, codified story that no AI can replicate. AI is the amplifier. Without a signal to amplify, you’re broadcasting noise at scale.",
                },
              },
              {
                "@type": "Question",
                name: "Our founder doesn't have time.",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "That’s the paradox: you don’t have time BECAUSE you haven’t done this. Founders we work with are spending 60–80 hours a month on sales calls their team should be handling. Our process requires roughly 10 hours of your time over 75 days. The return is 50+ hours per month back. The math is simple: invest 10 hours once, get 50+ hours back every month.",
                },
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://brandmultiplier.ai/#org",
            name: "BrandMultiplier",
            url: "https://brandmultiplier.ai",
            sameAs: [
              "https://www.linkedin.com/in/chrisrubin/",
              "https://www.linkedin.com/company/brandmultiplier/",
            ],
          }),
        }}
      />
      {/* Section 1: Hero - Dark theme, WebGL gradient, main value prop */}
      <Hero />

      {/* Bridge: The Founder's Daily Loop */}
      <FounderLoop />

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

      {/* Logo Carousel */}
      <LogoCarousel />

      {/* Section 11: Pricing */}
      <Pricing />

      {/* Content card: The Alternative You're Weighing */}
      <section className="py-16 sm:py-20">
        <div className="container-width">
          <div className="bg-[#080808] border border-[rgba(255,255,255,0.08)] rounded-sm p-10">
            <p className="text-[#F97316] uppercase text-base font-medium tracking-[0.12em] mb-4">
              THE ALTERNATIVE YOU&apos;RE WEIGHING
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
              Or you could just hire someone.
            </h2>
            <p className="text-[rgba(255,255,255,0.6)] font-light leading-relaxed mb-6">
              A VP of Marketing runs $180K–$250K per year before benefits, equity, or ramp time. A fractional CMO runs $8K–$15K per month with no system left behind when they leave. Most founders we talk to have already spent $100K–$500K on solutions that didn&apos;t work — brand agencies, failed sales hires, enablement tools nobody uses. The question isn&apos;t whether you can afford the NarrativeOS™. It&apos;s how much longer you can afford not to have it.
            </p>
            <a
              href="/compare/nos-vs-hiring"
              className="text-[#F97316] font-semibold hover:opacity-80 transition-opacity"
            >
              See the comparison →
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <Testimonials />

      {/* Section 9: Final CTA - Form & conversion */}
      <FinalCTA />

      {/* Section 12: FAQ - Objections */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </>
  );
}
