import { NextResponse } from "next/server";
import {
  BUSINESS_EMAIL_REQUIRED_MESSAGE,
  isStrictBusinessEmail,
} from "@/lib/business-email";

type StorylockV2Payload = {
  email?: string;
};

const STORYLOCK_V2_WEBHOOK_URL =
  "https://brandmultiplier.app.n8n.cloud/webhook/2858fbb7-bcf0-4a7e-88e7-a7367e28d481";

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as StorylockV2Payload;

    if (!(await isStrictBusinessEmail(payload.email ?? ""))) {
      return NextResponse.json(
        { ok: false, error: BUSINESS_EMAIL_REQUIRED_MESSAGE },
        { status: 400 },
      );
    }

    const upstream = await fetch(STORYLOCK_V2_WEBHOOK_URL, {
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
