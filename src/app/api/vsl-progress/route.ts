import { NextResponse } from "next/server";
import {
  sanitizeVslWatchDepth,
  vslWatchWebhookFields,
} from "@/lib/vsl-watch-depth";
import { postWebhook } from "@/lib/webhook";

const WEBHOOK = process.env.LIBRARY_OPTIN_WEBHOOK_URL;
const WEBHOOK_TIMEOUT_MS = 8000;

export async function POST(req: Request) {
  const cookie = req.headers.get("cookie") ?? "";
  const match = cookie.match(/(?:^|; )bm_lead_id=([^;]*)/);
  const leadId = match ? decodeURIComponent(match[1].trim()) : "";
  if (!leadId) {
    return NextResponse.json({ ok: false, error: "no_lead" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const watch = sanitizeVslWatchDepth(body);
  if (!watch.played) {
    return NextResponse.json({ ok: true });
  }

  // Best-effort: watch depth must never break playback for the viewer.
  await postWebhook(
    "vsl-progress",
    WEBHOOK,
    {
      lead_id: leadId,
      source: "vsl_progress",
      ...vslWatchWebhookFields(watch),
    },
    "LIBRARY_OPTIN_WEBHOOK_URL",
    WEBHOOK_TIMEOUT_MS,
  );

  return NextResponse.json({ ok: true });
}
