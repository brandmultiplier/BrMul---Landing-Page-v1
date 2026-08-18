import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { isStrictBusinessEmail } from "@/lib/business-email";

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
const WEBHOOK_TIMEOUT_MS = 1500;
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
    consent_text: b.consent_text,
    consent_text_version: "v2-2026-08",
    consent_ts: submittedAtIso,
    consent_ip: req.headers.get("x-forwarded-for")?.split(",")[0] ?? null,
    source: "library_gate",
    submitted_at: submittedAtIso,
    submitted_at_formatted: submittedAtFormatted,
  };

  if (WEBHOOK) {
    // Try to deliver payload reliably, but never block UX beyond a short budget.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);
    try {
      const r = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
        signal: controller.signal,
      });
      if (!r.ok) {
        console.error(
          "library-optin webhook failed",
          r.status,
          await r.text().catch(() => ""),
        );
      }
    } catch (err) {
      console.error("library-optin webhook error", err);
    } finally {
      clearTimeout(timeout);
    }
  }

  // NEVER block the user on a webhook/integration failure — grant access regardless.
  const res = NextResponse.json({ ok: true, redirect: "/resources" });
  res.cookies.set("bm_library", "1", {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
    secure: true,
  });
  return res;
}
