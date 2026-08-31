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

  const payload = {
    lead_id: leadId,
    source: "storylock_tax_tool",
    first_name: lead.first_name ?? null,
    last_name: lead.last_name ?? null,
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
      typeof body.submitted_from_tab === "string" ? body.submitted_from_tab : null,
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
