import { NextResponse } from "next/server";
import { postWebhook } from "@/lib/webhook";

const WEBHOOK = process.env.STORYLOCK_TOOL_WEBHOOK_URL;
const WEBHOOK_TIMEOUT_MS = 8000;

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

function readCookie(cookieHeader: string, name: string): string {
  const match = cookieHeader.match(
    new RegExp(`(?:^|; )${name}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1].trim()) : "";
}

type LibraryLead = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string | null;
  company_name?: string | null;
  approximate_arr?: string | null;
};

// Identity was captured once at the library gate. Replay it here so the report
// row lands with a person attached instead of a bare lead_id.
function readLibraryLead(cookieHeader: string): LibraryLead {
  const raw = readCookie(cookieHeader, "bm_lead");
  if (!raw) return {};
  try {
    return JSON.parse(raw) as LibraryLead;
  } catch {
    return {};
  }
}

export async function POST(req: Request) {
  const cookie = req.headers.get("cookie") ?? "";
  const leadId = readCookie(cookie, "bm_lead_id");
  if (!leadId) {
    return NextResponse.json({ ok: false, error: "no_lead" }, { status: 401 });
  }

  const lead = readLibraryLead(cookie);

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const firstName = lead.first_name?.trim() || "";
  const lastName = lead.last_name?.trim() || "";
  const name = [firstName, lastName].filter(Boolean).join(" ") || null;

  const payload = {
    lead_id: leadId,
    source: "storylock_tax_tool",
    name,
    first_name: firstName || null,
    last_name: lastName || null,
    email: lead.email ?? null,
    phone: lead.phone ?? null,
    company_name: lead.company_name ?? null,
    approximate_arr: lead.approximate_arr ?? null,
    approx_arr: lead.approximate_arr ?? null,
    submitted_at:
      typeof body.submitted_at === "string"
        ? body.submitted_at
        : new Date().toISOString(),
    submitted_from_tab:
      typeof body.submitted_from_tab === "string"
        ? body.submitted_from_tab
        : null,
    current_tab_when_submitted:
      typeof body.current_tab_when_submitted === "string"
        ? body.current_tab_when_submitted
        : null,
    viewed_all_tabs: body.viewed_all_tabs === true,
    fields_touched: Array.isArray(body.fields_touched)
      ? body.fields_touched.filter((v) => typeof v === "string")
      : [],
    fields_touched_count: asNumber(body.fields_touched_count) ?? 0,
    visited_tabs: Array.isArray(body.visited_tabs)
      ? body.visited_tabs.filter((v) => typeof v === "string")
      : [],
    arr: asNumber(body.arr),
    mult: asNumber(body.mult),
    closePct: asNumber(body.closePct),
    hours: asNumber(body.hours),
    fails: asNumber(body.fails),
    aecost: asNumber(body.aecost),
    rate: asNumber(body.rate),
    hiring_loop_tax: asNumber(body.hiring_loop_tax),
    calendar_tax: asNumber(body.calendar_tax),
    compounding_tax: asNumber(body.compounding_tax),
    valuation_tax: asNumber(body.valuation_tax),
    storylock_tax_total: asNumber(body.storylock_tax_total),
    operating_tax_ratio: asNumber(body.operating_tax_ratio),
    valuation_discount_pct: asNumber(body.valuation_discount_pct),
    tier: typeof body.tier === "string" ? body.tier : null,
    level_match: asNumber(body.level_match),
    your_close_rate: asNumber(body.your_close_rate),
    hours_per_week_selling: asNumber(body.hours_per_week_selling),
    annual_sales_hire_cost: asNumber(body.annual_sales_hire_cost),
    revenue_leakage: asNumber(body.revenue_leakage),
    payroll_waste: asNumber(body.payroll_waste),
    founder_time_tax: asNumber(body.founder_time_tax),
    revenue_leakage_pct: asNumber(body.revenue_leakage_pct),
    payroll_waste_pct: asNumber(body.payroll_waste_pct),
    founder_time_pct: asNumber(body.founder_time_pct),
    team_close_rate: asNumber(body.team_close_rate),
    average_deal_size: asNumber(body.average_deal_size),
    deals_per_quarter: asNumber(body.deals_per_quarter),
    deals_per_year: asNumber(body.deals_per_year),
    close_rate_gap: asNumber(body.close_rate_gap),
  };

  const result = await postWebhook(
    "storylock-tax-tool",
    WEBHOOK,
    payload,
    "STORYLOCK_TOOL_WEBHOOK_URL",
    WEBHOOK_TIMEOUT_MS,
  );

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "webhook_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
