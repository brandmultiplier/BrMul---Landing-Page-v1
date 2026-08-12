import { NextResponse } from "next/server";

import {
  BUSINESS_EMAIL_REQUIRED_MESSAGE,
  isStrictBusinessEmail,
} from "@/lib/business-email";

const FINAL_CTA_WEBHOOK_URL =
  "https://brandmultiplier.app.n8n.cloud/webhook/f108ff75-70c3-4845-be05-5fb993711337";

type FinalCtaPayload = {
  work_email?: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  approximate_arr?: string;
  phone?: string;
  // Submission record fields (brief §5.3)
  submitted_at?: string;
  source_url?: string;
  resource_requested?: string;
  phone_provided?: boolean;
};

export async function POST(req: Request) {
  try {
    const raw = (await req.json()) as FinalCtaPayload;

    if (!(await isStrictBusinessEmail(raw.work_email ?? ""))) {
      return NextResponse.json(
        { ok: false, error: BUSINESS_EMAIL_REQUIRED_MESSAGE },
        { status: 400 },
      );
    }

    const payload: FinalCtaPayload = {
      ...raw,
      submitted_at: raw.submitted_at ?? new Date().toISOString(),
      source_url: raw.source_url ?? req.headers.get("referer") ?? undefined,
      resource_requested: raw.resource_requested ?? "homepage-cta",
      phone_provided: typeof raw.phone === "string" && raw.phone.trim().length > 0,
    };

    const upstream = await fetch(FINAL_CTA_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { ok: false, error: "Webhook request failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 },
    );
  }
}
