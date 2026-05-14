"use client";

/**
 * StoryLock Tax Calculator—v2 (parallel A/B variant of /storylock-tax).
 * Content/structure/math from 02_StoryLock-Tax-Calculator (1).html (4-tax stack, 5-level taxonomy).
 * Plumbing (API, business-email gate, gtag, Calendly CTA) ported from sibling /storylock-tax.
 * Payload sends new field names (arr, mult, closePct, hours, fails, aecost, rate, tier, level_match).
 * LocalStorage key `storylock_v2_unlocked` to keep v2 unlock state isolated from v1.
 */

import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import {
  BUSINESS_EMAIL_REQUIRED_MESSAGE,
  isBusinessEmail,
} from "@/lib/business-email";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

// Calendly CTA—same root as live page, scoped utm_content for v2 split in GA.
const CTA_HREF =
  "https://calendly.com/book-crc/storyline/?utm_source=linkedin&utm_medium=social&utm_campaign=personal_profile_chris&utm_content=storylock_tax_v2&month=2026-04";

const UNLOCK_STORAGE_KEY = "storylock_v2_unlocked";
const UNLOCK_NAME_KEY = "storylock_v2_name";
const UNLOCK_EMAIL_KEY = "storylock_v2_email";

type TabKey = "calc" | "levels" | "proof";

type Verdict = {
  tier: string;
  levelMatch: 1 | 2 | 3 | 4;
  body: string;
  action: string;
};

const fmt = (n: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(n));

const computeVerdict = (
  closePct: number,
  fails: number,
  hours: number,
): Verdict => {
  if (closePct >= 80 || (fails >= 2 && hours >= 25)) {
    return {
      tier: "Critical StoryLock",
      levelMatch: 1,
      body:
        "You are not running a company. You are running a sales floor that happens to have a product attached to it. The hiring loop is funded by a belief that the next person will be different. The math on this page says the next person will not be different—because the variable you keep adjusting is not the variable that determines the outcome.",
      action:
        "The work that fixes this takes about ten hours of your time over seventy-five days. You spend that much in a slow week of sales calls your team should be handling.",
    };
  }
  if (closePct >= 60 || (fails >= 1 && hours >= 15)) {
    return {
      tier: "Significant StoryLock",
      levelMatch: 2,
      body:
        "The team can handle some deals; the ones that matter still route to you. Marketing is producing collateral that translates something that was never fully articulated. You are paying for the gap quarterly—in hours, in delayed hires, in the discount a buyer will eventually apply to your valuation.",
      action:
        "The window where this is fixable in one quarter is open. It does not stay open. The fix is finite. Postponement is not.",
    };
  }
  if (closePct >= 40 || fails >= 1) {
    return {
      tier: "Moderate StoryLock",
      levelMatch: 3,
      body:
        "You have built more transferable structure than most founders at your stage, and the team can carry meaningful weight without you. The remaining gap is real—and it shows up at the deals you cannot afford to lose, the hires that take longer than they should, and the marketing that lands close to your voice but never exactly in it.",
      action:
        "Closing the last twenty percent of the gap is what separates a company that scales from one that plateaus. The work compounds.",
    };
  }
  return {
    tier: "Light StoryLock",
    levelMatch: 4,
    body:
      "The system is largely in place. The team carries weight. The remaining drift is operational, not structural. You are in a rarer category than the data on this page assumes.",
    action:
      "From here, the work is maintenance and amplification rather than extraction. Worth confirming the system is genuinely codified rather than reliant on the current people who happen to be carrying it.",
  };
};

type LevelDef = {
  n: 1 | 2 | 3 | 4 | 5;
  name: string;
  where: string;
  body: string;
  indicators: { label: string; value: string }[];
};

const LEVELS: LevelDef[] = [
  {
    n: 1,
    name: "Locked",
    where: "Story lives entirely in the founder's head",
    body:
      "You are the company. The pitch is you. The close is you. The product story is yours and yours alone, and the team has been trying to reconstruct it from the residue of the calls they were allowed to watch. Every deal that closes runs through you. Every deal that doesn't is lost to the gap.",
    indicators: [
      { label: "Founder close rate", value: "80%+" },
      { label: "Team selling without you", value: "Impossible" },
      { label: "Founder hours / week in sales", value: "30+" },
      { label: "Growth ceiling", value: "Your calendar" },
    ],
  },
  {
    n: 2,
    name: "Performed",
    where:
      "Story lives in the founder's performance—the team mimics, but cannot reproduce",
    body:
      "You have given the same pitch enough times that the team has memorized phrases. They use your vocabulary. They cannot, however, deploy your reasoning. When a buyer pushes back outside the memorized script, the deal stalls or the team escalates. The story exists as a performance, not as a system. Watch a sales rep try to handle a hard objection—the moment of failure is the moment they reach for a phrase you said and discover the phrase has no engine behind it.",
    indicators: [
      { label: "Founder close rate", value: "60–80%" },
      { label: "Team selling without you", value: "Light deals only" },
      { label: "Founder hours / week in sales", value: "20–30" },
      { label: "Growth ceiling", value: "Light-deal volume" },
    ],
  },
  {
    n: 3,
    name: "Drafted",
    where: "Story has been partially written down—adoption is uneven",
    body:
      "A messaging doc exists. A playbook exists. The website has been rewritten in the last 18 months. Pieces of the story have made it onto paper. The team uses some of it, ignores most of it, and reconstructs the rest. This is the most expensive level to be stuck on, because you have paid for the artifact and not for the system. The artifact decays the day it ships. The system would have updated itself.",
    indicators: [
      { label: "Founder close rate", value: "40–60%" },
      { label: "Team selling without you", value: "Mid-tier deals" },
      { label: "Founder hours / week in sales", value: "12–20" },
      { label: "Growth ceiling", value: "Whatever the doc can support" },
    ],
  },
  {
    n: 4,
    name: "Codified",
    where: "Story is a system the team operates from",
    body:
      "The narrative is extracted, codified, and installed across discovery scripts, objection handling, multi-stakeholder framing, marketing collateral, and outbound. The team can carry deals you have not touched. New hires reach productivity in weeks, not quarters. You are still present in the highest-stakes conversations—but by choice, not by necessity. Most companies that reach this level never go back.",
    indicators: [
      { label: "Founder close rate", value: "30–40%" },
      { label: "Team selling without you", value: "Most deals" },
      { label: "Founder hours / week in sales", value: "5–12" },
      { label: "Growth ceiling", value: "Market opportunity" },
    ],
  },
  {
    n: 5,
    name: "Compounding",
    where:
      "System teaches itself—new hires absorb the story without founder intervention",
    body:
      "The Narrative Operating System has become how the company thinks. The team improves the system from real-world deal data. Marketing iterates without re-asking what the company does. Onboarding compresses the founder's seven years of pattern recognition into a thirty-day ramp. This is the level where the valuation discount disappears, because the company's value is no longer locked inside one person. You become the architect of how everyone closes—not the only person who can.",
    indicators: [
      { label: "Founder close rate", value: "Strategic deals only" },
      { label: "Team selling without you", value: "All deals" },
      { label: "Founder hours / week in sales", value: "0–5 by choice" },
      { label: "Growth ceiling", value: "None imposed by you" },
    ],
  },
];

const STATS = [
  {
    num: "70%",
    body: (
      <>
        <strong>of first sales hires fail in year one.</strong> Not because of
        talent—because they were dropped into a vacuum with zero enablement.{" "}
        <em>(SaaStr)</em>
      </>
    ),
  },
  {
    num: "50%",
    body: (
      <>
        <strong>higher close rates for founders</strong> than their best hired
        salespeople. A structural credibility advantage, not a talent gap.{" "}
        <em>(Marvell)</em>
      </>
    ),
  },
  {
    num: "9–12",
    body: (
      <>
        <strong>months average ramp</strong> before a B2B sales hire engages
        effectively. For complex products, add 30–50%.{" "}
        <em>(Brooks Group, 150+ B2B leaders)</em>
      </>
    ),
  },
];

const OPERATOR_QUOTES = [
  {
    text:
      "I told myself for years that the problem was the people I was hiring. After we'd burned through three VPs of Sales, I realized the problem was that I had never written down what I knew. We were a company built on undocumented genius. That isn't a company. That's a magic trick.",
    cite: "—Mike Molinet, Co-founder, Branch",
  },
  {
    text:
      "Every founder I've ever worked with closes at roughly 50% higher rates than their best non-founder sales hire. That's a statement about the founder's structural credibility advantage—and it's a perfect measurement of how much of the sales conversation has never been codified.",
    cite: "—Eyal Worthalter, Marvell",
  },
  {
    text:
      "There is no transition out of sales for a founder. There is only a transition in how you spend your sales time. The founder who tries to transition out is the founder who breaks the company.",
    cite: "—Seth DeHart, Growth Unhinged",
  },
  {
    text:
      "The companies that cross $50M with the founder still in every deal don't cross $100M. They sell. Or they break. The math doesn't allow the third option.",
    cite: "—David Blake, Degreed",
  },
];

const CLIENT_QUOTES = [
  {
    text:
      "What impressed us most was the ability to take our inputs—the bulk of which were quite technically complex—and transform them into a powerful story that really speaks to our customers. The final result was everything we had been trying to say, much better said.",
    cite: "—Co-founder / CEO, Apto Solutions",
  },
  {
    text:
      "You were able to act as an external catalyst to help us reconcile different viewpoints on the brand. You helped us shift our messaging from focusing on rational drivers to emotional drivers of customer behavior.",
    cite: "—CEO, BetterCloud",
  },
  {
    text:
      "The Brand Playbook resonated completely with our team. It's a practical guide—the North Star—that's driving our business forward.",
    cite: "—Client team, Ikan",
  },
  {
    text:
      "There are levels to the message and positioning game. I didn't know there were levels until I worked with you.",
    cite: "—Anonymous client, post-engagement",
  },
];

const RESEARCH = [
  {
    label: "Bain · M&A Research",
    finding:
      "Founder-dependent businesses sell at a 40–60% discount to comparable businesses with independent operating capacity at exit.",
  },
  {
    label: "Gartner / Forrester · 2024",
    finding:
      "Average B2B buying committees have grown from 5 to 11–13 stakeholders. Purchase likelihood drops from 81% to 31% as the committee expands.",
  },
  {
    label: "ProductLed · 446-Company Survey",
    finding:
      "32.1% of companies can't consistently identify their primary bottleneck. Those that can report 41% faster revenue growth.",
  },
  {
    label: "Cascade Insights",
    finding:
      "The single biggest predictor of B2B revenue stagnation between $5M and $20M ARR is founder-dependent sales motion combined with absent narrative infrastructure.",
  },
];

export default function StoryLockTaxV2Page() {
  const [arr, setArr] = useState<number>(10_000_000);
  const [mult, setMult] = useState<number>(6);
  const [closePct, setClosePct] = useState<number>(70);
  const [hours, setHours] = useState<number>(20);
  const [fails, setFails] = useState<number>(2);
  const [aecost, setAecost] = useState<number>(200_000);
  const [rate, setRate] = useState<number>(500);

  const [tab, setTab] = useState<TabKey>("calc");
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [formName, setFormName] = useState<string>("");
  const [formEmail, setFormEmail] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  // Restore unlock state on mount + fire view event.
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        if (window.localStorage.getItem(UNLOCK_STORAGE_KEY) === "1") {
          setUnlocked(true);
        }
        if (typeof window.gtag === "function") {
          window.gtag("event", "storylock_tax_v2_view", {
            event_category: "StoryLock Tax v2",
            event_label: "page_view",
          });
        }
      }
    } catch {
      // localStorage may be unavailable (privacy mode); silently ignore.
    }
  }, []);

  // Math—exact formulas from the HTML source.
  const hireTax = fails * Math.max(150_000, Math.min(aecost, 250_000));
  const calTax = hours * 48 * rate;
  // Compounding drag scales with founder close-rate dominance (baseline 70% = 0.15).
  const compTax = arr * 0.15 * (closePct / 70);
  const valTax = arr * mult * 0.5;
  const total = hireTax + calTax + compTax + valTax;
  const verdict = computeVerdict(closePct, fails, hours);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const name = formName.trim();
      const email = formEmail.trim();
      if (!name || !email) {
        setFormError("Please fill both fields.");
        return;
      }
      if (!isBusinessEmail(email)) {
        setFormError(BUSINESS_EMAIL_REQUIRED_MESSAGE);
        return;
      }
      setSubmitting(true);
      setFormError("");
      try {
        const response = await fetch("/api/storylock-tax-v2-capture", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            source: "storylock-tax-v2",
            submitted_at: new Date().toISOString(),
            submitted_from_tab: tab,

            // New inputs (v2 schema)
            arr,
            mult,
            closePct,
            hours,
            fails,
            aecost,
            rate,

            // Calculated taxes
            hiring_loop_tax: Math.round(hireTax),
            calendar_tax: Math.round(calTax),
            compounding_tax: Math.round(compTax),
            valuation_tax: Math.round(valTax),
            storylock_tax_total: Math.round(total),

            // Severity
            tier: verdict.tier,
            level_match: verdict.levelMatch,
          }),
        });

        if (!response.ok) {
          if (response.status === 400) {
            const data = (await response.json()) as { error?: string };
            setFormError(data.error ?? BUSINESS_EMAIL_REQUIRED_MESSAGE);
            return;
          }
          throw new Error("Request failed");
        }

        try {
          window.localStorage.setItem(UNLOCK_STORAGE_KEY, "1");
          window.localStorage.setItem(UNLOCK_NAME_KEY, name);
          window.localStorage.setItem(UNLOCK_EMAIL_KEY, email);
        } catch {
          // ignore storage errors
        }
        setUnlocked(true);
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "storylock_tax_email_captured", {
            event_category: "StoryLock Tax v2",
            event_label: "email_submitted",
            storylock_tax_total: Math.round(total),
            tier: verdict.tier,
            level_match: verdict.levelMatch,
          });
        }
      } catch {
        setFormError("Couldn't submit. Try once more.");
      } finally {
        setSubmitting(false);
      }
    },
    [
      formName,
      formEmail,
      tab,
      arr,
      mult,
      closePct,
      hours,
      fails,
      aecost,
      rate,
      hireTax,
      calTax,
      compTax,
      valTax,
      total,
      verdict.tier,
      verdict.levelMatch,
    ],
  );

  const handleTabClick = (next: TabKey): void => {
    if (!unlocked && (next === "levels" || next === "proof")) {
      const el = document.getElementById("gateCard");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setTab(next);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const tabStyle = (k: TabKey): CSSProperties => ({
    padding: "14px 22px",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.10em",
    textTransform: "uppercase",
    color: tab === k ? "var(--accent)" : "var(--ink-faint)",
    cursor: "pointer",
    borderBottom:
      tab === k ? "2px solid var(--accent)" : "2px solid transparent",
    transition: "color 0.15s, border-color 0.15s",
    userSelect: "none",
  });

  return (
    <>
      <style jsx global>{`
        :root {
          --bg: #0e0822;
          --surface: #150e30;
          --surface-2: #1b1438;
          --border: #2a1f4d;
          --border-soft: #1f1740;
          --ink: #f4f1ff;
          --ink-dim: #9a92b8;
          --ink-faint: #6b6489;
          --accent: #ff6b35;
          --accent-soft: rgba(255, 107, 53, 0.1);
          --accent-line: rgba(255, 107, 53, 0.35);
          --good: #6db193;
        }
        html,
        body {
          margin: 0;
          padding: 0;
          background: var(--bg);
          color: var(--ink);
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Text",
            "Segoe UI", Helvetica, Arial, sans-serif;
          line-height: 1.55;
          -webkit-font-smoothing: antialiased;
        }
        .slv2-wrap {
          max-width: 1120px;
          margin: 0 auto;
          padding: 56px 32px 96px;
        }
        @media (max-width: 768px) {
          .slv2-wrap {
            padding: 32px 16px 64px;
          }
        }
        .slv2-field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 22px;
        }
        .slv2-field-row.single {
          grid-template-columns: 1fr;
        }
        @media (max-width: 640px) {
          .slv2-field-row {
            grid-template-columns: 1fr;
          }
        }
        .slv2-input-wrap input {
          width: 100%;
          padding: 14px 16px;
          background: var(--surface-2);
          color: var(--ink);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          font-family: inherit;
          font-variant-numeric: tabular-nums;
          transition: border-color 0.15s;
        }
        .slv2-input-wrap.has-prefix input {
          padding-left: 32px;
        }
        .slv2-input-wrap.has-suffix input {
          padding-right: 36px;
        }
        .slv2-input-wrap input:focus {
          outline: none;
          border-color: var(--accent);
        }
        .slv2-input-wrap input::-webkit-outer-spin-button,
        .slv2-input-wrap input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .slv2-input-wrap input[type="number"] {
          -moz-appearance: textfield;
        }
        .slv2-stat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }
        .slv2-research-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 640px) {
          .slv2-stat-grid {
            grid-template-columns: 1fr;
          }
          .slv2-research-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="slv2-wrap">
        {/* Header */}
        <header style={{ marginBottom: 36, textAlign: "center" }}>
          <img
            src="/brandmultiplier-logo.png"
            alt="BrandMultiplier"
            style={{
              height: 44,
              width: "auto",
              display: "block",
              margin: "0 auto 24px",
              borderRadius: 8,
            }}
          />
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 14,
              fontWeight: 600,
            }}
          >
            The StoryLock Tax Calculator
          </div>
          <h1
            style={{
              fontSize: 38,
              lineHeight: 1.18,
              margin: "0 0 18px",
              fontWeight: 700,
              letterSpacing: "-0.015em",
            }}
          >
            The cost of leaving your story locked in your head, measured in
            dollars, hours, and exit multiples.
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "var(--ink-dim)",
              maxWidth: 740,
              margin: "0 auto",
              lineHeight: 1.55,
            }}
          >
            StoryLock is not a marketing problem. It is a structural condition
            with a measurable price. This calculator runs the math on what it
            has already cost you, what it is costing you right now, and what
            it will cost at exit.{" "}
            <strong style={{ color: "var(--ink)" }}>
              The numbers are conservative.
            </strong>{" "}
            Real damage runs higher.
          </p>
        </header>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 0,
            margin: "36px 0 32px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={tabStyle("calc")} onClick={() => handleTabClick("calc")}>
            Calculator
          </div>
          <div
            style={tabStyle("levels")}
            onClick={() => handleTabClick("levels")}
          >
            The 5 Levels{!unlocked ? " 🔒" : ""}
          </div>
          <div
            style={tabStyle("proof")}
            onClick={() => handleTabClick("proof")}
          >
            Proof{!unlocked ? " 🔒" : ""}
          </div>
        </div>

        {/* ====================== CALCULATOR TAB ====================== */}
        {tab === "calc" && (
          <div>
            <section
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: 32,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  fontWeight: 700,
                  marginBottom: 22,
                }}
              >
                Your Numbers
              </div>

              <div className="slv2-field-row">
                <NumberField
                  label="Current ARR"
                  sub="Annual recurring revenue, today"
                  prefix="$"
                  value={arr}
                  onChange={setArr}
                  min={1_000_000}
                  step={500_000}
                />
                <NumberField
                  label="Expected Exit Multiple"
                  sub="Revenue multiple your bankers imply"
                  suffix="x"
                  value={mult}
                  onChange={setMult}
                  min={1}
                  max={15}
                  step={0.5}
                />
              </div>

              <div className="slv2-field-row">
                <NumberField
                  label="Your Close Rate"
                  sub="Complex deals you personally close"
                  suffix="%"
                  value={closePct}
                  onChange={setClosePct}
                  min={0}
                  max={100}
                  step={5}
                />
                <NumberField
                  label="Hours / Week You Spend Selling"
                  sub="Calls, demos, deal saves, founder bailouts"
                  suffix="hrs"
                  value={hours}
                  onChange={setHours}
                  min={0}
                  max={80}
                  step={1}
                />
              </div>

              <div className="slv2-field-row">
                <NumberField
                  label="Failed Sales Hires (24 mo)"
                  sub="Including the one you haven't fired yet"
                  value={fails}
                  onChange={setFails}
                  min={0}
                  max={10}
                  step={1}
                />
                <NumberField
                  label="Fully-Loaded AE Cost"
                  sub="Base + variable + benefits + ramp"
                  prefix="$"
                  value={aecost}
                  onChange={setAecost}
                  min={100_000}
                  step={10_000}
                />
              </div>

              <div className="slv2-field-row single">
                <NumberField
                  label="Your Hourly Value"
                  sub="What an hour of your time is worth on product, strategy, or what only you can do"
                  prefix="$"
                  value={rate}
                  onChange={setRate}
                  min={100}
                  step={50}
                />
              </div>
            </section>

            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "40px 32px 32px",
                textAlign: "center",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--ink-dim)",
                  fontWeight: 700,
                  marginBottom: 14,
                }}
              >
                Your Total StoryLock Tax
              </div>
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 800,
                  color: "var(--accent)",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                  fontVariantNumeric: "tabular-nums",
                  marginBottom: 12,
                }}
              >
                {fmt(total)}
              </div>
              <div style={{ fontSize: 14, color: "var(--ink-dim)" }}>
                Through your next exit window. Conservatively calculated.
              </div>
            </div>

            {/* Breakdown—gated */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  filter: unlocked ? "none" : "blur(6px)",
                  pointerEvents: unlocked ? "auto" : "none",
                  userSelect: unlocked ? "auto" : "none",
                }}
              >
                <BreakdownTable
                  hire={hireTax}
                  cal={calTax}
                  comp={compTax}
                  val={valTax}
                />
              </div>

              {!unlocked && (
                <div
                  id="gateCard"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "calc(100% - 48px)",
                    maxWidth: 380,
                    background: "var(--surface)",
                    border: "1px solid var(--accent-line)",
                    borderRadius: 12,
                    padding: 26,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                    zIndex: 10,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      fontWeight: 700,
                      marginBottom: 10,
                    }}
                  >
                    Unlock Your Report
                  </div>
                  <h3
                    style={{
                      fontSize: 19,
                      margin: "0 0 8px",
                      lineHeight: 1.3,
                      fontWeight: 700,
                    }}
                  >
                    See the full breakdown, your severity level, and the proof
                    stack.
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--ink-dim)",
                      margin: "0 0 18px",
                    }}
                  >
                    We&apos;ll email your detailed report and unlock the next
                    two tabs.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      required
                      style={gateInputStyle}
                    />
                    <input
                      type="email"
                      placeholder="Your work email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      required
                      style={gateInputStyle}
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        width: "100%",
                        padding: 13,
                        background: "var(--accent)",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 600,
                        fontFamily: "inherit",
                        cursor: submitting ? "not-allowed" : "pointer",
                        opacity: submitting ? 0.7 : 1,
                        transition: "background 0.15s",
                      }}
                    >
                      {submitting ? "Sending…" : "Send My Report →"}
                    </button>
                    {formError && (
                      <div
                        style={{
                          color: "var(--accent)",
                          fontSize: 12,
                          marginTop: 8,
                        }}
                      >
                        {formError}
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>

            {/* Verdict */}
            {unlocked && (
              <div
                style={{
                  marginTop: 24,
                  padding: "28px 32px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderLeft: "3px solid var(--accent)",
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    fontWeight: 700,
                    marginBottom: 14,
                  }}
                >
                  Severity Read
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    marginBottom: 12,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {verdict.tier}
                </div>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--ink)",
                    margin: "0 0 12px",
                    lineHeight: 1.6,
                  }}
                >
                  {verdict.body}
                </p>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--ink)",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {verdict.action}
                </p>
              </div>
            )}

            <CTABlock />
          </div>
        )}

        {/* ====================== 5 LEVELS TAB ====================== */}
        {tab === "levels" && (
          <div>
            <div
              style={{
                textAlign: "center",
                maxWidth: 620,
                margin: "0 auto 36px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  fontWeight: 700,
                  marginBottom: 22,
                  textAlign: "center",
                }}
              >
                The StoryLock Maturity Scale
              </div>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--ink-dim)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Every founder-led B2B company sits somewhere on this five-level
                scale. The level is not a judgment of effort. It is a structural
                read of where the company&apos;s story currently lives—and
                what the team can do with it. The score from your calculator
                places you on this scale. The descriptions below tell you what
                comes next.
              </p>
            </div>

            {LEVELS.map((lv) => {
              const current = unlocked && lv.n === verdict.levelMatch;
              return (
                <div
                  key={lv.n}
                  style={{
                    background: "var(--surface)",
                    border: current
                      ? "1px solid var(--accent)"
                      : "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "26px 28px",
                    marginBottom: 14,
                    display: "grid",
                    gridTemplateColumns: "60px 1fr",
                    gap: 24,
                    alignItems: "start",
                    boxShadow: current
                      ? "0 0 0 1px var(--accent-line)"
                      : undefined,
                  }}
                >
                  <div
                    style={{
                      fontSize: 36,
                      fontWeight: 800,
                      color: "var(--accent)",
                      lineHeight: 1,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(lv.n).padStart(2, "0")}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        margin: "0 0 8px",
                        letterSpacing: "-0.005em",
                      }}
                    >
                      {lv.name}
                      {current && (
                        <span
                          style={{
                            display: "inline-block",
                            fontSize: 10,
                            fontWeight: 700,
                            color: "white",
                            background: "var(--accent)",
                            padding: "3px 8px",
                            borderRadius: 4,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            marginLeft: 8,
                            verticalAlign: "middle",
                          }}
                        >
                          You are here
                        </span>
                      )}
                    </h4>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--accent)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        marginBottom: 12,
                      }}
                    >
                      {lv.where}
                    </div>
                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--ink-dim)",
                        margin: "0 0 10px",
                        lineHeight: 1.55,
                      }}
                    >
                      {lv.body}
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "8px 24px",
                        marginTop: 14,
                        paddingTop: 14,
                        borderTop: "1px solid var(--border-soft)",
                      }}
                    >
                      {lv.indicators.map((ind) => (
                        <div
                          key={ind.label}
                          style={{ fontSize: 12, color: "var(--ink-dim)" }}
                        >
                          <strong
                            style={{ color: "var(--ink)", fontWeight: 600 }}
                          >
                            {ind.label}:
                          </strong>{" "}
                          {ind.value}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            <CTABlock />
          </div>
        )}

        {/* ====================== PROOF TAB ====================== */}
        {tab === "proof" && (
          <div>
            {/* Validation stack */}
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  fontWeight: 700,
                  marginBottom: 14,
                  textAlign: "center",
                }}
              >
                The Validation Stack
              </div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  margin: "0 0 18px",
                  letterSpacing: "-0.01em",
                  textAlign: "center",
                }}
              >
                The three numbers behind every claim on this page.
              </h3>
              <div className="slv2-stat-grid">
                {STATS.map((s) => (
                  <div
                    key={s.num}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      padding: "26px 22px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 42,
                        fontWeight: 800,
                        color: "var(--accent)",
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                        marginBottom: 8,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {s.num}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--ink-dim)",
                        lineHeight: 1.5,
                      }}
                    >
                      {s.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Operator quotes */}
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  fontWeight: 700,
                  marginBottom: 14,
                }}
              >
                From Industry Operators
              </div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  margin: "0 0 18px",
                  letterSpacing: "-0.01em",
                }}
              >
                What founders said—on the record.
              </h3>
              {OPERATOR_QUOTES.map((q) => (
                <QuoteCard key={q.cite} text={q.text} cite={q.cite} />
              ))}
            </div>

            {/* Client quotes */}
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  fontWeight: 700,
                  marginBottom: 14,
                }}
              >
                From Our Clients
              </div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  margin: "0 0 18px",
                  letterSpacing: "-0.01em",
                }}
              >
                What it sounds like on the other side of the work.
              </h3>
              {CLIENT_QUOTES.map((q) => (
                <QuoteCard key={q.cite} text={q.text} cite={q.cite} />
              ))}
            </div>

            {/* Research */}
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  fontWeight: 700,
                  marginBottom: 14,
                }}
              >
                The Research Stack
              </div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  margin: "0 0 18px",
                  letterSpacing: "-0.01em",
                }}
              >
                Where the numbers come from.
              </h3>
              <div className="slv2-research-grid">
                {RESEARCH.map((r) => (
                  <div
                    key={r.label}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      padding: "18px 22px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--accent)",
                        fontWeight: 700,
                        letterSpacing: "0.10em",
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      {r.label}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: "var(--ink)",
                        lineHeight: 1.45,
                      }}
                    >
                      {r.finding}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <CTABlock />
          </div>
        )}

        {/* Footnote */}
        <div
          style={{
            marginTop: 56,
            paddingTop: 28,
            borderTop: "1px solid var(--border)",
            fontSize: 12,
            color: "var(--ink-faint)",
            lineHeight: 1.6,
            textAlign: "center",
          }}
        >
          <div style={{ marginBottom: 24, maxWidth: 740, margin: "0 auto 24px" }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--accent)",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              About the math
            </div>
            <p style={{ margin: 0 }}>
              Hiring Loop Tax = failed hires × your AE cost (clamped to the
              $150K–$250K SaaStr range). Calendar Tax = hours/week × 48 working
              weeks × your hourly value. Compounding Tax = a single year of
              forgone growth at 15% applied to current ARR—a conservative proxy
              for the multi-year revenue surface lost while the hiring loop
              runs (ProductLed). Valuation Tax = ARR × revenue multiple × 50%
              mid-point of the Bain founder-dependency discount range. Each
              number is independently sourced and deliberately under-stated.
            </p>
          </div>

          <div style={{ marginBottom: 24, maxWidth: 740, margin: "0 auto 24px" }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--accent)",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              What this calculator does not include
            </div>
            <p style={{ margin: 0 }}>
              Spousal cost. Sleep cost. The school events you&apos;ve already
              missed. Those are real and they are not on this page because they
              are not yours to monetize.
            </p>
          </div>

          <p style={{ margin: "24px 0 0" }}>
            © BrandMultiplier · brandmultiplier.ai
          </p>
        </div>
      </div>
    </>
  );
}

/* ============== Sub-components ============== */

const gateInputStyle: CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  background: "var(--surface-2)",
  color: "var(--ink)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 14,
  fontFamily: "inherit",
  marginBottom: 10,
};

interface NumberFieldProps {
  label: string;
  sub?: string;
  prefix?: string;
  suffix?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

function NumberField({
  label,
  sub,
  prefix,
  suffix,
  value,
  onChange,
  min,
  max,
  step,
}: NumberFieldProps) {
  const [text, setText] = useState<string>(String(value));

  useEffect(() => {
    setText(String(value));
  }, [value]);

  const wrapClass =
    "slv2-input-wrap" +
    (prefix ? " has-prefix" : "") +
    (suffix ? " has-suffix" : "");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "var(--ink)",
          marginBottom: 4,
        }}
      >
        {label}
      </label>
      {sub && (
        <div
          style={{
            fontSize: 12,
            color: "var(--ink-dim)",
            marginBottom: 10,
          }}
        >
          {sub}
        </div>
      )}
      <div
        className={wrapClass}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        {prefix && (
          <span
            style={{
              position: "absolute",
              left: 14,
              color: "var(--accent)",
              fontWeight: 600,
              fontSize: 16,
              pointerEvents: "none",
            }}
          >
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={text}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            setText(e.target.value);
            const parsed = parseFloat(e.target.value);
            if (!Number.isNaN(parsed)) {
              onChange(parsed);
            }
          }}
          onBlur={() => {
            const parsed = parseFloat(text);
            if (Number.isNaN(parsed)) {
              const fallback = min ?? 0;
              onChange(fallback);
              setText(String(fallback));
            } else {
              let next = parsed;
              if (min !== undefined) next = Math.max(min, next);
              if (max !== undefined) next = Math.min(max, next);
              onChange(next);
              setText(String(next));
            }
          }}
        />
        {suffix && (
          <span
            style={{
              position: "absolute",
              right: 14,
              color: "var(--accent)",
              fontWeight: 600,
              fontSize: 16,
              pointerEvents: "none",
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

interface BreakdownTableProps {
  hire: number;
  cal: number;
  comp: number;
  val: number;
}

function BreakdownTable({ hire, cal, comp, val }: BreakdownTableProps) {
  const rows = [
    {
      name: "The Hiring Loop Tax",
      desc: (
        <>
          Cumulative spend on failed sales hires. 70% of first sales hires fail
          in year one; $150K–$250K per failed cycle.{" "}
          <strong style={{ color: "var(--ink-dim)" }}>
            (SaaStr, Brooks Group)
          </strong>
        </>
      ),
      amt: hire,
    },
    {
      name: "The Calendar Tax",
      desc:
        "Annual value of founder time spent doing the team's job. Hours per week × 48 working weeks × your hourly value.",
      amt: cal,
    },
    {
      name: "The Compounding Tax",
      desc: (
        <>
          One year of forgone growth at 15% on current ARR. A conservative proxy
          for the multi-year revenue surface lost while the loop runs.{" "}
          <strong style={{ color: "var(--ink-dim)" }}>(ProductLed)</strong>
        </>
      ),
      amt: comp,
    },
    {
      name: "The Valuation Tax",
      desc: (
        <>
          Founder-dependent businesses sell at a 40–60% discount to comparable
          independent operations at exit. Mid-point applied to current ARR ×
          exit multiple.{" "}
          <strong style={{ color: "var(--ink-dim)" }}>(Bain)</strong>
        </>
      ),
      amt: val,
    },
  ];

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {rows.map((r, i) => (
        <div
          key={r.name}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 18,
            padding: "22px 28px",
            borderBottom:
              i < rows.length - 1 ? "1px solid var(--border-soft)" : "none",
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "var(--ink)",
                marginBottom: 6,
              }}
            >
              {r.name}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "var(--ink-dim)",
                lineHeight: 1.5,
                maxWidth: 460,
              }}
            >
              {r.desc}
            </div>
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "var(--accent)",
              fontVariantNumeric: "tabular-nums",
              whiteSpace: "nowrap",
            }}
          >
            {fmt(r.amt)}
          </div>
        </div>
      ))}
    </div>
  );
}

function QuoteCard({ text, cite }: { text: string; cite: string }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderLeft: "3px solid var(--accent)",
        borderRadius: 12,
        padding: "24px 28px",
        marginBottom: 14,
      }}
    >
      <blockquote
        style={{
          fontSize: 16,
          color: "var(--ink)",
          lineHeight: 1.55,
          margin: "0 0 14px",
        }}
      >
        {text}
      </blockquote>
      <cite
        style={{
          fontSize: 12,
          color: "var(--ink-dim)",
          fontStyle: "normal",
          letterSpacing: "0.04em",
        }}
      >
        {cite}
      </cite>
    </div>
  );
}

function CTABlock() {
  return (
    <div
      style={{
        marginTop: 32,
        textAlign: "center",
        padding: 32,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--accent)",
          fontWeight: 700,
          marginBottom: 12,
        }}
      >
        Next Step
      </div>
      <h3
        style={{
          fontSize: 22,
          fontWeight: 700,
          margin: "0 0 8px",
          letterSpacing: "-0.01em",
        }}
      >
        The Diagnostic
      </h3>
      <p
        style={{
          fontSize: 14,
          color: "var(--ink-dim)",
          margin: "0 0 22px",
        }}
      >
        Thirty minutes or less. Zero pressure. Purely diagnostic.
      </p>
      <a
        href={CTA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "14px 28px",
          background: "var(--accent)",
          color: "white",
          borderRadius: 8,
          fontSize: 15,
          fontWeight: 600,
          fontFamily: "inherit",
          letterSpacing: "0.01em",
          textDecoration: "none",
        }}
      >
        Book The Diagnostic →
      </a>
    </div>
  );
}
