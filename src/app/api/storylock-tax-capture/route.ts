import { NextResponse } from "next/server";
import {
  BUSINESS_EMAIL_REQUIRED_MESSAGE,
  isStrictBusinessEmail,
} from "@/lib/business-email";
import { postWebhook } from "@/lib/webhook";

const STORYLOCK_WEBHOOK_URL = process.env.STORYLOCK_WEBHOOK_URL;

type StorylockPayload = {
  email?: string;
};

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as StorylockPayload;

    if (!(await isStrictBusinessEmail(payload.email ?? ""))) {
      return NextResponse.json(
        { ok: false, error: BUSINESS_EMAIL_REQUIRED_MESSAGE },
        { status: 400 },
      );
    }

    const result = await postWebhook(
      "storylock-tax",
      STORYLOCK_WEBHOOK_URL,
      payload,
      "STORYLOCK_WEBHOOK_URL",
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
