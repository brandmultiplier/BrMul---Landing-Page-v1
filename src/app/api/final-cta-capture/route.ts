import { NextResponse } from "next/server";

import {
  BUSINESS_EMAIL_REQUIRED_MESSAGE,
  isStrictBusinessEmail,
} from "@/lib/business-email";
import { postWebhook } from "@/lib/webhook";

const FINAL_CTA_WEBHOOK_URL = process.env.FINAL_CTA_WEBHOOK_URL;

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

    const result = await postWebhook(
      "final-cta",
      FINAL_CTA_WEBHOOK_URL,
      payload,
      "FINAL_CTA_WEBHOOK_URL",
    );

    if (!result.ok) {
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
