import { NextResponse } from "next/server";

import {
  BUSINESS_EMAIL_REQUIRED_MESSAGE,
  isStrictBusinessEmail,
} from "@/lib/business-email";

const FINAL_CTA_WEBHOOK_URL =
  "https://brandmultiplier.app.n8n.cloud/webhook/f108ff75-70c3-4845-be05-5fb993711337";

type FinalCtaPayload = {
  work_email?: string;
};

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as FinalCtaPayload;

    if (!(await isStrictBusinessEmail(payload.work_email ?? ""))) {
      return NextResponse.json(
        { ok: false, error: BUSINESS_EMAIL_REQUIRED_MESSAGE },
        { status: 400 },
      );
    }

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
