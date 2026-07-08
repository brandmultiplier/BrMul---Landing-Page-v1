import type { Metadata } from "next";
import Footer from "@/components/navigation/Footer";

export const metadata: Metadata = {
  title: "What Is a Narrative Operating System? | BrandMultiplier",
  description:
    "A Narrative Operating System (NarrativeOS) is the infrastructure that gets a company's story out of the founder's head and into the team's hands. The 2026 definition for founder-led B2B.",
  alternates: {
    canonical: "https://brandmultiplier.ai/what-is-a-narrative-operating-system",
  },
  openGraph: {
    title: "What Is a Narrative Operating System?",
    description:
      "A Narrative Operating System (NarrativeOS) is the infrastructure that gets a company's story out of the founder's head and into the team's hands.",
    url: "https://brandmultiplier.ai/what-is-a-narrative-operating-system",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://brandmultiplier.ai/#org",
      name: "BrandMultiplier",
      url: "https://brandmultiplier.ai",
      sameAs: [
        "https://www.linkedin.com/in/chrisrubin",
        "https://www.linkedin.com/company/brandmultiplier/",
      ],
    },
    {
      "@type": "Article",
      "@id": "https://brandmultiplier.ai/what-is-a-narrative-operating-system#article",
      headline: "What Is a Narrative Operating System?",
      author: {
        "@type": "Person",
        name: "Chris Rubin",
        url: "https://www.linkedin.com/in/chrisrubin",
        jobTitle: "Founder & CEO",
        worksFor: { "@id": "https://brandmultiplier.ai/#org" },
      },
      publisher: { "@id": "https://brandmultiplier.ai/#org" },
      datePublished: "2026-07-02",
      dateModified: "2026-07-02",
    },
    {
      "@type": "DefinedTermSet",
      "@id": "https://brandmultiplier.ai/what-is-a-narrative-operating-system#glossary",
      name: "BrandMultiplier Narrative Infrastructure Glossary",
      hasDefinedTerm: [
        {
          "@type": "DefinedTerm",
          name: "Narrative Operating System (NarrativeOS, NOS)",
          description:
            "The business infrastructure that gets a company's story, selling logic, and conviction out of the founder's head and into the hands of the team: documented, installed into daily workflows, and measured against revenue outcomes. Built for founder-led B2B companies.",
        },
        {
          "@type": "DefinedTerm",
          name: "StoryLock",
          description:
            "The structural condition where a company's story, selling logic, and conviction are trapped in the founder's head, inaccessible to the team. Diagnosed by the Room Test.",
        },
        {
          "@type": "DefinedTerm",
          name: "Storyline Method",
          description:
            "BrandMultiplier's five-phase narrative architecture (Anchor, Insight, Shift, Unification, Realization) that moves audiences from attention to action. The methodology engine inside every Narrative Operating System.",
        },
        {
          "@type": "DefinedTerm",
          name: "Narrative intelligence for B2B go-to-market",
          description:
            "The capability to identify which narratives move a specific buying committee and deploy the right story arc per stakeholder. A component of a Narrative Operating System.",
        },
        {
          "@type": "DefinedTerm",
          name: "The Room Test",
          description:
            "The primary StoryLock diagnostic: can your sales team consistently articulate your value in a way that resonates with buyers, without you in the room?",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://brandmultiplier.ai/what-is-a-narrative-operating-system#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is a Narrative Operating System?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A Narrative Operating System (NarrativeOS, or NOS) is the business infrastructure that gets a company's story, selling logic, and conviction out of the founder's head and into the hands of the team: documented, installed into daily workflows, and measured against revenue outcomes. Built for founder-led B2B companies, a NOS resolves StoryLock, the structural condition where the story that closes deals lives only in the founder.",
          },
        },
        {
          "@type": "Question",
          name: "What is StoryLock?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "StoryLock is the structural condition where a company's story, selling logic, and conviction are trapped in the founder's head. Its signatures: founder close rate far above the team's, six-month new-hire ramp times, inconsistent messaging across departments, and decks rebuilt for every deal.",
          },
        },
        {
          "@type": "Question",
          name: "Is a Narrative Operating System the same as storyOS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. storyOS is Istoria Collective's story-based leadership development methodology. A Narrative Operating System (NarrativeOS) is BrandMultiplier's revenue infrastructure for founder-led B2B companies: extracted from the founder, installed across the team, and measured against CAC, deal velocity, and win rate.",
          },
        },
        {
          "@type": "Question",
          name: "How long does a NOS installation take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The initial installation runs 75 days: extraction and codification in the first weeks, deployment and team fluency in the back half, with quarterly TUNE cycles after.",
          },
        },
        {
          "@type": "Question",
          name: "Who needs a Narrative Operating System?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Founder-led B2B companies, typically $3M to $50M in revenue, where the founder still closes most deals, ramping sellers takes six months or more, and the team fails the Room Test.",
          },
        },
        {
          "@type": "Question",
          name: "What is narrative intelligence for B2B go-to-market?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The capability, inside a Narrative Operating System, to read which stories move a specific buying committee and deploy the right narrative arc per stakeholder. It is a component of the system, not a standalone product.",
          },
        },
        {
          "@type": "Question",
          name: "What does a Narrative Operating System cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "B2B positioning and messaging engagements range from roughly $5,000 for basic messaging projects to $75,000 or more for full brand strategy. A BrandMultiplier NOS installation runs as a 75-day pilot with tiered monthly fees; most companies between $3M and $50M ARR invest in the low-to-mid five figures over the pilot.",
          },
        },
      ],
    },
  ],
};

export default function WhatIsNarrativeOSPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="nos-def-page">
        <style>{`
          .nos-def-page {
            background: #0A0A0A;
            color: #fff;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            font-weight: 300;
            font-size: 20px;
            line-height: 32px;
            -webkit-font-smoothing: antialiased;
          }
          .nos-def-page main {
            max-width: 1240px;
            margin: 0 auto;
            padding: 0 60px;
          }
          .nos-def-page section {
            margin: 80px 0;
          }
          .nos-def-page .container-narrow {
            max-width: 860px;
          }

          /* Hero */
          .nos-def-page .hero {
            padding: 120px 0 0;
          }
          .nos-def-page .kicker {
            font-size: 16px;
            font-weight: 500;
            letter-spacing: .12em;
            text-transform: uppercase;
            color: #F36901;
            margin-bottom: 24px;
          }
          .nos-def-page h1 {
            font-size: 69px;
            font-weight: 500;
            line-height: 1.05;
            margin-bottom: 40px;
            color: #fff;
          }
          .nos-def-page .updated {
            font-size: 14px;
            line-height: 20px;
            color: #A1A1AA;
            margin-bottom: 32px;
          }
          .nos-def-page .definition-card {
            background: #080808;
            border: 1px solid rgba(255,255,255,0.08);
            border-left: 3px solid #4940C6;
            border-radius: 2px;
            padding: 40px;
          }
          .nos-def-page .definition-card p {
            font-size: 20px;
            font-weight: 300;
            line-height: 32px;
            margin: 0;
          }

          /* Headings */
          .nos-def-page h2 {
            font-size: 48px;
            font-weight: 500;
            line-height: 1.15;
            margin-bottom: 32px;
            color: #fff;
          }
          .nos-def-page h3 {
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            letter-spacing: .08em;
            text-transform: uppercase;
            color: #A1A1AA;
            margin-bottom: 12px;
          }
          .nos-def-page p {
            margin-bottom: 20px;
          }
          .nos-def-page p.body {
            font-size: 20px;
            font-weight: 300;
            line-height: 32px;
          }
          .nos-def-page .accent-o { color: #F36901; font-weight: 600; }

          /* Signatures list */
          .nos-def-page ol.signatures {
            counter-reset: sig;
            list-style: none;
            display: grid;
            gap: 12px;
            margin: 32px 0;
            padding: 0;
          }
          .nos-def-page ol.signatures li {
            counter-increment: sig;
            display: flex;
            gap: 20px;
            align-items: baseline;
            font-size: 18px;
            font-weight: 400;
            line-height: 28px;
          }
          .nos-def-page ol.signatures li::before {
            content: "0" counter(sig);
            font-weight: 700;
            font-size: 18px;
            color: #F36901;
            min-width: 36px;
            flex-shrink: 0;
          }

          /* Room test */
          .nos-def-page .roomtest {
            background: #080808;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 2px;
            padding: 40px;
            margin-top: 48px;
          }
          .nos-def-page .roomtest .q {
            font-size: 24px;
            font-weight: 500;
            line-height: 36px;
            margin-bottom: 12px;
          }
          .nos-def-page .roomtest .a {
            font-size: 18px;
            font-weight: 400;
            line-height: 28px;
            color: #A1A1AA;
            margin: 0;
          }

          /* Component cards */
          .nos-def-page .grid-2 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          .nos-def-page .card {
            background: #080808;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 2px;
            padding: 40px;
          }
          .nos-def-page .card .num {
            font-size: 14px;
            font-weight: 700;
            color: #4940C6;
            letter-spacing: .1em;
            margin-bottom: 16px;
          }
          .nos-def-page .card h4 {
            font-size: 22px;
            font-weight: 500;
            line-height: 30px;
            margin-bottom: 12px;
            color: #fff;
          }
          .nos-def-page .card p {
            font-size: 16px;
            font-weight: 400;
            line-height: 26px;
            color: #A1A1AA;
            margin: 0;
          }
          .nos-def-page .card-full {
            grid-column: 1 / -1;
          }

          /* Phases */
          .nos-def-page .phases {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 16px;
            margin-top: 48px;
          }
          .nos-def-page .phase {
            background: #080808;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 2px;
            padding: 28px 24px;
          }
          .nos-def-page .phase .tag {
            font-size: 13px;
            font-weight: 700;
            letter-spacing: .14em;
            color: #F36901;
            margin-bottom: 10px;
          }
          .nos-def-page .phase p {
            font-size: 15px;
            font-weight: 400;
            line-height: 23px;
            color: #A1A1AA;
            margin: 0;
          }

          /* Comparison table */
          .nos-def-page .tablewrap {
            background: #080808;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 2px;
            overflow-x: auto;
          }
          .nos-def-page table.compare {
            width: 100%;
            border-collapse: collapse;
            margin-top: 0;
          }
          .nos-def-page table.compare th {
            font-size: 14px;
            font-weight: 500;
            letter-spacing: .08em;
            text-transform: uppercase;
            color: #A1A1AA;
            text-align: left;
            padding: 16px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .nos-def-page table.compare td {
            font-size: 17px;
            font-weight: 400;
            line-height: 27px;
            padding: 20px;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            vertical-align: top;
            color: #A1A1AA;
          }
          .nos-def-page table.compare td:first-child {
            font-weight: 600;
            white-space: nowrap;
            color: #fff;
          }
          .nos-def-page table.compare tr:last-child td {
            border-bottom: none;
          }

          /* Evidence */
          .nos-def-page .evidence {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          .nos-def-page .evidence .card .stat {
            font-size: 40px;
            font-weight: 500;
            color: #fff;
            margin-bottom: 10px;
          }
          .nos-def-page .evidence .card .stat span {
            color: #4940C6;
          }
          .nos-def-page .evidence .card cite {
            display: block;
            font-style: normal;
            font-size: 14px;
            line-height: 20px;
            color: #52525B;
            margin-top: 14px;
          }

          /* FAQ */
          .nos-def-page .faq-item {
            background: #080808;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 2px;
            padding: 40px;
            margin-bottom: 16px;
          }
          .nos-def-page .faq-item h4 {
            font-size: 22px;
            font-weight: 500;
            line-height: 32px;
            margin-bottom: 14px;
            color: #fff;
          }
          .nos-def-page .faq-item p {
            font-size: 18px;
            font-weight: 400;
            line-height: 28px;
            color: #A1A1AA;
            margin: 0;
          }

          /* Glossary */
          .nos-def-page dl.glossary {
            display: grid;
            gap: 0;
            background: #080808;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 2px;
          }
          .nos-def-page dl.glossary > div {
            padding: 32px 40px;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .nos-def-page dl.glossary > div:last-child {
            border-bottom: none;
          }
          .nos-def-page dl.glossary dt {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 8px;
            color: #fff;
          }
          .nos-def-page dl.glossary dd {
            font-size: 17px;
            font-weight: 400;
            line-height: 27px;
            color: #A1A1AA;
          }

          /* CTA */
          .nos-def-page .cta-block {
            background: #080808;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 2px;
            padding: 64px 40px;
            text-align: center;
          }
          .nos-def-page .cta-block h2 {
            margin-bottom: 16px;
          }
          .nos-def-page .cta-block p {
            font-size: 20px;
            font-weight: 300;
            color: #A1A1AA;
            max-width: 640px;
            margin: 0 auto 40px;
          }
          .nos-def-page .cta-btn {
            display: inline-block;
            font-family: inherit;
            font-size: 18px;
            font-weight: 700;
            line-height: 28px;
            color: #fff;
            background: transparent;
            padding: 10px 40px;
            border-radius: 100px;
            border: 1px solid rgba(255,255,255,0.2);
            box-shadow: 0 0 40px rgba(168,85,247,0.6);
            text-decoration: none;
            cursor: pointer;
            transition: box-shadow .25s, border-color .25s, transform .25s;
          }
          .nos-def-page .cta-btn:hover {
            box-shadow: 0 0 56px rgba(168,85,247,0.8);
            border-color: rgba(255,255,255,0.55);
            transform: scale(1.02);
          }

          /* ── Responsive ── */

          /* Large tablet: 768–1023px */
          @media (max-width: 1023px) {
            .nos-def-page { font-size: 18px; line-height: 29px; }
            .nos-def-page main { padding: 0 40px; }
            .nos-def-page section { margin: 64px 0; }
            .nos-def-page .hero { padding: 100px 0 0; }
            .nos-def-page h1 { font-size: 48px; line-height: 1.08; margin-bottom: 28px; }
            .nos-def-page h2 { font-size: 36px; margin-bottom: 24px; }
            .nos-def-page .definition-card p { font-size: 18px; line-height: 29px; }
            .nos-def-page p.body { font-size: 18px; line-height: 29px; }
            .nos-def-page .roomtest .q { font-size: 20px; line-height: 30px; }
            .nos-def-page .grid-2 { grid-template-columns: 1fr 1fr; }
            .nos-def-page .evidence { grid-template-columns: 1fr 1fr; }
            .nos-def-page .phases { grid-template-columns: repeat(3, 1fr); }
            .nos-def-page .evidence .card .stat { font-size: 32px; }
            .nos-def-page .card h4 { font-size: 20px; }
          }

          /* Small tablet: 600–767px */
          @media (max-width: 767px) {
            .nos-def-page { font-size: 17px; line-height: 27px; }
            .nos-def-page main { padding: 0 28px; }
            .nos-def-page section { margin: 52px 0; }
            .nos-def-page .hero { padding: 88px 0 0; }
            .nos-def-page h1 { font-size: 38px; line-height: 1.1; }
            .nos-def-page h2 { font-size: 28px; }
            .nos-def-page .grid-2 { grid-template-columns: 1fr; }
            .nos-def-page .card-full { grid-column: auto; }
            .nos-def-page .evidence { grid-template-columns: 1fr 1fr; }
            .nos-def-page .phases { grid-template-columns: repeat(2, 1fr); }
            .nos-def-page .definition-card { padding: 28px; }
            .nos-def-page .card { padding: 28px; }
            .nos-def-page .faq-item { padding: 28px; }
            .nos-def-page .roomtest { padding: 28px; }
            .nos-def-page .cta-block { padding: 48px 28px; }
            .nos-def-page dl.glossary > div { padding: 28px 28px; }
            /* table: allow first col to wrap on small tablet */
            .nos-def-page table.compare td:first-child { white-space: normal; }
            .nos-def-page table.compare td { font-size: 15px; padding: 16px; }
          }

          /* Mobile: ≤599px */
          @media (max-width: 599px) {
            .nos-def-page { font-size: 16px; line-height: 26px; }
            .nos-def-page main { padding: 0 20px; }
            .nos-def-page section { margin: 40px 0; }
            .nos-def-page .hero { padding: 80px 0 0; }
            .nos-def-page h1 { font-size: 30px; line-height: 1.12; margin-bottom: 20px; }
            .nos-def-page h2 { font-size: 24px; margin-bottom: 18px; }
            .nos-def-page h3 { font-size: 13px; margin-bottom: 8px; }
            .nos-def-page .kicker { font-size: 13px; margin-bottom: 16px; }
            .nos-def-page .definition-card { padding: 20px; }
            .nos-def-page .definition-card p { font-size: 16px; line-height: 26px; }
            .nos-def-page p.body { font-size: 16px; line-height: 26px; }
            .nos-def-page .card { padding: 20px; }
            .nos-def-page .card h4 { font-size: 18px; line-height: 26px; }
            .nos-def-page .card p { font-size: 15px; line-height: 24px; }
            .nos-def-page .faq-item { padding: 20px; margin-bottom: 12px; }
            .nos-def-page .faq-item h4 { font-size: 18px; line-height: 26px; }
            .nos-def-page .faq-item p { font-size: 16px; line-height: 26px; }
            .nos-def-page .roomtest { padding: 20px; margin-top: 32px; }
            .nos-def-page .roomtest .q { font-size: 18px; line-height: 28px; }
            .nos-def-page .roomtest .a { font-size: 15px; line-height: 24px; }
            .nos-def-page ol.signatures li { font-size: 15px; line-height: 24px; gap: 14px; }
            .nos-def-page ol.signatures li::before { font-size: 15px; min-width: 28px; }
            .nos-def-page .grid-2 { grid-template-columns: 1fr; gap: 16px; }
            .nos-def-page .card-full { grid-column: auto; }
            .nos-def-page .evidence { grid-template-columns: 1fr; gap: 16px; }
            .nos-def-page .evidence .card .stat { font-size: 28px; }
            .nos-def-page .phases { grid-template-columns: 1fr; gap: 12px; }
            .nos-def-page .phase { padding: 20px; }
            .nos-def-page table.compare td:first-child { white-space: normal; }
            .nos-def-page table.compare th { font-size: 12px; padding: 12px 16px; }
            .nos-def-page table.compare td { font-size: 14px; line-height: 22px; padding: 14px 16px; }
            .nos-def-page dl.glossary > div { padding: 20px; }
            .nos-def-page dl.glossary dt { font-size: 17px; }
            .nos-def-page dl.glossary dd { font-size: 15px; line-height: 24px; }
            .nos-def-page .cta-block { padding: 36px 20px; }
            .nos-def-page .cta-block p { font-size: 16px; }
            .nos-def-page .cta-btn { display: block; width: 100%; text-align: center; padding: 14px 20px; font-size: 16px; box-sizing: border-box; }
          }

          /* Very small phones: ≤374px */
          @media (max-width: 374px) {
            .nos-def-page main { padding: 0 16px; }
            .nos-def-page h1 { font-size: 26px; }
            .nos-def-page h2 { font-size: 22px; }
          }
        `}</style>

        <main>

          {/* HERO / DEFINITION */}
          <section className="hero" id="definition">
            <p className="kicker">The 2026 Definition</p>
            <h1>What Is a Narrative Operating&nbsp;System?</h1>
            <p className="updated">Last updated: July 2026 · By Chris Rubin, Founder &amp; CEO, BrandMultiplier</p>
            <div className="definition-card">
              <p>A <strong>Narrative Operating System (NarrativeOS&trade;, or NOS)</strong> is the business infrastructure that gets a company&apos;s story, selling logic, and conviction out of the founder&apos;s head and into the hands of the team: documented, installed into daily workflows, and measured against revenue outcomes. Built for founder-led B2B companies, a NOS resolves <strong>StoryLock</strong>, the structural condition where the story that closes deals lives only in the founder. Where a messaging framework documents what a company says, a NOS transfers how the founder thinks and sells, so the team can close deals, create content, and represent the company with founder-level conviction, without the founder in the room.</p>
            </div>
          </section>

          {/* STORYLOCK */}
          <section id="storylock" className="container-narrow">
            <h3>The Problem It Solves</h3>
            <h2>StoryLock</h2>
            <p className="body">Most founder-led B2B companies between $3M and $50M in revenue hit the same wall. The founder closes at rates the team can&apos;t reproduce: the measured gap runs about 50% above their best hires (Eyal Worthalter, Marvell). New hires take 9 to 12 months to carry full quota (Brooks Group). Sales, marketing, and product each tell a different version of the company story. None of this is a talent problem. It&apos;s a structural condition: the story, the selling logic, and the conviction are trapped in the founder&apos;s head.</p>
            <ol className="signatures">
              <li>A founder close rate your best hires can&apos;t reproduce</li>
              <li>New-hire ramp measured in quarters, not weeks</li>
              <li>Decks rebuilt per deal because the official one doesn&apos;t match real buyer conversations</li>
              <li>Content the founder rejects as &ldquo;not how I&apos;d say it&rdquo;</li>
              <li>Revenue that dips whenever the founder steps out of the pipeline</li>
            </ol>
            <p className="body">StoryLock carries a measurable price. Founder-dependent revenue is one of the classic valuation killers in M&amp;A: acquirers discount, restructure toward earn-outs, and extend founder lock-in periods when revenue depends on one person (Strategic Exit Advisors).</p>
            <div className="roomtest">
              <p className="q"><span className="accent-o">The Room Test:</span> Can your sales team consistently articulate your value in a way that resonates with buyers, without you in the room?</p>
              <p className="a">If the answer is no, you have StoryLock.</p>
            </div>
          </section>

          {/* FIVE COMPONENTS */}
          <section id="components">
            <h3>What&apos;s Inside</h3>
            <h2>The five components of a NOS</h2>
            <div className="grid-2">
              <div className="card">
                <p className="num">01</p>
                <h4>Stakes Architecture</h4>
                <p>The framing system that makes the cost of inaction concrete. Built on loss aversion research (Kahneman and Tversky: losses weigh roughly twice as much as equivalent gains), it maps the winner&apos;s future against the loser&apos;s future so urgency is real, not manufactured.</p>
              </div>
              <div className="card">
                <p className="num">02</p>
                <h4>Movement Declaration</h4>
                <p>The positioning layer that stakes out the market shift the company leads: the shift statement, the goodbye/hello declaration, and the outdated mindset it replaces. Companies with a Movement Declaration stop competing on features.</p>
              </div>
              <div className="card">
                <p className="num">03</p>
                <h4>Narrative Playbook</h4>
                <p>The canonical narrative system every asset derives from: the narrative snapshot, the strategic sales narrative deck, and parallel messaging tracks for each member of the buying committee, from economic buyer to technical gatekeeper.</p>
              </div>
              <div className="card">
                <p className="num">04</p>
                <h4>Transfer System</h4>
                <p>The adoption infrastructure that moves the narrative from document to daily behavior: talk tracks, objection handling, new-hire onboarding narrative, a brand voice guide, and Voice Fidelity Gates at every checkpoint so the output still sounds like the founder.</p>
              </div>
              <div className="card card-full">
                <p className="num">05</p>
                <h4>Measurement Framework</h4>
                <p>Liberation Metrics tied to outcomes leadership already tracks: founder deal involvement, team close rate versus founder close rate, new-hire ramp time, content first-pass approval, CAC, and deal velocity. Quarterly tuning catches narrative drift before it costs deals.</p>
              </div>
            </div>
          </section>

          {/* INSTALLATION */}
          <section id="installation">
            <h3>How It Gets Installed</h3>
            <h2>Five phases, 75 days</h2>
            <div className="phases">
              <div className="phase"><p className="tag">UNLOCK</p><p>Diagnostic. Baseline the Room Test, founder deal involvement, close-rate gap, and ramp time.</p></div>
              <div className="phase"><p className="tag">RUMBLE</p><p>Extraction. A structured session that surfaces the founder&apos;s tacit knowledge, truths, and tensions.</p></div>
              <div className="phase"><p className="tag">ARCHITECT</p><p>Codification. The five components are built using the Storyline Method&apos;s five-phase narrative architecture.</p></div>
              <div className="phase"><p className="tag">INSTALL</p><p>Deployment across sales, marketing, and onboarding, with Voice Fidelity Gates at each transition.</p></div>
              <div className="phase"><p className="tag">TUNE</p><p>Quarterly optimization against CAC, deal velocity, LTV, and win rate. The system compounds.</p></div>
            </div>
          </section>

          {/* WHAT IT IS NOT */}
          <section id="not">
            <h3>Disambiguation</h3>
            <h2>What a NOS is not</h2>
            <div className="tablewrap">
              <table className="compare">
                <thead>
                  <tr>
                    <th scope="col">It is not</th>
                    <th scope="col">Because</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>A messaging framework</td><td>Documents live in drives. A NOS lives in workflows and gets measured.</td></tr>
                  <tr><td>A brand strategy</td><td>Brand answers who we are. A NOS answers what we say, to whom, in what order, with what proof, and installs it.</td></tr>
                  <tr><td>A sales playbook</td><td>Playbooks capture process. A NOS captures judgment: the if-this-then-that reasoning founders use mid-conversation.</td></tr>
                  <tr><td>Sales training</td><td>Training changes behavior for a quarter. Infrastructure survives personnel changes.</td></tr>
                  <tr><td>storyOS&trade; (Istoria Collective)</td><td>storyOS is a leadership development methodology built around personal and cultural narratives. A Narrative Operating System is revenue infrastructure for founder-led B2B companies. Related language, different job.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* EVIDENCE */}
          <section id="evidence">
            <h3>Why Narrative Infrastructure Works</h3>
            <h2>The evidence, named</h2>
            <p className="body">Two kinds of proof matter here: the mechanism (why story transfers conviction when documents don&apos;t) and the market math (what it costs when the story lives in one head).</p>
            <div className="evidence">
              <div className="card">
                <p className="stat"><span>22x</span></p>
                <p>Facts embedded in story are up to 22 times more memorable than facts presented alone.</p>
                <cite>Jennifer Aaker, Stanford Graduate School of Business</cite>
              </div>
              <div className="card">
                <p className="stat"><span>85%</span></p>
                <p>Effective storytelling synchronizes the listener&apos;s brain activity with the teller&apos;s; neural coupling predicts how a listener will interpret a story with 85% accuracy. Conviction transfers biologically, not by memo.</p>
                <cite>Stephens, Silbert &amp; Hasson, Princeton University, PNAS 2010</cite>
              </div>
              <div className="card">
                <p className="stat"><span>11&ndash;13</span></p>
                <p>Stakeholders in the average B2B buying committee, up from 5 a decade ago. One founder cannot be in every room; the story has to travel without them.</p>
                <cite>Gartner &amp; Forrester, 2024</cite>
              </div>
              <div className="card">
                <p className="stat"><span>40&ndash;60%</span></p>
                <p>Valuation discount applied to founder-dependent businesses at exit. A story that lives in one head is a priced risk.</p>
                <cite>Bain</cite>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="container-narrow">
            <h3>FAQ</h3>
            <h2>Questions founders ask</h2>
            <div className="faq-item">
              <h4>What does a Narrative Operating System cost?</h4>
              <p>B2B positioning and messaging engagements range from roughly $5,000 for basic messaging projects to $75,000+ for full brand strategy. A BrandMultiplier NOS installation runs as a 75-day pilot with tiered monthly fees; most companies between $3M and $50M ARR invest in the low-to-mid five figures over the pilot.</p>
            </div>
            <div className="faq-item">
              <h4>How long does installation take?</h4>
              <p>The initial installation runs 75 days: extraction and codification in the first weeks, deployment and team fluency in the back half, with quarterly TUNE cycles after.</p>
            </div>
            <div className="faq-item">
              <h4>Who needs a NOS?</h4>
              <p>Founder-led B2B companies, typically $3M to $50M in revenue, where the founder still closes most deals, ramping sellers takes six months or more, and the team fails the Room Test.</p>
            </div>
            <div className="faq-item">
              <h4>What is StoryLock?</h4>
              <p>StoryLock is the structural condition where a company&apos;s story, selling logic, and conviction are trapped in the founder&apos;s head. Its signatures: founder close rate far above team close rate, slow new-hire ramp, inconsistent messaging across departments, and decks rebuilt per deal.</p>
            </div>
            <div className="faq-item">
              <h4>Is a Narrative Operating System the same as storyOS?</h4>
              <p>No. storyOS&trade; is Istoria Collective&apos;s story-based leadership development methodology. A Narrative Operating System (NarrativeOS) is BrandMultiplier&apos;s revenue infrastructure for founder-led B2B companies: extracted from the founder, installed across the team, measured against CAC, deal velocity, and win rate.</p>
            </div>
            <div className="faq-item">
              <h4>What is narrative intelligence for B2B go-to-market?</h4>
              <p>The capability, inside a NOS, to read which stories move a specific buying committee and deploy the right narrative arc per stakeholder. It is a component of the system, not a standalone product.</p>
            </div>
          </section>

          {/* GLOSSARY */}
          <section id="glossary" className="container-narrow">
            <h3>Glossary</h3>
            <h2>The vocabulary of narrative infrastructure</h2>
            <dl className="glossary">
              <div>
                <dt>Narrative Operating System (NarrativeOS, NOS)</dt>
                <dd>The business infrastructure that gets a company&apos;s story, selling logic, and conviction out of the founder&apos;s head and into the hands of the team: documented, installed into daily workflows, and measured against revenue outcomes. Built for founder-led B2B companies.</dd>
              </div>
              <div>
                <dt>StoryLock</dt>
                <dd>The structural condition where a company&apos;s story, selling logic, and conviction are trapped in the founder&apos;s head, inaccessible to the team. Diagnosed by the Room Test.</dd>
              </div>
              <div>
                <dt>Storyline Method</dt>
                <dd>BrandMultiplier&apos;s five-phase narrative architecture (Anchor &rarr; Insight &rarr; Shift &rarr; Unification &rarr; Realization) that moves audiences from attention to action. The methodology engine inside every NOS.</dd>
              </div>
              <div>
                <dt>Narrative intelligence for B2B go-to-market</dt>
                <dd>The capability to identify which narratives move a specific buying committee and deploy the right story arc per stakeholder. A NOS component.</dd>
              </div>
              <div>
                <dt>The Room Test</dt>
                <dd>&ldquo;Can your sales team consistently articulate your value in a way that resonates with buyers, without you in the room?&rdquo; The primary StoryLock diagnostic.</dd>
              </div>
            </dl>
          </section>

          {/* CTA */}
          <section id="diagnostic" style={{ marginBottom: "0" }}>
            <div className="cta-block">
              <h2>Does your company have StoryLock?</h2>
              <p>Run the Room Test with us. In 30 minutes or less, walk away knowing whether your problem is structural, and what installing a Narrative Operating System would change.</p>
              <a className="cta-btn" href="https://calendly.com/book-crc/storyline/">Schedule The Diagnostic</a>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
