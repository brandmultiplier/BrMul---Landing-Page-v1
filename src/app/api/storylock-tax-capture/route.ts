import { NextResponse } from "next/server";
import {
  BUSINESS_EMAIL_REQUIRED_MESSAGE,
  isStrictBusinessEmail,
} from "@/lib/business-email";

const STORYLOCK_WEBHOOK_URL =
  "https://n8n-wkfg.srv1405974.hstgr.cloud/webhook/abc55240-f07d-440e-a7ad-f6a78a786254";

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

    const upstream = await fetch(STORYLOCK_WEBHOOK_URL, {
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
