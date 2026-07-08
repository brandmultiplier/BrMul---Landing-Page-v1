import type { Metadata } from "next";
import Footer from "@/components/navigation/Footer";
import RoomTest from "./RoomTest";

export const metadata: Metadata = {
  title: "Hiring In-House vs. Installing a Narrative Operating System | BrandMultiplier",
  description:
    "Should you hire a VP of Sales or install a Narrative Operating System first? The full comparison: fully loaded hiring costs, ramp times, tenure risk, and when hiring first is the right call.",
  alternates: {
    canonical: "https://brandmultiplier.ai/compare/nos-vs-hiring",
  },
  openGraph: {
    title: "Hiring In-House vs. Installing a Narrative Operating System",
    description:
      "The full comparison: fully loaded hiring costs, ramp times, tenure risk, and when hiring first is the right call. For founder-led B2B companies.",
    url: "https://brandmultiplier.ai/compare/nos-vs-hiring",
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
      "@id": "https://brandmultiplier.ai/compare/nos-vs-hiring#article",
      headline: "Hiring In-House vs. Installing a Narrative Operating System",
      author: {
        "@type": "Person",
        name: "Chris Rubin",
        url: "https://www.linkedin.com/in/chrisrubin",
        jobTitle: "Founder & CEO",
        worksFor: { "@id": "https://brandmultiplier.ai/#org" },
      },
      publisher: { "@id": "https://brandmultiplier.ai/#org" },
      datePublished: "2026-07-03",
      dateModified: "2026-07-03",
    },
    {
      "@type": "FAQPage",
      "@id": "https://brandmultiplier.ai/compare/nos-vs-hiring#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Should I hire a VP of Sales or fix my messaging first?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "If your team fails the Room Test, install the system first. 70% of first sales hires fail within year one (SaaStr). A Narrative Operating System extracts and installs that logic first, so the hire you eventually make starts with a working story.",
          },
        },
        {
          "@type": "Question",
          name: "What does a failed sales hire really cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A senior B2B sales hire runs $150,000 to $200,000 base with OTE of $250,000 to $350,000. Fully loaded cost runs 1.25 to 1.4 times base, plus a recruiting fee of 20 to 30%. New hires take 9 to 12 months to carry full quota and average VP of Sales tenure is roughly 19 months. A failed cycle costs $300,000 or more.",
          },
        },
        {
          "@type": "Question",
          name: "Why not hire a VP of Sales who builds the playbook?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The playbook a VP of Sales brings is theirs. Average sales-leader tenure is roughly 19 months, and when they leave, their playbook leaves with them. A Narrative Operating System extracts your selling logic into infrastructure the company owns.",
          },
        },
        {
          "@type": "Question",
          name: "What if the person we hire after installing a NOS still fails?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Then you've lost a hire, and you still own the asset. The extracted narrative, talk tracks, objection logic, and onboarding system stay. The system converts hire failure from a total loss into a personnel decision.",
          },
        },
        {
          "@type": "Question",
          name: "What does a Narrative Operating System cost compared to a senior hire?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A BrandMultiplier NOS installation runs as a 75-day pilot with tiered monthly fees starting at $7,500 per month. A senior hire runs $250,000 to $500,000 or more fully loaded in year one before ramp risk.",
          },
        },
      ],
    },
  ],
};

export default function NosVsHiringPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="ndh-page">
        <style>{`
          .ndh-page {
            background: #0A0A0A;
            color: #fff;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            font-weight: 300;
            font-size: 20px;
            line-height: 32px;
            -webkit-font-smoothing: antialiased;
          }
          .ndh-page main {
            max-width: 1240px;
            margin: 0 auto;
            padding: 0 60px;
          }
          .ndh-page section {
            margin: 80px 0;
          }
          .ndh-page .ndh-narrow {
            max-width: 860px;
          }

          /* Hero */
          .ndh-page .ndh-hero {
            padding: 120px 0 0;
          }
          .ndh-page .ndh-kicker {
            font-size: 16px;
            font-weight: 500;
            letter-spacing: .12em;
            text-transform: uppercase;
            color: #F36901;
            margin-bottom: 24px;
          }
          .ndh-page h1 {
            font-size: 64px;
            font-weight: 500;
            line-height: 1.08;
            margin-bottom: 40px;
            color: #fff;
          }
          .ndh-page .ndh-updated {
            font-size: 14px;
            line-height: 20px;
            color: #A1A1AA;
            margin-bottom: 32px;
          }
          .ndh-page .ndh-def-card {
            background: #080808;
            border: 1px solid rgba(255,255,255,0.08);
            border-left: 3px solid #4940C6;
            border-radius: 2px;
            padding: 40px;
          }
          .ndh-page .ndh-def-card p {
            font-size: 20px;
            font-weight: 300;
            line-height: 32px;
            margin: 0;
          }

          /* Headings */
          .ndh-page h2 {
            font-size: 48px;
            font-weight: 500;
            line-height: 1.15;
            margin-bottom: 32px;
            color: #fff;
          }
          .ndh-page h3 {
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            letter-spacing: .08em;
            text-transform: uppercase;
            color: #A1A1AA;
            margin-bottom: 12px;
          }
          .ndh-page p {
            margin-bottom: 20px;
          }
          .ndh-page p.ndh-body {
            font-size: 20px;
            font-weight: 300;
            line-height: 32px;
          }
          .ndh-page .ndh-accent-o { color: #F36901; font-weight: 600; }
          .ndh-page a.ndh-inline {
            color: #fff;
            font-weight: 400;
            text-decoration: underline;
            text-decoration-color: #4940C6;
            text-underline-offset: 4px;
          }
          .ndh-page a.ndh-inline:hover { text-decoration-thickness: 2px; }
          .ndh-page a.ndh-accent-link {
            color: #F36901;
            font-weight: 600;
            text-decoration: none;
          }
          .ndh-page a.ndh-accent-link:hover { filter: brightness(1.15); }

          /* Room Test */
          .ndh-roomtest {
            background: #080808;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 2px;
            padding: 40px;
            margin-top: 24px;
          }
          .ndh-roomtest-q {
            font-size: 24px;
            font-weight: 500;
            line-height: 36px;
            margin-bottom: 24px;
          }
          .ndh-choices {
            display: flex;
            gap: 16px;
            margin-bottom: 8px;
            flex-wrap: wrap;
          }
          .ndh-choices button {
            font-family: inherit;
            font-size: 18px;
            font-weight: 500;
            line-height: 28px;
            color: #fff;
            background: rgba(255,255,255,0.05);
            padding: 10px 40px;
            border-radius: 100px;
            border: 1px solid rgba(255,255,255,0.2);
            cursor: pointer;
            transition: border-color .2s, background .2s;
          }
          .ndh-choices button:hover { border-color: rgba(255,255,255,0.55); }
          .ndh-choices button.selected {
            background: #4940C6;
            border-color: #4940C6;
          }
          .ndh-roomtest-answer {
            font-size: 18px;
            font-weight: 400;
            line-height: 28px;
            color: #A1A1AA;
            margin-top: 20px;
            margin-bottom: 0;
          }
          .ndh-roomtest-answer strong { color: #fff; font-weight: 700; }

          /* Tables */
          .ndh-tablewrap {
            background: #080808;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 2px;
            overflow-x: auto;
          }
          .ndh-page table {
            width: 100%;
            border-collapse: collapse;
          }
          .ndh-page table th {
            font-size: 14px;
            font-weight: 500;
            letter-spacing: .08em;
            text-transform: uppercase;
            color: #A1A1AA;
            text-align: left;
            padding: 16px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .ndh-page table th.ndh-th-nos { color: #fff; }
          .ndh-page table th.ndh-th-nos span { color: #F36901; }
          .ndh-page table td {
            font-size: 17px;
            font-weight: 400;
            line-height: 27px;
            padding: 20px;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            vertical-align: top;
            color: #A1A1AA;
          }
          .ndh-page table.ndh-compare td:first-child {
            font-weight: 600;
            color: #fff;
            white-space: nowrap;
          }
          .ndh-page table tr:last-child td { border-bottom: none; }

          /* Cost table specifics */
          .ndh-page table.ndh-cost td.ndh-line { font-weight: 600; color: #fff; }
          .ndh-page table.ndh-cost td.ndh-src {
            font-size: 14px;
            line-height: 22px;
            color: #52525B;
          }
          .ndh-page table.ndh-cost tr.ndh-total td {
            font-weight: 700;
            color: #fff;
            border-top: 2px solid #4940C6;
          }

          /* Cards */
          .ndh-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          .ndh-card {
            background: #080808;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 2px;
            padding: 40px;
          }
          .ndh-card .ndh-num {
            font-size: 14px;
            font-weight: 700;
            color: #4940C6;
            letter-spacing: .1em;
            margin-bottom: 16px;
          }
          .ndh-card h4 {
            font-size: 22px;
            font-weight: 500;
            line-height: 30px;
            margin-bottom: 12px;
            color: #fff;
          }
          .ndh-card p {
            font-size: 16px;
            font-weight: 400;
            line-height: 26px;
            color: #A1A1AA;
            margin: 0;
          }

          /* Evidence */
          .ndh-evidence {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
          .ndh-evidence .ndh-card .ndh-stat {
            font-size: 40px;
            font-weight: 500;
            color: #fff;
            margin-bottom: 10px;
          }
          .ndh-evidence .ndh-card .ndh-stat span { color: #4940C6; }
          .ndh-evidence .ndh-card cite {
            display: block;
            font-style: normal;
            font-size: 14px;
            line-height: 20px;
            color: #52525B;
            margin-top: 14px;
          }
          .ndh-evidence .ndh-card p { margin: 0; }

          /* Pull quote */
          .ndh-pullquote {
            border-left: 3px solid #F36901;
            padding: 8px 0 8px 32px;
            margin: 40px 0;
          }
          .ndh-pullquote p {
            font-size: 24px;
            font-weight: 300;
            line-height: 38px;
            margin-bottom: 12px;
          }
          .ndh-pullquote cite {
            font-style: normal;
            font-size: 14px;
            line-height: 20px;
            color: #52525B;
          }

          /* Concession */
          .ndh-concession {
            background: #080808;
            border: 1px solid rgba(255,255,255,0.08);
            border-left: 3px solid #F36901;
            border-radius: 2px;
            padding: 40px;
            margin-top: 40px;
          }
          .ndh-concession.ndh-purple { border-left-color: #4940C6; margin-top: 0; }
          .ndh-concession h4 {
            font-size: 22px;
            font-weight: 500;
            line-height: 30px;
            margin-bottom: 14px;
            color: #fff;
          }
          .ndh-concession p,
          .ndh-concession li {
            font-size: 18px;
            font-weight: 400;
            line-height: 28px;
            color: #A1A1AA;
          }
          .ndh-concession ul {
            list-style: none;
            display: grid;
            gap: 10px;
            margin-top: 8px;
            padding: 0;
          }
          .ndh-concession li::before {
            content: "·";
            color: #F36901;
            font-weight: 700;
            margin-right: 12px;
          }
          .ndh-concession.ndh-purple li::before { color: #4940C6; }

          /* Fit section */
          .ndh-fit-card {
            background: #080808;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 2px;
            padding: 40px;
          }
          .ndh-fit-card h4 { font-size: 22px; font-weight: 500; margin-bottom: 16px; color: #fff; }
          .ndh-fit-card ul { list-style: none; display: grid; gap: 12px; padding: 0; }
          .ndh-fit-card li {
            font-size: 17px;
            font-weight: 400;
            line-height: 27px;
            color: #A1A1AA;
            display: flex;
            gap: 12px;
          }
          .ndh-fit-card li::before { content: "·"; font-weight: 700; }
          .ndh-fit-card.ndh-for li::before { color: #4940C6; }
          .ndh-fit-card.ndh-notfor li::before { color: #F36901; }

          /* FAQ */
          .ndh-faq-item {
            background: #080808;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 2px;
            padding: 40px;
            margin-bottom: 16px;
          }
          .ndh-faq-item h4 {
            font-size: 22px;
            font-weight: 500;
            line-height: 32px;
            margin-bottom: 14px;
            color: #fff;
          }
          .ndh-faq-item p {
            font-size: 18px;
            font-weight: 400;
            line-height: 28px;
            color: #A1A1AA;
            margin: 0;
          }

          /* CTA */
          .ndh-cta-block {
            background: #080808;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 2px;
            padding: 64px 40px;
            text-align: center;
          }
          .ndh-cta-block h2 { margin-bottom: 16px; }
          .ndh-cta-block p {
            font-size: 20px;
            font-weight: 300;
            color: #A1A1AA;
            max-width: 640px;
            margin: 0 auto 40px;
          }
          .ndh-cta-btn {
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
          .ndh-cta-btn:hover {
            box-shadow: 0 0 56px rgba(168,85,247,0.8);
            border-color: rgba(255,255,255,0.55);
            transform: scale(1.02);
          }
          .ndh-cta-sub {
            margin: 32px auto 0 !important;
          }

          /* ── Responsive ── */

          /* Large tablet: 768–1023px */
          @media (max-width: 1023px) {
            .ndh-page { font-size: 18px; line-height: 29px; }
            .ndh-page main { padding: 0 40px; }
            .ndh-page section { margin: 64px 0; }
            .ndh-page .ndh-hero { padding: 100px 0 0; }
            .ndh-page h1 { font-size: 48px; line-height: 1.08; margin-bottom: 28px; }
            .ndh-page h2 { font-size: 36px; margin-bottom: 24px; }
            .ndh-page .ndh-def-card p { font-size: 18px; line-height: 29px; }
            .ndh-page p.ndh-body { font-size: 18px; line-height: 29px; }
            .ndh-evidence { grid-template-columns: 1fr 1fr 1fr; }
            .ndh-evidence .ndh-card .ndh-stat { font-size: 32px; }
            .ndh-pullquote p { font-size: 20px; line-height: 32px; }
          }

          /* Small tablet: 600–767px */
          @media (max-width: 767px) {
            .ndh-page { font-size: 17px; line-height: 27px; }
            .ndh-page main { padding: 0 28px; }
            .ndh-page section { margin: 52px 0; }
            .ndh-page .ndh-hero { padding: 88px 0 0; }
            .ndh-page h1 { font-size: 38px; line-height: 1.1; }
            .ndh-page h2 { font-size: 30px; }
            .ndh-grid { grid-template-columns: 1fr; }
            .ndh-evidence { grid-template-columns: 1fr 1fr; }
            .ndh-page .ndh-def-card { padding: 28px; }
            .ndh-card { padding: 28px; }
            .ndh-fit-card { padding: 28px; }
            .ndh-faq-item { padding: 28px; }
            .ndh-roomtest { padding: 28px; }
            .ndh-concession { padding: 28px; }
            .ndh-cta-block { padding: 48px 28px; }
            /* allow table first col to wrap */
            .ndh-page table.ndh-compare td:first-child { white-space: normal; }
            .ndh-page table td { font-size: 15px; padding: 16px; }
          }

          /* Mobile: ≤599px */
          @media (max-width: 599px) {
            .ndh-page { font-size: 16px; line-height: 26px; }
            .ndh-page main { padding: 0 20px; }
            .ndh-page section { margin: 40px 0; }
            .ndh-page .ndh-hero { padding: 80px 0 0; }
            .ndh-page h1 { font-size: 30px; line-height: 1.12; margin-bottom: 20px; }
            .ndh-page h2 { font-size: 24px; margin-bottom: 18px; }
            .ndh-page h3 { font-size: 13px; margin-bottom: 8px; }
            .ndh-page .ndh-kicker { font-size: 13px; margin-bottom: 16px; }
            .ndh-page .ndh-def-card { padding: 20px; }
            .ndh-page .ndh-def-card p { font-size: 16px; line-height: 26px; }
            .ndh-page p.ndh-body { font-size: 16px; line-height: 26px; }
            .ndh-roomtest { padding: 20px; }
            .ndh-roomtest-q { font-size: 18px; line-height: 28px; }
            .ndh-choices button { padding: 10px 24px; font-size: 16px; }
            .ndh-card { padding: 20px; }
            .ndh-card h4 { font-size: 18px; line-height: 26px; }
            .ndh-card p { font-size: 15px; line-height: 24px; }
            .ndh-fit-card { padding: 20px; }
            .ndh-faq-item { padding: 20px; margin-bottom: 12px; }
            .ndh-faq-item h4 { font-size: 18px; line-height: 26px; }
            .ndh-faq-item p { font-size: 16px; line-height: 26px; }
            .ndh-concession { padding: 20px; }
            .ndh-concession h4 { font-size: 18px; }
            .ndh-concession p, .ndh-concession li { font-size: 16px; line-height: 26px; }
            .ndh-grid { grid-template-columns: 1fr; gap: 16px; }
            .ndh-evidence { grid-template-columns: 1fr; gap: 16px; }
            .ndh-evidence .ndh-card .ndh-stat { font-size: 28px; }
            .ndh-pullquote { padding-left: 20px; margin: 28px 0; }
            .ndh-pullquote p { font-size: 18px; line-height: 28px; }
            .ndh-page table.ndh-compare td:first-child { white-space: normal; }
            .ndh-page table th { font-size: 12px; padding: 12px 14px; }
            .ndh-page table td { font-size: 14px; line-height: 22px; padding: 12px 14px; }
            .ndh-cta-block { padding: 36px 20px; }
            .ndh-cta-block p { font-size: 16px; }
            .ndh-cta-btn { display: block; width: 100%; text-align: center; padding: 14px 20px; font-size: 16px; box-sizing: border-box; }
          }

          /* Very small phones: ≤374px */
          @media (max-width: 374px) {
            .ndh-page main { padding: 0 16px; }
            .ndh-page h1 { font-size: 26px; }
            .ndh-page h2 { font-size: 22px; }
          }
        `}</style>

        <main>

          {/* HERO */}
          <section className="ndh-hero" id="quick-answer">
            <p className="ndh-kicker">The Comparison</p>
            <h1>Hiring In-House vs. Installing a Narrative Operating&nbsp;System</h1>
            <p className="ndh-updated">Last updated: July 2026 · Reviewed by Chris Rubin, Founder &amp; CEO, BrandMultiplier</p>
            <div className="ndh-def-card">
              <p><strong>Quick answer:</strong> if your team can&apos;t sell without you in the room, the next hire inherits that condition, and 70% of first sales hires fail within year one for exactly that reason (SaaStr). A <strong>Narrative Operating System (NarrativeOS, or NOS)</strong> extracts your selling logic into infrastructure the company owns, so the hire you eventually make starts with a working story instead of reverse-engineering yours. The comparison below runs the full math: fully loaded hiring costs, ramp times, tenure risk, and the cases where hiring first is genuinely the right call.</p>
            </div>
          </section>

          {/* ROOM TEST — interactive client component */}
          <section id="room-test" className="ndh-narrow">
            <h3>Before the Math, One Question</h3>
            <RoomTest />
          </section>

          {/* COMPARISON TABLE */}
          <section id="comparison">
            <h3>The Head-to-Head</h3>
            <h2>Hire into the vacuum, or install the system first</h2>
            <div className="ndh-tablewrap">
              <table className="ndh-compare">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Hire into the vacuum</th>
                    <th scope="col" className="ndh-th-nos">Install the NOS, <span>then hire</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>What you&apos;re buying</td>
                    <td>A person who carries a story in their head. Theirs, from their last company.</td>
                    <td>Your selling logic, extracted, documented, and installed across the team.</td>
                  </tr>
                  <tr>
                    <td>Day one</td>
                    <td>They start reverse-engineering how you sell by shadowing your calls.</td>
                    <td>They inherit the story: talk tracks, objection logic, proof, in your voice.</td>
                  </tr>
                  <tr>
                    <td>Ramp</td>
                    <td>9 months to real customer conversations, 12 to full quota (Brooks Group, survey of 150+ B2B sales leaders).</td>
                    <td>Ramp measured against an installed narrative, in weeks.</td>
                  </tr>
                  <tr>
                    <td>Risk if it underperforms</td>
                    <td>Severance, a restarted search, 9 months sunk, pipeline damage. The knowledge leaves with them.</td>
                    <td>A bounded 75-day pilot with defined metrics. The system stays either way.</td>
                  </tr>
                  <tr>
                    <td>Three years in</td>
                    <td>You&apos;re still the closer of last resort.</td>
                    <td>Team close rate approaching founder rate. You&apos;re only in the deals that need a founder.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* THE HIRING MATH */}
          <section id="hiring-math">
            <h3>The Math Founders Skip</h3>
            <h2>What the hire actually costs</h2>
            <p className="ndh-body ndh-narrow">Most founders budget the salary and miss the rest. Here is the fully loaded, line-item cost of a senior B2B sales hire, every line sourced.</p>
            <div className="ndh-tablewrap" style={{ marginTop: "32px" }}>
              <table className="ndh-cost">
                <thead>
                  <tr><th scope="col">Line item</th><th scope="col">Cost</th><th scope="col">Source</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="ndh-line">Base salary, VP of Sales</td>
                    <td>$150K–$200K (OTE $250K–$350K)</td>
                    <td className="ndh-src">Glassdoor, 2026; The CRO Report, analysis of 704 job postings, 2026</td>
                  </tr>
                  <tr>
                    <td className="ndh-line">Fully loaded multiplier</td>
                    <td>1.25–1.4&times; base (taxes, benefits, overhead)</td>
                    <td className="ndh-src">Joseph Hadzima, MIT Sloan</td>
                  </tr>
                  <tr>
                    <td className="ndh-line">Recruiting fee</td>
                    <td>20–30% of first-year compensation</td>
                    <td className="ndh-src">Retained executive search norms</td>
                  </tr>
                  <tr>
                    <td className="ndh-line">Ramp drag</td>
                    <td>9 months to customer conversations, 12 to full quota</td>
                    <td className="ndh-src">Brooks Group, survey of 150+ B2B sales leaders</td>
                  </tr>
                  <tr>
                    <td className="ndh-line">Tenure risk</td>
                    <td>~19 months average VP of Sales tenure</td>
                    <td className="ndh-src">The Bridge Group</td>
                  </tr>
                  <tr className="ndh-total">
                    <td className="ndh-line">One failed cycle</td>
                    <td>$300K+ in year one, before the cost of starting over</td>
                    <td className="ndh-src">Derived from the lines above</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="ndh-evidence" style={{ marginTop: "48px" }}>
              <div className="ndh-card">
                <p className="ndh-stat"><span>70%</span></p>
                <p>of first sales hires fail within their first year, hired into companies with zero enablement infrastructure.</p>
                <cite>SaaStr (practitioner data, largest SaaS operator community)</cite>
              </div>
              <div className="ndh-card">
                <p className="ndh-stat"><span>19</span> months</p>
                <p>average tenure of a VP of Sales. When they leave, the playbook they brought leaves with them.</p>
                <cite>The Bridge Group</cite>
              </div>
              <div className="ndh-card">
                <p className="ndh-stat"><span>40–60%</span></p>
                <p>valuation discount applied to founder-dependent businesses at exit.</p>
                <cite>Bain &amp; Company</cite>
              </div>
            </div>

            <div className="ndh-pullquote ndh-narrow">
              <p>&ldquo;Founders close at rates roughly 50% higher than their best salespeople. That&apos;s a structural credibility advantage, and it doesn&apos;t transfer by osmosis.&rdquo;</p>
              <cite>Eyal Worthalter, Marvell (practitioner observation)</cite>
            </div>
          </section>

          {/* RIGHT INVESTMENTS, WRONG ORDER */}
          <section id="wrong-order">
            <h3>The Assemble-It-Yourself Path</h3>
            <h2>Right investments, wrong order</h2>
            <p className="ndh-body ndh-narrow">None of these are bad purchases. Each one fails the same way when it&apos;s installed before the story exists to deploy: it builds delivery capacity for a narrative nobody has extracted yet.</p>
            <div className="ndh-grid" style={{ marginTop: "40px" }}>
              <div className="ndh-card">
                <p className="ndh-num">$150K+/YR</p>
                <h4>The product marketing hire</h4>
                <p>Hired to translate the founder&apos;s thinking into messaging. Spends year one interviewing the founder and refereeing leadership debates about what the company actually is, because the source material was never extracted.</p>
              </div>
              <div className="ndh-card">
                <p className="ndh-num">$8–15K/MO</p>
                <h4>The fractional CMO</h4>
                <p>Brings senior expertise in. Doesn&apos;t extract what makes your company different out. Their strategy is built on their experience, and it walks out the door when they do.</p>
              </div>
              <div className="ndh-card">
                <p className="ndh-num">$10–30K</p>
                <h4>The brand agency</h4>
                <p>Produces polished decks and guidelines from discovery interviews. The artifact captures the performed story, the one you tell, and misses the believed story, the one that closes.</p>
              </div>
              <div className="ndh-card">
                <p className="ndh-num">60–80 HRS/MO</p>
                <h4>Your own time as the workaround</h4>
                <p>The most expensive line on the list. Every deal you personally rescue is calendar capacity the company can&apos;t scale, and it compounds monthly while the alternatives above underperform.</p>
              </div>
            </div>
            <p className="ndh-body ndh-narrow" style={{ marginTop: "40px" }}>Run in the right order, these same investments compound: the system gets extracted and installed first, and the PMM, the fractional, the agency, and the new VP all deploy it instead of guessing at it. A NOS installation runs as a 75-day pilot with monthly fees starting at $7.5K, against the $250K–$500K+ fully loaded year-one cost of the senior hire it de-risks. Or get your own number first with the <a className="ndh-inline" href="https://brandmultiplier.ai/storylock-tax">StoryLock Tax Calculator</a>.</p>
          </section>

          {/* THE VP OBJECTION */}
          <section id="vp-objection" className="ndh-narrow">
            <h3>The Strongest Objection</h3>
            <h2>&ldquo;Why not hire a VP of Sales who builds the playbook?&rdquo;</h2>
            <p className="ndh-body">It&apos;s the right question, and it deserves a straight answer.</p>
            <p className="ndh-body">A great sales leader arrives with a playbook. But the playbook they bring is theirs: pattern-matching from their last company, their last market, their last product. The playbook that closes your deals is yours: the selling logic that already wins at founder-level rates when you&apos;re in the room. Those are different assets, and the second one doesn&apos;t exist on paper anywhere. It exists in your head.</p>
            <p className="ndh-body">So the VP spends their first two quarters doing amateur extraction: shadowing your calls, interviewing you between meetings, reconstructing your judgment from fragments. Average VP of Sales tenure is roughly 19 months (The Bridge Group). If they leave at the average, the reconstruction leaves with them, and the next VP starts the dig from zero.</p>
            <p className="ndh-body">Installing the NOS first changes what you&apos;re hiring for. The VP inherits documented selling logic on day one and spends their tenure doing what you actually hired them for: building and running a team against a story that already works.</p>
            <div className="ndh-concession">
              <h4>When hiring first is the right call</h4>
              <p>Honesty over symmetry: there are cases where the senior hire should come first, and this page would be weaker for pretending otherwise.</p>
              <ul>
                <li>You&apos;re past roughly $20M with a repeatable sales motion your team already runs without you</li>
                <li>Your team passes the Room Test and your constraint is capacity or coverage</li>
                <li>Your motion is transactional or product-led, where deals close without narrative-heavy selling</li>
              </ul>
              <p style={{ marginTop: "16px" }}>If that&apos;s you, hire. We&apos;d rather you skip us for the right reason than engage for the wrong one.</p>
            </div>
          </section>

          {/* HONEST LIMITATIONS */}
          <section id="limitations" className="ndh-narrow">
            <h3>Honest Limitations</h3>
            <h2>What a NOS won&apos;t do</h2>
            <div className="ndh-concession ndh-purple">
              <ul>
                <li>It won&apos;t source, screen, or place candidates. It&apos;s the infrastructure your hires plug into; the search itself is still yours to run.</li>
                <li>It won&apos;t run your funnel or produce your content at volume. It&apos;s the system your content and sales motion derive from.</li>
                <li>It won&apos;t replace a sales leader at scale. Past a certain size you need both: the system and the executive who runs the team on it.</li>
                <li>It won&apos;t work without the founder. Extraction requires roughly a day of your time up front. If you can&apos;t invest that, don&apos;t start.</li>
              </ul>
            </div>
          </section>

          {/* RISK */}
          <section id="risk" className="ndh-narrow">
            <h3>The Risk Structure</h3>
            <h2>Bounded by design</h2>
            <p className="ndh-body">The installation runs as a 75-day pilot with defined scope and metrics agreed before it starts. Progress is measured against Liberation Metrics your leadership already understands: founder deal involvement, team close rate versus founder close rate, new-hire ramp time, and content first-pass approval. Movement shows up during the pilot, before any new hire exists, because the first deployments are to the team you already have.</p>
            <p className="ndh-body">Compare the failure modes. A failed senior hire costs $300K+, 9 sunk months, and the knowledge walks out the door. A pilot that ends at day 75 leaves you owning every extracted asset: the narrative, the talk tracks, the objection logic, the onboarding system. One of these failure modes is survivable by design.</p>
          </section>

          {/* FOR / NOT FOR */}
          <section id="fit">
            <h3>Fit</h3>
            <h2>Built for. Not for.</h2>
            <div className="ndh-grid">
              <div className="ndh-fit-card ndh-for">
                <h4>Built for</h4>
                <ul>
                  <li>Founder-led B2B companies, $3M–$50M in revenue</li>
                  <li>Complex offerings that require explanation to sell</li>
                  <li>Founders who close at rates their team can&apos;t reproduce</li>
                  <li>Companies about to make (or remake) a senior sales or marketing hire</li>
                  <li>Post-product-market-fit: customers exist and love the product</li>
                </ul>
              </div>
              <div className="ndh-fit-card ndh-notfor">
                <h4>Not for</h4>
                <ul>
                  <li>Pre-product-market-fit companies (stay in sales; you&apos;re still learning)</li>
                  <li>Transactional or self-serve motions where story isn&apos;t the constraint</li>
                  <li>Founders unwilling to invest extraction time</li>
                  <li>Anyone shopping for a cheaper agency. This is infrastructure, priced like it</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="ndh-narrow">
            <h3>Common Questions</h3>
            <h2>FAQ</h2>
            <div className="ndh-faq-item">
              <h4>Should I hire a VP of Sales or fix my messaging first?</h4>
              <p>If your team fails the Room Test, install the system first. 70% of first sales hires fail within year one (SaaStr), typically because they were hired into a company where the selling logic lives only in the founder&apos;s head. If you&apos;re past roughly $20M with a repeatable motion your team already runs without you, a senior sales leader may be the right first move.</p>
            </div>
            <div className="ndh-faq-item">
              <h4>What does a failed sales hire really cost?</h4>
              <p>Far more than salary. Base runs $150K–$200K with OTE of $250K–$350K (Glassdoor 2026; The CRO Report), fully loaded cost runs 1.25–1.4&times; base (Joseph Hadzima, MIT Sloan), recruiting adds 20–30% of first-year comp, and ramp takes 9–12 months (Brooks Group). One failed cycle costs $300K+ before the cost of starting over.</p>
            </div>
            <div className="ndh-faq-item">
              <h4>What if the person we hire after installing a NOS still fails?</h4>
              <p>Then you&apos;ve lost a hire, and you still own the asset. The extracted narrative, talk tracks, objection logic, and onboarding system stay. The next person plugs into them. The system converts hire failure from a total loss into a personnel decision.</p>
            </div>
            <div className="ndh-faq-item">
              <h4>Does the system keep working after installation?</h4>
              <p>The installed system is yours permanently. Markets, competitors, and messaging drift, which is why installations include quarterly TUNE cycles that recalibrate the narrative against the revenue metrics leadership already tracks.</p>
            </div>
            <div className="ndh-faq-item">
              <h4>What does a NOS cost compared to the hire?</h4>
              <p>The installation runs as a 75-day pilot with tiered monthly fees starting at $7.5K/month. The senior hire runs $250K–$500K+ fully loaded in year one before ramp risk. They aren&apos;t substitutes: the system is what makes the eventual hire work.</p>
            </div>
            <div className="ndh-faq-item">
              <h4>What is a Narrative Operating System, precisely?</h4>
              <p>The full definition, the five components, and the installation process live on the definitional page: <a className="ndh-inline" href="https://brandmultiplier.ai/what-is-a-narrative-operating-system">What Is a Narrative Operating System?</a></p>
            </div>
          </section>

          {/* CTA */}
          <section style={{ marginBottom: "0" }}>
            <div className="ndh-cta-block">
              <h2>Run the diagnostic before you run the search</h2>
              <p>Thirty minutes or less. Zero pressure, purely diagnostic. You&apos;ll leave knowing whether your next dollar belongs in a hire or in the system the hire needs.</p>
              <a className="ndh-cta-btn" href="https://calendly.com/book-crc/storyline/">Schedule The Diagnostic</a>
              <p className="ndh-cta-sub"><a className="ndh-accent-link" href="https://brandmultiplier.ai/storylock-tax">Or calculate your StoryLock Tax first &rarr;</a></p>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
