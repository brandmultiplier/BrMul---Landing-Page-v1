import { NextResponse } from "next/server";

// Privacy §7 / TCPA do-not-call: this route is the landing-page write path.
// The setter dial queue MUST read the flag from CRM/n8n after DNC_WEBHOOK_URL
// is configured. Until that env var is set, submissions are acknowledged but
// the permanent queue flag is not written — that CRM wiring is blocked.

const WEBHOOK = process.env.DNC_WEBHOOK_URL;
const WEBHOOK_TIMEOUT_MS = 1500;
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

type OptOutPayload = {
  email?: string;
  source?: string;
};

export async function POST(req: Request) {
  let body: OptOutPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 422 });
  }

  const payload = {
    email,
    source: body.source?.trim() || "api_opt_out",
    ts: new Date().toISOString(),
    do_not_call: true,
  };

  if (WEBHOOK) {
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
        console.error("dnc webhook failed", r.status, await r.text().catch(() => ""));
      }
    } catch (err) {
      console.error("dnc webhook error", err);
    } finally {
      clearTimeout(timeout);
    }
  } else {
    console.warn(
      "dnc webhook skipped: DNC_WEBHOOK_URL is not set. Setter-queue write is blocked until CRM/n8n is wired.",
    );
  }

  return NextResponse.json({ ok: true });
}
