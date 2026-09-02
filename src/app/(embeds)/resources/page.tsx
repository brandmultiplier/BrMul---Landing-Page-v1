import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import {
  RESOURCE_CSS,
  RESOURCE_LOGO,
  RESOURCE_NEW_TAB,
  buildResourcesCollectionLd,
} from "./_shared";
import { CTA_LABEL, calendlyHref } from "@/lib/cta";
import { VSL_CSS, VSL_STRIP_CSS, buildVslVideoLd } from "@/lib/vsl";
import { VSL_TRANSCRIPT, VSL_TRANSCRIPT_TEXT } from "./vsl-transcript";
import WelcomeBanner from "./WelcomeBanner";
import VslBlock from "@/components/vsl/VslBlock";
import VslToolStrip from "./VslToolStrip";
import LegalLinks from "@/components/legal/LegalLinks";

export const metadata: Metadata = {
  title: "Resources - BrandMultiplier",
  description:
    "The BrandMultiplier resource library: narrative infrastructure diagnostics for founder-led B2B companies between $3M and $50M ARR.",
  alternates: {
    canonical: "https://www.brandmultiplier.ai/resources",
  },
  openGraph: {
    type: "website",
    url: "https://www.brandmultiplier.ai/resources",
    siteName: "BrandMultiplier.ai",
    locale: "en_US",
    title: "The BrandMultiplier Resource Library",
    description:
      "Diagnostics on narrative infrastructure, StoryLock, and the structural reasons founder-led B2B companies stall between $3M and $50M ARR.",
    images: [
      {
        url: "https://www.brandmultiplier.ai/brandmultiplier-logo.png",
        width: 512,
        height: 512,
        alt: "The BrandMultiplier Resource Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The BrandMultiplier Resource Library",
    description:
      "Diagnostics on narrative infrastructure, StoryLock, and the structural reasons founder-led B2B companies stall between $3M and $50M ARR.",
    images: ["https://www.brandmultiplier.ai/brandmultiplier-logo.png"],
  },
};

const INDEX_CSS = `
.index-wrap{max-width:960px;margin:0 auto;padding:calc(var(--site-head-h) + 8px) 24px 60px}
.index-lead{font-size:21px;color:#33333a;margin:0 0 22px;max-width:640px}
.index-wrap .cta-wrap{margin:0 0 36px}
.index-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.index-card{display:block;text-decoration:none;color:var(--ink);border:1px solid var(--line);border-radius:14px;padding:20px 22px;transition:border-color .15s,box-shadow .15s;background:#fff}
.index-card:hover{border-color:var(--purple);box-shadow:0 8px 22px rgba(73,64,198,.10)}
.index-card .k{display:block;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--orange);font-weight:700;margin-bottom:8px}
.index-card .t{display:block;font-weight:800;font-size:19px;line-height:1.28;margin-bottom:8px}
.index-card .d{font-size:14px;color:#555;line-height:1.5}
.index-cta{max-width:960px;margin:44px auto 0;padding:32px 24px;border-top:1px solid var(--line);text-align:center}
.index-cta h2{font-size:28px;margin:0 0 10px;color:var(--purple);font-weight:800;letter-spacing:-.01em}
.index-cta p{max-width:560px;margin:0 auto 20px;color:#33333a}
.index-wrap > .cta-wrap{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.index-cta .cta-wrap{display:flex;justify-content:center;margin:0 auto;max-width:none}
.welcome-banner{background:var(--lav);border:1px solid var(--lav2);border-radius:12px;padding:14px 18px;margin:0 0 22px;font-size:16px;font-weight:600;color:var(--ink)}
.bm-strip{margin:4px 0 8px;padding:8px 0 4px}
@media (max-width:860px){
  .index-wrap{padding:calc(var(--site-head-h) + 8px) 16px 48px}
  .index-grid{grid-template-columns:1fr}
  .bm-tools{grid-template-columns:1fr}
  .bm-diag{flex-direction:column;align-items:flex-start;padding:18px 18px;gap:16px}
  .bm-diag__btn{width:100%;text-align:center}
  .bm-strip__head{font-size:22px}
  .bm-strip__sub{font-size:15px;margin-bottom:18px}
  .index-wrap > .cta-wrap{flex-direction:column;align-items:flex-start}
  .index-lead{font-size:17px;margin-bottom:18px}
  .index-card{padding:16px 16px}
  .index-card .t{font-size:17px}
  .index-cta{padding:28px 0 0;margin-top:32px}
  .index-cta h2{font-size:24px}
}
`;

const ARTICLES = [
  {
    slug: "stop-posting-content",
    eyebrow: "Stop Posting Content",
    title: "Stop Posting Content. Start Building Narrative Infrastructure.",
    description:
      "Your marketing agency is turning you into a LinkedIn influencer - and it's the fastest way to stay trapped in every sales call.",
  },
  {
    slug: "the-3-9m-leak",
    eyebrow: "The $3.9M Leak",
    title: 'The Death of the "Magic Touch"',
    description:
      'Your "magic touch" in the sales process isn\'t a competitive advantage - it\'s a $3.9M structural tax on your growth.',
  },
  {
    slug: "the-3m-15m-death-valley",
    eyebrow: "The $3M-$15M Death Valley",
    title:
      "Seven Decisions That Look Like Progress - and Fail for One Structural Reason",
    description:
      "Between $3M and $15M ARR, every logical next move quietly deepens the same trap.",
  },
  {
    slug: "the-450b-ai-hallucination",
    eyebrow: "The $450B AI Hallucination",
    title:
      "Why Narrative Infrastructure, Not Software, Is the Final Lever for B2B ROI",
    description:
      "The industry spent $450B on AI infrastructure. The returns aren't showing up where everyone promised.",
  },
  {
    slug: "the-500k-dead-weight",
    eyebrow: "The $500k Dead Weight",
    title: "A Forensic Audit of the 5 Hires That Bankrupt Founder-Led Sales",
    description:
      'Your $250k "Senior AE" isn\'t failing because they lack talent - they\'re failing because you\'re asking a pilot to fly a plane that doesn\'t have an engine.',
  },
  {
    slug: "the-extraction-economy",
    eyebrow: "The Extraction Economy",
    title: "How AI Made Every Competitor Sound Identical - and What's Still Yours",
    description:
      "When everyone prompts the same models on the same public corpus, the output converges. Your extracted logic is the one thing that can't be copied.",
  },
  {
    slug: "the-multi-protagonist-map",
    eyebrow: "The Multi-Protagonist Map",
    title:
      "Why Your Deal Is Stalling With 8-13 People You've Never Individually Convinced",
    description:
      "It's stalling because 8 to 13 people need to say yes, each needs a different version of the story, and your team is telling all of them the same one.",
  },
  {
    slug: "the-solution-graveyard",
    eyebrow: "The Solution Graveyard",
    title: "Why Eight Fixes Couldn't Solve One Problem",
    description:
      "Every founder-led company buys the same eight fixes in the same order. None of them reach the layer underneath.",
  },
  {
    slug: "the-unicorn-fallacy",
    eyebrow: "The Unicorn Fallacy",
    title: "Why Your Sales Hires Fail - and How to Fix the Narrative Debt",
    description:
      'The "unicorn closer" you\'re hunting doesn\'t exist. The problem was never the talent - it\'s the debt underneath it.',
  },
  {
    slug: "the-valuation-killer",
    eyebrow: "The Valuation Killer",
    title: 'Why Your "Founder Magic" Is a Series B Liability',
    description:
      'Your "founder magic" isn\'t a competitive advantage. To a Series B investor, it\'s a single point of failure that can carve more than a third off your valuation.',
  },
  {
    slug: "what-founders-crossed-50m",
    eyebrow: "What Founders Who Crossed $50M Did at $10M",
    title:
      "What Founders Who Crossed $50M Did at $10M That Almost Nobody Does",
    description:
      "Pattern analysis across 12 founder-led B2B companies that broke the $7M-$12M ceiling - and the four traps that catch the ones that don't.",
  },
  {
    slug: "cac-killer",
    eyebrow: "The CAC Killer",
    title: "Why Your Marketing Agency Is Selling You Fluff While Your Sales Team Starves",
    description:
      "Your marketing agency is selling you aesthetics. Your sales team needs infrastructure.",
  },
];

export default async function Page() {
  const collectionLd = buildResourcesCollectionLd(
    ARTICLES.map(({ slug, title, description }) => ({ slug, title, description })),
  );
  const videoLd = buildVslVideoLd(VSL_TRANSCRIPT_TEXT);
  const showWelcome = (await cookies()).get("bm_welcome")?.value === "1";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: RESOURCE_CSS + INDEX_CSS + VSL_CSS + VSL_STRIP_CSS }} />
      <div className="site-head-bar">
        <header className="site-head">
          <Link className="logo" href="/resources">
            {/* eslint-disable-next-line @next/next/no-img-element -- matches homepage logo lockup */}
            <img src={RESOURCE_LOGO} alt="BrandMultiplier" />
            <span className="logo-text">BrandMultiplier</span>
          </Link>
          <div className="head-actions">
            <Link
              className="back"
              href="/what-is-a-narrative-operating-system"
              {...RESOURCE_NEW_TAB}
            >
              What is NOS?
            </Link>
            <a
              className="btn-nav"
              href={calendlyHref({ slug: "resources-index", placement: "index_nav" })}
              data-cta="nav"
            >
              {CTA_LABEL}
            </a>
          </div>
        </header>
      </div>
      <main className="index-wrap">
        <div className="eyebrow">Resources</div>
        <h1>The BrandMultiplier Resource Library</h1>
        {showWelcome ? <WelcomeBanner /> : null}
        <p className="index-lead">
          Diagnostics on narrative infrastructure, StoryLock, and the
          structural reasons founder-led B2B companies stall between $3M and
          $50M ARR.
        </p>
        <VslBlock
          location="resources"
          transcript={VSL_TRANSCRIPT}
          hideTranscriptUi
        />
        <VslToolStrip />
        <div className="index-grid">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              className="index-card"
              href={`/resources/${article.slug}`}
              prefetch
              {...RESOURCE_NEW_TAB}
            >
              <span className="k">{article.eyebrow}</span>
              <span className="t">{article.title}</span>
              <span className="d">{article.description}</span>
            </Link>
          ))}
        </div>
        <section className="index-cta">
          <h2>Read enough?</h2>
          <p>
            These are diagnostics, not brochures. The live version takes 30
            minutes and uses your own public content. You keep the scorecard
            either way.
          </p>
          <p className="cta-wrap">
            <a
              className="btn-primary"
              href={calendlyHref({ slug: "resources-index", placement: "index_footer" })}
              data-cta="index_footer"
            >
              {CTA_LABEL}
            </a>
          </p>
        </section>
      </main>
      <footer className="site-foot">
        <p>
          <strong>BrandMultiplier</strong> - B2B Narrative Infrastructure for
          Founder-Led Companies.{" "}
          <a href="https://www.brandmultiplier.ai" {...RESOURCE_NEW_TAB}>
            brandmultiplier.ai
          </a>
        </p>
        <p>
          <LegalLinks />
        </p>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }}
      />
    </>
  );
}
