"use client";

import { useState, useEffect, useRef, CSSProperties } from "react";
import {
  BUSINESS_EMAIL_REQUIRED_MESSAGE,
  isBusinessEmail,
} from "@/lib/business-email";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

/* ─── BRAND TOKENS ─── */
const C = {
  purple: "#4940C6",
  purpleLight: "#EDE8F5",
  purpleMid: "#7c6df0",
  orange: "#F36901",
  orangeGlow: "#ff8534",
  dark: "#0f0e1a",
  darkMid: "#1a1a2e",
  darkCard: "#16152a",
  white: "#ffffff",
  gray50: "#fafafa",
  gray100: "#f3f4f6",
  gray300: "#d1d5db",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray700: "#374151",
  gray900: "#111827",
  cyan: "#29b6f6",
  cyanLight: "#4fc3f7",
  green: "#10b981",
  greenLight: "#34d399",
  red: "#ef4444",
};

const FONT = "'Arial', 'Helvetica Neue', sans-serif";
const FOUNDER_HOURLY = 500;
const WORK_WEEKS = 50;

/* ─── UTILITIES ─── */
const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const fmtShort = (n: number) => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
};

/* ─── ANIMATED NUMBER ─── */
function Anim({ value, dur = 700 }: { value: number; dur?: number }) {
  const [d, setD] = useState(0);
  const ref = useRef<number | null>(null);
  useEffect(() => {
    const s = d;
    const diff = value - s;
    if (Math.abs(diff) < 1) {
      setD(value);
      return;
    }
    const t0 = performance.now();
    const go = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setD(s + diff * (1 - Math.pow(1 - p, 3)));
      if (p < 1) ref.current = requestAnimationFrame(go);
    };
    ref.current = requestAnimationFrame(go);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [value]);
  return <span>{fmt(Math.round(d))}</span>;
}

/* ─── INPUT FIELD ─── */
interface FieldProps {
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

function Field({ label, sub, prefix, suffix, value, onChange, min, max, step = 1 }: FieldProps) {
  const [inputValue, setInputValue] = useState<string>(String(value));

  const clampValue = (rawValue: number): number => {
    let nextValue = rawValue;
    if (min !== undefined) nextValue = Math.max(min, nextValue);
    if (max !== undefined) nextValue = Math.min(max, nextValue);
    return nextValue;
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 3, fontFamily: FONT, opacity: 0.9 }}>
        {label}
      </label>
      {sub && (
        <span style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 7, lineHeight: 1.4, fontFamily: FONT }}>
          {sub}
        </span>
      )}
      <div
        style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "0 12px", height: 44, transition: "border-color 0.2s" }}
        onFocus={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = C.purple)}
        onBlur={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.12)")}
      >
        {prefix && (
          <span style={{ color: C.orange, fontWeight: 700, fontSize: 15, marginRight: 6, fontFamily: FONT }}>
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={inputValue}
          onBlur={() => {
            const raw = inputValue.trim();

            if (raw === "") {
              const fallback = clampValue(min ?? 0);
              onChange(fallback);
              setInputValue(String(fallback));
              return;
            }

            const parsed = parseFloat(raw);
            if (Number.isNaN(parsed)) {
              const fallback = clampValue(value);
              onChange(fallback);
              setInputValue(String(fallback));
              return;
            }

            const nextValue = clampValue(parsed);
            onChange(nextValue);
            setInputValue(String(nextValue));
          }}
          onChange={(e) => {
            const raw = e.target.value;
            setInputValue(raw);

            if (raw.trim() === "") {
              return;
            }

            const parsed = parseFloat(raw);
            if (Number.isNaN(parsed)) {
              return;
            }

            const nextValue = clampValue(parsed);
            onChange(nextValue);
            setInputValue(String(nextValue));
          }}
          min={min}
          max={max}
          step={step}
          style={{ flex: 1, border: "none", background: "transparent", fontSize: 15, fontWeight: 600, color: C.white, outline: "none", fontFamily: FONT, width: "100%" }}
        />
        {suffix && (
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 600, marginLeft: 6, fontFamily: FONT }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── BAR ─── */
interface BarProps {
  label: string;
  value: number;
  total: number;
  color: string;
  detail?: string;
}

function Bar({ label, value, total, color, detail }: BarProps) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.75)", fontFamily: FONT }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color, fontFamily: FONT }}>{fmt(value)}</span>
      </div>
      <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}88)`, borderRadius: 3, transition: "width 0.6s cubic-bezier(0.22,1,0.36,1)" }} />
      </div>
      {detail && (
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 3, fontFamily: FONT }}>{detail}</div>
      )}
    </div>
  );
}

/* ─── CASE STUDIES ─── */
const CASES = [
  { co: "Accenture Interactive", industry: "Enterprise / Consulting", result: "$1B+ attributed revenue", sub: "Win rate 54% → 88% · #1 ranked digital agency globally", fromLevel: 1, toLevel: 4, color: C.orange },
  { co: "BetterCloud", industry: "B2B SaaS / IT Management", result: "25% market share regained", sub: "Gartner Visionary → Gartner Leader", fromLevel: 1, toLevel: 3, color: C.purple },
  { co: "Apto Solutions", industry: "B2B Technology", result: "+41% revenue YoY", sub: "Founder narrative extracted and deployed org-wide", fromLevel: 1, toLevel: 3, color: C.green },
  { co: "Ledger", industry: "Crypto / Web3", result: "+20% YoY sales during crypto winter", sub: "20+ stakeholders aligned · 2 new sub-brands built", fromLevel: 1, toLevel: 3, color: C.cyan },
  { co: "Remark Growth Marketing", industry: "Agency / B2B", result: "+64% YoY revenue", sub: "+87% page views · +44% lead conversions", fromLevel: 1, toLevel: 3, color: C.purpleMid },
  { co: "Tria Beauty", industry: "eCommerce / DTC", result: "+63% YoY website revenue", sub: "Mechanism → transformation repositioning", fromLevel: 1, toLevel: 3, color: C.orangeGlow },
  { co: "EdTech SMB", industry: "EdTech / Education", result: "+78% product sales", sub: "+91% email signups · Founder extraction to AI content", fromLevel: 1, toLevel: 3, color: C.greenLight },
  { co: "FinTech Platform", industry: "FinTech / B2B SaaS", result: "+18% trial-to-paid conversion", sub: "Category identity crisis resolved", fromLevel: 1, toLevel: 3, color: C.cyanLight },
];

/* ─── LEVEL DATA ─── */
const LEVELS = [
  {
    n: 1, label: "Founder-Locked", tag: "WHERE MOST START",
    costRange: "$360K–$960K/yr opportunity cost", revCeiling: "Capped at $7–12M ARR",
    founderHrs: "60–80 hrs/mo", teamEff: "N/A — founder does it all",
    desc: "The founder IS the narrative engine. Every complex deal requires their presence. Growth is capped at their calendar capacity.",
    color: C.red, bgAlpha: "rgba(239,68,68,0.12)", trap: false,
  },
  {
    n: 2, label: "Agency-Outsourced", tag: "THE TRAP",
    costRange: "$15K–$50K + founder time still required", revCeiling: "Often LOWER than L1",
    founderHrs: "Still 40–60 hrs/mo", teamEff: "Worse — using materials that don't convert",
    desc: "Agencies capture information but miss conviction. You spend more AND earn less. This is why you've been burned before.",
    color: C.gray400, bgAlpha: "rgba(156,163,175,0.12)", trap: true,
  },
  {
    n: 3, label: "NOS-Enabled", tag: "THE STRUCTURAL FIX",
    costRange: "$7.5K–$25K/mo (amortizing)", revCeiling: "Team-capacity-dependent",
    founderHrs: "<15 hrs/mo", teamEff: "Close rate gap <15% vs. founder",
    desc: "Founder narrative extracted, codified into architecture, installed with Voice Fidelity Gates. The team sells at founder-level conviction.",
    color: C.green, bgAlpha: "rgba(16,185,129,0.12)", trap: false,
  },
  {
    n: 4, label: "NOS + AI Amplification", tag: "SCALE WITHOUT HEADCOUNT",
    costRange: "Fraction of L3 per asset", revCeiling: "GTM-capacity-dependent",
    founderHrs: "<5 hrs/mo", teamEff: "AI-amplified at founder quality",
    desc: "Voice-calibrated AI agents produce founder-quality output across channels simultaneously. The NOS becomes the training data that makes AI work.",
    color: C.purple, bgAlpha: "rgba(73,64,198,0.12)", trap: false,
  },
  {
    n: 5, label: "Self-Compounding", tag: "THE ENDGAME",
    costRange: "Maintenance only", revCeiling: "Market-dependent — no resource ceiling",
    founderHrs: "Strategic inflection points only", teamEff: "System-driven",
    desc: "The NOS runs its own measurement, optimization, and expansion cycles. Enterprise value premium replaces the 40–60% founder-dependency discount.",
    color: C.orange, bgAlpha: "rgba(243,105,1,0.12)", trap: false,
  },
];

/* ─── MAIN COMPONENT ─── */
export default function NarrativeLeverageModel() {
  const [view, setView] = useState<"calc" | "model" | "proof">("calc");
  const [yourRate, setYourRate] = useState(45);
  const [teamRate, setTeamRate] = useState(18);
  const [dealSize, setDealSize] = useState(75000);
  const [dealsQ, setDealsQ] = useState(12);
  const [hireCost, setHireCost] = useState(120000);
  const [hrsWeek, setHrsWeek] = useState(15);
  const [showResult, setShowResult] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [captureEmail, setCaptureEmail] = useState("");
  const [captureName, setCaptureName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [visitedTabs, setVisitedTabs] = useState<Set<"calc" | "model" | "proof">>(
    new Set(["calc"]),
  );
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);

  const rateGap = Math.max(0, (yourRate - teamRate) / 100);
  const revLeak = rateGap * dealsQ * 4 * dealSize;
  const payrollWaste = yourRate > 0 ? Math.max(0, hireCost * (1 - teamRate / yourRate)) : 0;
  const founderTime = hrsWeek * WORK_WEEKS * FOUNDER_HOURLY;
  const total = revLeak + payrollWaste + founderTime;

  useEffect(() => {
    if (total > 0) setShowResult(true);
  }, [total]);

  const fireGtagEvent = (
    eventName: string,
    params: Record<string, string | number>,
  ) => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }
  };

  const handleEmailSubmit = async () => {
    if (!captureEmail || !captureName) return;
    if (!isBusinessEmail(captureEmail)) {
      setSubmitError(BUSINESS_EMAIL_REQUIRED_MESSAGE);
      return;
    }
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/storylock-tax-capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // User details
          name: captureName,
          email: captureEmail,

          // Meta
          source: "storylock-tax-calculator",
          submitted_from_tab: view,
          submitted_at: new Date().toISOString(),

          // Calculator inputs (Tab 1)
          your_close_rate: yourRate,
          team_close_rate: teamRate,
          close_rate_gap: yourRate - teamRate,
          average_deal_size: dealSize,
          deals_per_quarter: dealsQ,
          deals_per_year: dealsQ * 4,
          annual_sales_hire_cost: hireCost,
          hours_per_week_selling: hrsWeek,

          // Calculated results (Tab 1)
          storylock_tax_total: Math.round(total),
          revenue_leakage: Math.round(revLeak),
          payroll_waste: Math.round(payrollWaste),
          founder_time_tax: Math.round(founderTime),

          // Derived insights
          revenue_leakage_pct: total > 0 ? Math.round((revLeak / total) * 100) : 0,
          payroll_waste_pct: total > 0 ? Math.round((payrollWaste / total) * 100) : 0,
          founder_time_pct: total > 0 ? Math.round((founderTime / total) * 100) : 0,

          // Behavioral data
          fields_touched: Array.from(visitedTabs),
          fields_touched_count: visitedTabs.size,
          viewed_all_tabs: visitedTabs.size === 3,
          current_tab_when_submitted: view,
        }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const data = (await response.json()) as { error?: string };
          setSubmitError(data.error ?? BUSINESS_EMAIL_REQUIRED_MESSAGE);
          return;
        }
        throw new Error("Request failed");
      }

      setEmailSubmitted(true);
      fireGtagEvent("storylock_tax_email_captured", {
        event_category: "StoryLock Tax",
        storylock_tax_total: Math.round(total),
        event_label: "email_submitted",
      });
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const setViewWithTracking = (tab: "calc" | "model" | "proof") => {
    setView(tab);
    setVisitedTabs((prev) => new Set(prev).add(tab));
  };

  const handleCalculatorFieldChange = (
    setter: (value: number) => void,
    value: number,
  ) => {
    setter(value);
  };

  const tabsLocked = !emailSubmitted;
  const detailsLocked = showResult && !emailSubmitted;

  const navStyle = (v: string): CSSProperties => ({
    padding: "10px 0",
    fontSize: 12,
    fontWeight: 700,
    fontFamily: FONT,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: view === v ? C.orange : "rgba(255,255,255,0.35)",
    background: "none",
    border: "none",
    borderBottom: view === v ? `2px solid ${C.orange}` : "2px solid transparent",
    cursor: "pointer",
    transition: "all 0.2s",
    flex: 1,
    textAlign: "center",
  });

  return (
    <>
      <style>{`
        .sl-wrap { max-width: 480px; margin: 0 auto; }
        @media (min-width: 768px) { .sl-wrap { max-width: 720px; } }
        @media (min-width: 1200px) { .sl-wrap { max-width: 960px; } }
      `}</style>
      <div
        style={{
          minHeight: "100vh",
          background: C.dark,
          fontFamily: FONT,
          color: C.white,
          paddingBottom: 48,
        }}
      >
      {/* ─── HEADER ─── */}
      <div style={{ padding: "32px 20px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 240, height: 240, borderRadius: "50%", background: `radial-gradient(circle, ${C.orange}15, transparent 70%)` }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}20, transparent 70%)` }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <img
            src="/brandmultiplier-logo.png"
            alt="BrandMultiplier"
            style={{ height: 44, width: "auto", display: "block", margin: "0 auto 14px", borderRadius: 8 }}
          />
          <h1 style={{ fontSize: 26, fontWeight: 800, color: C.white, margin: "0 0 6px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            What StoryLock is Costing Your Business<br />
            this Year
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 auto 20px", maxWidth: 360, lineHeight: 1.5 }}>
            Two axes: what it costs you and what it caps your revenue at.
          </p>
        </div>
      </div>

      {/* ─── NAV ─── */}
      <div className="sl-wrap" style={{ display: "flex", padding: "0 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <button type="button" onClick={() => setViewWithTracking("calc")} style={navStyle("calc")}>Calculator</button>
        <button
          type="button"
          onClick={() => {
            if (!tabsLocked) setViewWithTracking("model");
          }}
          style={{
            ...navStyle("model"),
            opacity: tabsLocked ? 0.6 : 1,
            cursor: tabsLocked ? "not-allowed" : "pointer",
          }}
        >
          The 5 Levels {tabsLocked ? "🔒" : ""}
        </button>
        <button
          type="button"
          onClick={() => {
            if (!tabsLocked) setViewWithTracking("proof");
          }}
          style={{
            ...navStyle("proof"),
            opacity: tabsLocked ? 0.6 : 1,
            cursor: tabsLocked ? "not-allowed" : "pointer",
          }}
        >
          Proof {tabsLocked ? "🔒" : ""}
        </button>
      </div>

      {/* ─── CONTENT ─── */}
      <div className="sl-wrap" style={{ padding: "20px 20px 72px" }}>

        {/* ═══ CALCULATOR TAB ═══ */}
        {view === "calc" && (
          <div>
            <div style={{ background: C.darkCard, borderRadius: 14, padding: "24px 20px", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.purple, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 18 }}>YOUR NUMBERS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
                <Field
                  label="Your Close Rate"
                  sub="Deals you personally close"
                  value={yourRate}
                  onChange={(v) => handleCalculatorFieldChange(setYourRate, v)}
                  suffix="%"
                  min={0}
                  max={100}
                />
                <Field
                  label="Team Close Rate"
                  sub="Without your involvement"
                  value={teamRate}
                  onChange={(v) => handleCalculatorFieldChange(setTeamRate, v)}
                  suffix="%"
                  min={0}
                  max={100}
                />
              </div>
              <Field
                label="Average Deal Size"
                prefix="$"
                value={dealSize}
                onChange={(v) => handleCalculatorFieldChange(setDealSize, v)}
                min={0}
                step={1000}
              />
              <Field
                label="Deals Per Quarter Requiring You"
                sub="Deals where you&apos;re in the room to close"
                value={dealsQ}
                onChange={(v) => handleCalculatorFieldChange(setDealsQ, v)}
                min={0}
              />
              <Field
                label="Annual Sales Hire Cost"
                sub="Base + commission for your best rep"
                prefix="$"
                value={hireCost}
                onChange={(v) => handleCalculatorFieldChange(setHireCost, v)}
                min={0}
                step={5000}
              />
              <Field
                label="Hours / Week You Spend Selling"
                sub="Calls, demos, proposals, follow-ups"
                value={hrsWeek}
                onChange={(v) => handleCalculatorFieldChange(setHrsWeek, v)}
                suffix="hrs"
                min={0}
                max={80}
              />
            </div>

            {showResult && (
              <div style={{ background: `linear-gradient(135deg, ${C.darkMid}, ${C.darkCard})`, borderRadius: 14, padding: "28px 20px", textAlign: "center", border: `1px solid ${C.orange}20`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle, ${C.orange}10, transparent 70%)` }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>YOUR ANNUAL STORYLOCK TAX</div>
                  <div style={{ fontSize: 40, fontWeight: 800, color: C.orange, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 4 }}>
                    <Anim value={total} />
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>per year in lost revenue, wasted payroll & founder time</div>
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        filter: detailsLocked ? "blur(6px)" : "none",
                        opacity: detailsLocked ? 0.55 : 1,
                        pointerEvents: detailsLocked ? "none" : "auto",
                        userSelect: detailsLocked ? "none" : "auto",
                        transition: "filter 0.25s ease, opacity 0.25s ease",
                      }}
                    >
                      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "16px 16px 4px", textAlign: "left" }}>
                        <Bar label="Revenue Leakage" value={revLeak} total={total} color={C.orange} detail={`${yourRate - teamRate}pt gap × ${dealsQ * 4} annual deals × ${fmtShort(dealSize)}`} />
                        <Bar label="Underperforming Payroll" value={payrollWaste} total={total} color={C.purpleMid} detail={`${fmtShort(hireCost)} hire closing at ${teamRate}% vs. your ${yourRate}%`} />
                        <Bar label="Founder Time Tax" value={founderTime} total={total} color={C.cyan} detail={`${hrsWeek}hrs/wk × 50 weeks × $500 implied rate`} />
                      </div>
                      <div style={{ marginTop: 20, padding: "14px 16px", background: `${C.purple}12`, borderRadius: 10, border: `1px solid ${C.purple}25` }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: C.purple, marginBottom: 4 }}>THIS IS LEVEL 1: FOUNDER-LOCKED</div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
                          Your story is trapped in your head. Every number above is a symptom of missing narrative infrastructure — not a marketing problem.
                        </div>
                        <button
                          onClick={() => {
                            if (!tabsLocked) {
                              setViewWithTracking("model");
                            }
                          }}
                          style={{
                            marginTop: 10,
                            background: C.purple,
                            color: C.white,
                            border: "none",
                            borderRadius: 8,
                            padding: "10px 20px",
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: tabsLocked ? "not-allowed" : "pointer",
                            opacity: tabsLocked ? 0.55 : 1,
                            fontFamily: FONT,
                            letterSpacing: "0.02em",
                            transition: "opacity 0.2s",
                          }}
                          onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.opacity = tabsLocked ? "0.55" : "0.85")}
                          onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.opacity = tabsLocked ? "0.55" : "1")}
                          type="button"
                        >
                          See the 5 Levels {tabsLocked ? "🔒" : "→"}
                        </button>
                      </div>
                    </div>

                    {detailsLocked && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 12,
                          background: "rgba(10,10,10,0.34)",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            maxWidth: 360,
                            background: "linear-gradient(135deg, #16152a, #1a1a2e)",
                            border: "1px solid rgba(243,105,1,0.25)",
                            borderRadius: 12,
                            padding: "16px 14px",
                            textAlign: "left",
                          }}
                        >
                          <div style={{ fontSize: 10, fontWeight: 700, color: C.orange, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                            UNLOCK FULL BREAKDOWN
                          </div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: C.white, lineHeight: 1.4, marginBottom: 4 }}>
                            Fill out this form to see the full breakdown.
                          </div>
                          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginBottom: 10 }}>
                            We&apos;ll send your detailed report to your inbox.
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                            <input
                              type="text"
                              placeholder="Your name"
                              value={captureName}
                              onChange={(e) => setCaptureName(e.target.value)}
                              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "8px 10px", fontSize: 13, color: "#ffffff", fontFamily: FONT, outline: "none", width: "100%" }}
                            />
                            <input
                              type="email"
                              placeholder="Your work email"
                              value={captureEmail}
                              onChange={(e) => setCaptureEmail(e.target.value)}
                              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "8px 10px", fontSize: 13, color: "#ffffff", fontFamily: FONT, outline: "none", width: "100%" }}
                            />
                          </div>

                          <button
                            onClick={handleEmailSubmit}
                            disabled={isSubmitting || !captureEmail || !captureName}
                            style={{ width: "100%", background: isSubmitting ? "rgba(243,105,1,0.5)" : "#F36901", color: "#ffffff", border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 12, fontWeight: 700, cursor: isSubmitting ? "not-allowed" : "pointer", fontFamily: FONT, letterSpacing: "0.02em", transition: "opacity 0.2s" }}
                            type="button"
                          >
                            {isSubmitting ? "Sending..." : "Send My Report →"}
                          </button>

                          {submitError && (
                            <div style={{ fontSize: 12, color: "#ef4444", textAlign: "center", marginTop: 8 }}>
                              {submitError}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div
              style={{
                textAlign: "center",
                marginTop: 14,
                fontSize: 10,
                color: "rgba(255,255,255,0.25)",
                lineHeight: 1.5,
                filter: detailsLocked ? "blur(4px)" : "none",
                opacity: detailsLocked ? 0.6 : 1,
                transition: "filter 0.25s ease, opacity 0.25s ease",
              }}
            >
              Uses $500/hr implied founder rate based on median for B2B founders at $3M–$50M ARR.
              <br />Revenue leakage = close rate gap × annual deal volume × deal size.
            </div>
          </div>
        )}

        {/* ═══ MODEL TAB ═══ */}
        {view === "model" && (
          <div>
            <div style={{ background: `${C.red}10`, border: `1px solid ${C.red}30`, borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.red, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>THE L2 TRAP</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                Most founders try to solve Level 1 by hiring an agency (Level 2). The result: you spend more AND your revenue quality drops. Agencies capture information but miss conviction. That&apos;s not a vendor problem — it&apos;s an architecture problem. Level 3 solves it through extraction, not guessing.
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
              <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.orange, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2 }}>COST AXIS</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>What narrative work costs you</div>
              </div>
              <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.green, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2 }}>REVENUE AXIS</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>What it caps your revenue at</div>
              </div>
            </div>

            {LEVELS.map((lv) => {
              const isOpen = expandedLevel === lv.n;
              return (
                <div
                  key={lv.n}
                  onClick={() => setExpandedLevel(isOpen ? null : lv.n)}
                  style={{ background: C.darkCard, borderRadius: 12, padding: "16px", marginBottom: 10, border: `1px solid ${isOpen ? lv.color + "50" : "rgba(255,255,255,0.06)"}`, cursor: "pointer", transition: "border-color 0.2s, transform 0.15s", position: "relative", overflow: "hidden" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.transform = "translateY(0)")}
                >
                  {lv.trap && (
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `repeating-linear-gradient(90deg, ${C.red}, ${C.red} 8px, transparent 8px, transparent 16px)` }} />
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: lv.bgAlpha, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: lv.color, fontFamily: FONT }}>L{lv.n}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.white, fontFamily: FONT }}>{lv.label}</div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: lv.color, letterSpacing: "0.04em", textTransform: "uppercase", marginTop: 1 }}>{lv.tag}</div>
                    </div>
                    <div style={{ fontSize: 18, color: "rgba(255,255,255,0.3)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▾</div>
                  </div>

                  {!isOpen && (
                    <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                      <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "6px 8px" }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: C.orange, letterSpacing: "0.05em", textTransform: "uppercase" }}>COST</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2, lineHeight: 1.3 }}>{lv.costRange}</div>
                      </div>
                      <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "6px 8px" }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: C.green, letterSpacing: "0.05em", textTransform: "uppercase" }}>CEILING</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2, lineHeight: 1.3 }}>{lv.revCeiling}</div>
                      </div>
                    </div>
                  )}

                  {isOpen && (
                    <div style={{ marginTop: 14 }}>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: 14 }}>{lv.desc}</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "10px 12px" }}>
                          <div style={{ fontSize: 9, fontWeight: 700, color: C.orange, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>NARRATIVE COST</div>
                          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{lv.costRange}</div>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "10px 12px" }}>
                          <div style={{ fontSize: 9, fontWeight: 700, color: C.green, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>REVENUE CEILING</div>
                          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{lv.revCeiling}</div>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "10px 12px" }}>
                          <div style={{ fontSize: 9, fontWeight: 700, color: C.cyan, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>FOUNDER TIME</div>
                          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{lv.founderHrs}</div>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "10px 12px" }}>
                          <div style={{ fontSize: 9, fontWeight: 700, color: C.purpleMid, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>TEAM EFFECTIVENESS</div>
                          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{lv.teamEff}</div>
                        </div>
                      </div>

                      {lv.n === 2 && (
                        <div style={{ marginTop: 12, padding: "10px 12px", background: `${C.red}10`, borderRadius: 8, border: `1px solid ${C.red}20` }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: C.red, marginBottom: 3 }}>Why L2 fails structurally</div>
                          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
                            Agencies don&apos;t extract — they guess. They interview you for 1–2 hours, interpret through their frameworks, and produce output that captures 20–30% of what makes you effective. Your conviction, your stories, your timing — none of it transfers.
                          </div>
                        </div>
                      )}

                      {lv.n === 3 && (
                        <div style={{ marginTop: 12, padding: "10px 12px", background: `${C.green}10`, borderRadius: 8, border: `1px solid ${C.green}20` }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: C.green, marginBottom: 3 }}>The structural difference</div>
                          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
                            The Rumble extracts your tacit knowledge in 3 structured hours. Storyline codifies it using neuroscience-backed architecture (38 peer-reviewed studies). Voice Fidelity Gates ensure &quot;sounds like me&quot; at every checkpoint. Your team doesn&apos;t learn someone else&apos;s framework — they learn yours.
                          </div>
                        </div>
                      )}

                      {lv.n === 4 && (
                        <div style={{ marginTop: 12, padding: "10px 12px", background: `${C.purple}10`, borderRadius: 8, border: `1px solid ${C.purple}20` }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: C.purple, marginBottom: 3 }}>Why L4 requires L3</div>
                          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
                            AI without extraction amplifies noise. AI with extraction amplifies conviction. The NOS IS the training data. Every failed AI content initiative in the market skipped L3. We build custom NOS implementations that make AI production founder-quality by design.
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{ marginTop: 16, background: C.darkCard, borderRadius: 12, padding: "16px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>L1 → L3 LIBERATION METRICS (PORTFOLIO AVERAGES)</div>
              {[
                { label: "Founder deal involvement", from: "80%+", to: "<30%", color: C.orange },
                { label: "Team-vs-founder close rate gap", from: ">40%", to: "<15%", color: C.green },
                { label: "Narrative-fluent team members", from: "1 (founder)", to: "5+", color: C.purple },
                { label: "New hire ramp time", from: "6+ months", to: "<30 days", color: C.cyan },
                { label: "Content first-pass approval", from: "Multiple revisions", to: ">70%", color: C.purpleMid },
              ].map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: i < 4 ? 10 : 0, gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: FONT }}>{m.label}</div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)", fontFamily: FONT, textAlign: "right", minWidth: 70 }}>{m.from}</div>
                  <div style={{ fontSize: 12, color: m.color, fontWeight: 700 }}>→</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: m.color, fontFamily: FONT, textAlign: "left", minWidth: 60 }}>{m.to}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, textAlign: "center" }}>
              <button
                onClick={() => {
                  if (!tabsLocked) {
                    setViewWithTracking("proof");
                  }
                }}
                style={{ background: C.orange, color: C.white, border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 13, fontWeight: 700, cursor: tabsLocked ? "not-allowed" : "pointer", opacity: tabsLocked ? 0.55 : 1, fontFamily: FONT, letterSpacing: "0.02em", boxShadow: `0 4px 16px ${C.orange}30`, transition: "opacity 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.opacity = tabsLocked ? "0.55" : "0.85")}
                onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.opacity = tabsLocked ? "0.55" : "1")}
                type="button"
              >
                See the Evidence {tabsLocked ? "🔒" : "→"}
              </button>
            </div>
          </div>
        )}

        {/* ═══ PROOF TAB ═══ */}
        {view === "proof" && (
          <div>
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                Every result below came from the same methodology: Rumble extraction → Storyline codification → NOS deployment. Different industries, different stages, same structural fix.
              </div>
            </div>

            <div style={{ background: `linear-gradient(135deg, ${C.darkCard}, ${C.darkMid})`, borderRadius: 14, padding: "20px 16px", marginBottom: 16, border: `1px solid ${C.orange}20`, textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>AGGREGATE ACROSS 120+ ENGAGEMENTS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {[
                  { n: "$78M+", l: "Client revenue generated" },
                  { n: "30%+", l: "Avg CAC reduction" },
                  { n: "35%+", l: "Faster deal cycles" },
                ].map((s, i) => (
                  <div key={i} style={{ padding: "8px 4px" }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: C.orange, fontFamily: FONT }}>{s.n}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 2, lineHeight: 1.3 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 8, fontSize: 10, color: "rgba(255,255,255,0.3)" }}>75%+ pilot-to-retainer conversion · Methodology backed by 38 peer-reviewed studies</div>
            </div>

            {CASES.map((c, i) => (
              <div key={i} style={{ background: C.darkCard, borderRadius: 12, padding: "14px 16px", marginBottom: 8, border: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: c.color }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 3 }}>{c.industry}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.white, fontFamily: FONT }}>{c.co}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: c.color, marginTop: 4 }}>{c.result}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 2, lineHeight: 1.4 }}>{c.sub}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "4px 8px", flexShrink: 0, marginTop: 2 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", fontFamily: FONT }}>L{c.fromLevel}</span>
                    <span style={{ fontSize: 10, color: c.color }}>→</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: c.color, fontFamily: FONT }}>L{c.toLevel}</span>
                  </div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 14, padding: "12px 14px", background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>METHODOLOGY PEDIGREE</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                The Rumble extraction process was forged across 20+ enterprise pitches at Accenture Interactive — driving $1B+ in attributed revenue, a win rate transformation from 54% to 88%, and #1 global ranking. That same methodology is now systematized into every NOS engagement.
              </div>
            </div>

            <div style={{ marginTop: 20, textAlign: "center", background: `linear-gradient(135deg, ${C.darkMid}, ${C.darkCard})`, borderRadius: 14, padding: "24px 16px", border: `1px solid ${C.orange}20` }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: 14 }}>
                This isn&apos;t a marketing problem.<br />
                It&apos;s a structural one. Your story is locked in your head.<br />
                <span style={{ color: C.orange, fontWeight: 600 }}>The Rumble is 3 hours. The results are permanent.</span>
              </div>
              <a
                href="https://calendly.com/book-crc/storyline/?utm_source=linkedin&utm_medium=social&utm_campaign=personal_profile_chris&utm_content=profile_cta&month=2026-04"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block", background: C.orange, color: C.white, fontWeight: 700, fontSize: 13, padding: "12px 24px", borderRadius: 8, textDecoration: "none", letterSpacing: "0.02em", boxShadow: `0 4px 16px ${C.orange}30`, fontFamily: FONT, transition: "transform 0.15s" }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.transform = "translateY(-1px)")}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.transform = "translateY(0)")}
              >
                Book a Free Diagnostic →
              </a>
            </div>
          </div>
        )}
      </div>
      </div>

    </>
  );
}
