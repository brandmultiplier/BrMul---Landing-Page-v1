import type { Metadata } from "next";
import Footer from "@/components/navigation/Footer";
import { CTA_LABEL, calendlyHref } from "@/lib/cta";

const SITE = "https://www.brandmultiplier.ai";

export const metadata: Metadata = {
  title: "Client Results | BrandMultiplier",
  description:
    "Seven engagements where the founder's story stopped living in one head—BetterCloud, Apto Solutions, Ledger, Tria Beauty and more, with the numbers that moved.",
  alternates: {
    canonical: `${SITE}/case-studies`,
  },
  openGraph: {
    title: "Client Results | BrandMultiplier",
    description:
      "Seven engagements where the founder's story stopped living in one head—BetterCloud, Apto Solutions, Ledger, Tria Beauty and more, with the numbers that moved.",
    url: `${SITE}/case-studies`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Results | BrandMultiplier",
    description:
      "Seven engagements where the founder's story stopped living in one head—BetterCloud, Apto Solutions, Ledger, Tria Beauty and more, with the numbers that moved.",
  },
};

type Stat =
  | { kind: "figure"; figure: string; label: string }
  | { kind: "note"; figure: string; arrow: string; tail: string; label: string };

type Case = {
  category: string;
  client: string;
  headline: string;
  description: string;
  stats: Stat[];
};

const CASES: Case[] = [
  {
    category: "IT Management / B2B SaaS",
    client: "BetterCloud",
    headline: "From Gartner Visionary to Market Leader",
    description:
      "A strategic narrative overhaul that repositioned a formerly dominant SaaS platform from rapid decline to category leader\u2014recapturing lost market share and earning industry-analyst recognition through a story that aligned product, brand, and buyer experience.",
    stats: [
      { kind: "figure", figure: "25%", label: "market share regained" },
      {
        kind: "note",
        figure: "Gartner Visionary",
        arrow: "\u2192",
        tail: "Leader",
        label: "analyst position",
      },
    ],
  },
  {
    category: "B2B / Technology",
    client: "Apto Solutions",
    headline: "Brand Narrative That Drove YoY Growth",
    description:
      "Partnered with the founding team to build a differentiated brand narrative, sharpen go-to-market strategy, and deploy fresh marketing tactics\u2014positioning the company to lead its category with a story that resonated across buyers and stakeholders.",
    stats: [{ kind: "figure", figure: "+41%", label: "revenue YoY" }],
  },
  {
    category: "Crypto / Web3",
    client: "Ledger",
    headline: "From Hardware Startup to Global Brand Leader",
    description:
      "Unified a fast-scaling crypto company under one cohesive brand identity, then built two new sub-brands\u2014Ledger Quest and Ledger Trust Services\u2014to drive expansion into web3 education and consumer services.",
    stats: [
      { kind: "figure", figure: "+20%", label: "YoY monthly sales" },
      { kind: "figure", figure: "20+", label: "stakeholders aligned" },
      { kind: "figure", figure: "2", label: "net-new brands built" },
    ],
  },
  {
    category: "Agency / B2B",
    client: "Remark Growth Marketing",
    headline: "Helping a Marketing Agency Practice What It Preaches",
    description:
      "Rebuilt a seasoned marketing agency\u2019s brand from the foundation up\u2014new identity, positioning framework, proprietary methodology naming, and website narrative\u2014driving new business beyond referrals.",
    stats: [
      { kind: "figure", figure: "+87%", label: "page views" },
      { kind: "figure", figure: "+28%", label: "average time on page" },
      { kind: "figure", figure: "+44%", label: "lead conversions" },
    ],
  },
  {
    category: "FinTech / B2B SaaS",
    client: "FinTech Platform",
    headline: "Narrative-Driven Conversion Optimization",
    description:
      "Rebuilt the product narrative for a FinTech platform, aligning messaging across the buyer journey to close the gap between product value and market perception\u2014turning feature-level conversations into outcome-driven stories that moved prospects to action.",
    stats: [{ kind: "figure", figure: "+18%", label: "trial-to-paid conversion" }],
  },
  {
    category: "EdTech / Wellness",
    client: "EdTech SMB",
    headline: "Scaling a Founder-Led Education Brand",
    description:
      "Deployed design thinking, Jungian psychology-based audience profiling, and a custom AI content model to build thought leadership and drive measurable revenue growth for a niche online education company.",
    stats: [
      { kind: "figure", figure: "+91%", label: "email signups" },
      { kind: "figure", figure: "+78%", label: "product sales" },
    ],
  },
  {
    category: "Ecommerce / DTC",
    client: "Tria Beauty",
    headline: "Brand Refresh That Drove Immediate Revenue",
    description:
      "Repositioned a light-based skincare technology brand for the North American market with a new verbal identity, audience personas, and emotionally resonant website copy that converted browsers into buyers.",
    stats: [{ kind: "figure", figure: "+63%", label: "YoY website revenue" }],
  },
];

const statText = (stat: Stat) =>
  stat.kind === "figure"
    ? `${stat.figure} ${stat.label}`
    : `${stat.figure} ${stat.arrow} ${stat.tail}`;

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
      "@type": "CollectionPage",
      "@id": `${SITE}/case-studies#page`,
      url: `${SITE}/case-studies`,
      name: "Client Results",
      description:
        "Seven engagements where the founder's story stopped living in one head\u2014BetterCloud, Apto Solutions, Ledger, Tria Beauty and more, with the numbers that moved.",
      publisher: { "@id": "https://brandmultiplier.ai/#org" },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: CASES.length,
        itemListElement: CASES.map((entry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: `${entry.client}\u2014${entry.headline}`,
            about: entry.client,
            genre: entry.category,
            description: entry.description,
            provider: { "@id": "https://brandmultiplier.ai/#org" },
            mentions: entry.stats.map((stat) => statText(stat)),
          },
        })),
      },
    },
  ],
};

const CASE_STUDIES_CSS = `
.cs-page{
  background:#08080F;color:#fff;
  font-family:'Inter',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;
  line-height:1.5;-webkit-font-smoothing:antialiased;
}
.cs-wrap{max-width:1160px;margin:0 auto;padding:0 40px}

.cs-hero{position:relative;overflow:hidden;padding:104px 0 76px}
.cs-hero::before{
  content:"";position:absolute;width:1200px;height:1200px;right:-420px;top:-620px;pointer-events:none;
  background:radial-gradient(circle,rgba(73,64,198,.62) 0%,rgba(73,64,198,.20) 40%,rgba(73,64,198,0) 70%);
}
.cs-hero .cs-wrap{position:relative;z-index:2}
.cs-eyebrow{font-size:14px;font-weight:700;letter-spacing:.30em;text-transform:uppercase;color:#B9B3F2;margin:0 0 26px}
.cs-page h1{font-size:82px;line-height:.98;letter-spacing:-.035em;font-weight:700;margin:0}
.cs-page h1 .cs-dot{color:#F36901}
.cs-deck{font-size:24px;line-height:1.5;color:#C9C6DA;max-width:730px;margin:28px 0 0}
.cs-deck b{color:#fff;font-weight:700}

.cs-cases{padding:24px 0 40px}
.cs-case{
  display:grid;grid-template-columns:250px 1fr 250px;gap:48px;
  padding:44px 0;border-top:1px solid rgba(255,255,255,.10);align-items:start;
}
.cs-cat{font-size:12px;font-weight:700;letter-spacing:.20em;text-transform:uppercase;color:#4940C6;
  filter:brightness(1.65);margin:0 0 12px}
.cs-client{font-size:27px;font-weight:700;letter-spacing:-.015em;line-height:1.15;margin:0}
.cs-head{font-size:21px;font-weight:700;color:#fff;margin:0 0 14px;line-height:1.3}
.cs-desc{font-size:16.5px;line-height:1.62;color:#C9C6DA;margin:0}
.cs-nums{display:flex;flex-direction:column;gap:22px}
.cs-fig{font-size:38px;font-weight:700;line-height:1;letter-spacing:-.03em;color:#F36901}
.cs-nfig{font-size:19px;font-weight:700;line-height:1.25;color:#fff;letter-spacing:-.01em}
.cs-nfig span{color:#F36901}
.cs-lab{font-size:14px;line-height:1.35;color:#8F8BA8;margin-top:7px}

.cs-thread{background:#0D0D16;border-top:1px solid rgba(255,255,255,.10);
  border-bottom:1px solid rgba(255,255,255,.10);padding:78px 0}
.cs-thread h2{font-size:15px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:#B9B3F2;margin:0 0 30px}
.cs-thread-body{border-left:5px solid #4940C6;padding-left:34px;max-width:880px}
.cs-thread-body p{font-size:19.5px;line-height:1.68;color:#C9C6DA;margin:0 0 20px}
.cs-thread-body p:last-child{margin-bottom:0}
.cs-thread-body p b{color:#fff;font-weight:700}
.cs-thread-body .cs-sharp{font-size:22px;color:#fff;font-weight:700}

.cs-cta{padding:82px 0 96px}
.cs-cards{display:grid;grid-template-columns:1fr 1fr;gap:26px}
.cs-card{border:1px solid rgba(255,255,255,.10);border-radius:14px;padding:38px 34px;position:relative;overflow:hidden}
.cs-card-primary{border-color:rgba(243,105,1,.42);background:linear-gradient(180deg,rgba(243,105,1,.09),rgba(243,105,1,0))}
.cs-card-secondary{border-color:rgba(73,64,198,.48);background:linear-gradient(180deg,rgba(73,64,198,.13),rgba(73,64,198,0))}
.cs-k{font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;margin:0 0 16px}
.cs-card-primary .cs-k{color:#F36901}
.cs-card-secondary .cs-k{color:#B9B3F2}
.cs-card h3{font-size:29px;font-weight:700;letter-spacing:-.02em;line-height:1.16;margin:0 0 14px}
.cs-card p{font-size:16px;line-height:1.6;color:#C9C6DA;margin:0 0 26px}
.cs-btn{display:inline-block;text-decoration:none;font-size:14px;font-weight:700;letter-spacing:.10em;
  text-transform:uppercase;padding:14px 24px;border-radius:7px;transition:filter .15s,background .15s}
.cs-btn-solid{background:#F36901;color:#fff}
.cs-btn-solid:hover{filter:brightness(1.08)}
.cs-btn-ghost{border:1px solid rgba(255,255,255,.30);color:#fff}
.cs-btn-ghost:hover{background:rgba(255,255,255,.06)}

@media (max-width:900px){
  .cs-wrap{padding-left:24px;padding-right:24px}
  .cs-hero{padding:64px 0 48px}
  .cs-page h1{font-size:46px}
  .cs-deck{font-size:19px;margin-top:22px}
  .cs-case{grid-template-columns:1fr;gap:20px;padding:36px 0}
  .cs-nums{flex-direction:row;flex-wrap:wrap;gap:26px 40px}
  .cs-fig{font-size:31px}
  .cs-thread{padding:52px 0}
  .cs-thread-body{padding-left:22px;border-left-width:4px}
  .cs-thread-body p{font-size:17px}
  .cs-thread-body .cs-sharp{font-size:19px}
  .cs-cards{grid-template-columns:1fr}
  .cs-card h3{font-size:24px}
}
`;

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="cs-page">
        <style dangerouslySetInnerHTML={{ __html: CASE_STUDIES_CSS }} />

        <header className="cs-hero">
          <div className="cs-wrap">
            <p className="cs-eyebrow">Case Studies</p>
            <h1>
              Client Results<span className="cs-dot">.</span>
            </h1>
            <p className="cs-deck">
              Seven engagements where the story stopped living in one head. What
              we extracted, what we built, and <b>what moved</b>.
            </p>
          </div>
        </header>

        <section className="cs-cases" aria-label="Client engagements">
          <div className="cs-wrap">
            {CASES.map((entry) => (
              <article className="cs-case" key={entry.client}>
                <div>
                  <p className="cs-cat">{entry.category}</p>
                  <h2 className="cs-client">{entry.client}</h2>
                </div>
                <div>
                  <h3 className="cs-head">{entry.headline}</h3>
                  <p className="cs-desc">{entry.description}</p>
                </div>
                <div className="cs-nums">
                  {entry.stats.map((stat) => (
                    <div key={statText(stat)}>
                      {stat.kind === "figure" ? (
                        <div className="cs-fig">{stat.figure}</div>
                      ) : (
                        <div className="cs-nfig">
                          {stat.figure} <span>{stat.arrow}</span> {stat.tail}
                        </div>
                      )}
                      <div className="cs-lab">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cs-thread" aria-labelledby="cs-thread-head">
          <div className="cs-wrap">
            <h2 id="cs-thread-head">The Common Thread</h2>
            <div className="cs-thread-body">
              <p>
                Every engagement starts with the Rumble, a three-hour extraction
                session that surfaces <b>what the founder actually believes</b>{" "}
                rather than the pitch they perform. What comes out is codified
                into a Narrative Snapshot, Strategic Sales Narrative, Voice
                Profile, and Team Fluency Certification, then wired into sales,
                marketing, and customer success.
              </p>
              <p className="cs-sharp">
                Measured in win rate, sales velocity, CAC, and LTV. Not
                impressions.
              </p>
              <p>
                Whether the client is a crypto pioneer, an ecommerce brand, or a
                founder-led startup, the Narrative Operating System provides the
                strategic foundation for sustainable, compounding growth.
              </p>
            </div>
          </div>
        </section>

        <section className="cs-cta" aria-label="Next steps">
          <div className="cs-wrap">
            <div className="cs-cards">
              <div className="cs-card cs-card-primary">
                <p className="cs-k">Start here</p>
                <h3>Book the Narrative Gap Diagnostic</h3>
                <p>
                  A 30-minute call with a live scorecard analysis of your public
                  content—where your story is losing fidelity between you and
                  your team.
                </p>
                <a
                  className="cs-btn cs-btn-solid"
                  href={calendlyHref({
                    slug: "case-studies",
                    placement: "case_studies_primary",
                  })}
                  data-cta="case_studies_primary"
                >
                  {CTA_LABEL}
                </a>
              </div>
              <div className="cs-card cs-card-secondary">
                <p className="cs-k">Not ready yet</p>
                <h3>Open the resource library</h3>
                <p>
                  Twelve written diagnostics and three interactive tools on why
                  founder-led B2B companies stall between $3M and $50M ARR.
                </p>
                <a
                  className="cs-btn cs-btn-ghost"
                  href="/library"
                  data-cta="case_studies_library"
                >
                  brandmultiplier.ai/library
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
