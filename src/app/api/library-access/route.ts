import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { isStrictBusinessEmail } from "@/lib/business-email";
import {
  CONSENT_CHECKBOX_TEXT,
  CONSENT_TEXT_VERSION,
} from "@/lib/library-consent";
import {
  sanitizeVslWatchDepth,
  vslWatchWebhookFields,
} from "@/lib/vsl-watch-depth";
import { sanitizeLibraryIntent, sanitizeLibraryNext } from "@/lib/library-next";
import { postWebhook } from "@/lib/webhook";

const WEBHOOK = process.env.LIBRARY_OPTIN_WEBHOOK_URL;
const ARR_OPTIONS = new Set([
  "Under $3M",
  "$3M - $10M",
  "$10M - $50M",
  "$50M+",
]);

// Simple in-memory fixed-window limiter: 5 requests / 10 min / IP.
// Resets on cold start — acceptable for this abuse-prevention level since
// no Redis/Upstash is configured in this project.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();
const WEBHOOK_TIMEOUT_MS = 8000;
const WEBHOOK_TIME_ZONE = process.env.LIBRARY_OPTIN_TIMEZONE || "Asia/Kolkata";

function getOrdinal(day: number): string {
  if (day % 100 >= 11 && day % 100 <= 13) return `${day}th`;
  if (day % 10 === 1) return `${day}st`;
  if (day % 10 === 2) return `${day}nd`;
  if (day % 10 === 3) return `${day}rd`;
  return `${day}th`;
}

function formatWebhookSubmissionTime(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: WEBHOOK_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    day: "numeric",
    month: "short",
    year: "numeric",
  }).formatToParts(date);

  const hour = parts.find((p) => p.type === "hour")?.value ?? "12";
  const minute = parts.find((p) => p.type === "minute")?.value ?? "00";
  const dayRaw = parts.find((p) => p.type === "day")?.value ?? "1";
  const month = parts.find((p) => p.type === "month")?.value ?? "Jan";
  const year = parts.find((p) => p.type === "year")?.value ?? "1970";
  const dayPeriod = (
    parts.find((p) => p.type === "dayPeriod")?.value ?? "AM"
  ).toUpperCase();
  const day = getOrdinal(Number(dayRaw));

  return `${hour}.${minute}${dayPeriod} ${day} ${month} ${year}`;
}

function sanitizePageUrl(raw: unknown, fallback: string | null): string | null {
  const candidates = [raw, fallback];
  for (const candidate of candidates) {
    if (typeof candidate !== "string" || !candidate.trim()) continue;
    try {
      const url = new URL(candidate);
      if (url.protocol === "http:" || url.protocol === "https:") {
        return url.href;
      }
    } catch {
      // ignore malformed values and try the next candidate
    }
  }
  return null;
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

type LibraryAccessPayload = {
  first_name?: string;
  last_name?: string;
  work_email?: string;
  phone?: string;
  company_name?: string;
  approximate_arr?: string;
  consent_marketing?: boolean;
  consent_text?: string;
  website_url?: string;
  form_ts?: number | string;
  vsl_watch?: unknown;
  next?: string;
  intent?: string;
  page_url?: string;
};

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let b: LibraryAccessPayload;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot — silent accept, never call the webhook, don't reveal the trap.
  if (b.website_url) {
    console.warn("library-optin honeypot triggered", { ip });
    return NextResponse.json({ ok: true });
  }

  // Bot trap — reject submissions faster than a human can fill the form.
  if (Date.now() - Number(b.form_ts) < 2000) {
    return NextResponse.json({ ok: false, error: "too_fast" }, { status: 400 });
  }

  const errors: Record<string, string> = {};
  if (!b.first_name?.trim()) errors.first_name = "required";
  if (!b.last_name?.trim()) errors.last_name = "required";

  // Real deliverability check — same logic as the StoryLock Tax and Final CTA
  // capture routes. Blocks personal/free-mail domains, disposable domains,
  // and fake mailboxes on otherwise-real domains, instead of only checking
  // email shape.
  if (!(await isStrictBusinessEmail(b.work_email ?? ""))) {
    errors.work_email = "invalid";
  }

  // Phone is OPTIONAL — validate only if present. Never require it.
  const ph = b.phone
    ? parsePhoneNumberFromString(b.phone) ??
      parsePhoneNumberFromString(b.phone, "US")
    : null;
  if (b.phone && !ph?.isValid()) errors.phone = "invalid";

  if (b.consent_marketing !== true) errors.consent_marketing = "required";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const leadId = randomUUID();
  const submittedAt = new Date();
  const submittedAtIso = submittedAt.toISOString();
  const submittedAtFormatted = formatWebhookSubmissionTime(submittedAt);
  const approximateArrRaw =
    typeof b.approximate_arr === "string" ? b.approximate_arr.trim() : "";
  const approximateArr = ARR_OPTIONS.has(approximateArrRaw)
    ? approximateArrRaw
    : null;

  const watch = sanitizeVslWatchDepth(b.vsl_watch);
  const next = sanitizeLibraryNext(b.next);
  const intent = sanitizeLibraryIntent(b.intent);
  const pageUrl = sanitizePageUrl(b.page_url, req.headers.get("referer"));

  const payload = {
    lead_id: leadId,
    first_name: b.first_name!.trim(),
    last_name: b.last_name!.trim(),
    email: b.work_email!.trim().toLowerCase(),
    phone: ph?.number ?? null,
    phone_country: ph?.country ?? null,
    company_name: b.company_name?.trim() || null,
    approximate_arr: approximateArr,
    // Keep both keys for downstream compatibility while webhook mapping is finalized.
    approx_arr: approximateArr,
    consent_marketing: true,
    consent_text: CONSENT_CHECKBOX_TEXT,
    consent_text_version: CONSENT_TEXT_VERSION,
    consent_ts: submittedAtIso,
    consent_ip: req.headers.get("x-forwarded-for")?.split(",")[0] ?? null,
    form_id: "library_gate",
    source: "library_gate",
    intent,
    page_url: pageUrl,
    submitted_at: submittedAtIso,
    submitted_at_formatted: submittedAtFormatted,
    ...vslWatchWebhookFields(watch),
  };

  // Try to deliver payload reliably, but never block UX beyond a short budget.
  await postWebhook(
    "library-optin",
    WEBHOOK,
    payload,
    "LIBRARY_OPTIN_WEBHOOK_URL",
    WEBHOOK_TIMEOUT_MS,
  );

  // NEVER block the user on a webhook/integration failure — grant access regardless.
  const res = NextResponse.json({ ok: true, redirect: next });
  const year = 60 * 60 * 24 * 365;
  const cookieBase = {
    path: "/",
    sameSite: "lax" as const,
    // Secure cookies are dropped over plain http, which silently breaks local
    // testing on the LAN address Next prints alongside localhost.
    secure: process.env.NODE_ENV === "production",
  };
  res.cookies.set("bm_library", "1", { ...cookieBase, maxAge: year });
  res.cookies.set("bm_lead_id", leadId, { ...cookieBase, maxAge: year });
  res.cookies.set("bm_consent", CONSENT_TEXT_VERSION, { ...cookieBase, maxAge: year });

  // Identity for the gated instruments. They must never ask a second time, so
  // the lead travels with the browser and gets replayed into their webhooks.
  // httpOnly: only our own route handlers read it, never client JS.
  res.cookies.set(
    "bm_lead",
    JSON.stringify({
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      phone: payload.phone,
      company_name: payload.company_name,
      approximate_arr: payload.approximate_arr,
    }),
    { ...cookieBase, httpOnly: true, maxAge: year },
  );
  res.cookies.set("bm_welcome", "1", { ...cookieBase, maxAge: 60 * 60 });
  return res;
}
