import { NextResponse } from "next/server";
import {
  BUSINESS_EMAIL_REQUIRED_MESSAGE,
  isStrictBusinessEmail,
} from "@/lib/business-email";

const STORYLOCK_WEBHOOK_URL =
  "https://brandmultiplier.app.n8n.cloud/webhook/2858fbb7-bcf0-4a7e-88e7-a7367e28d481";

type StorylockPayload = {
  email?: string;
  name?: string;
  phone?: string;
  phone_provided?: boolean;
  source?: string;
  submitted_at?: string;
  source_url?: string;
  resource_requested?: string;
  [key: string]: unknown;
};

export async function POST(req: Request) {
  try {
    const raw = (await req.json()) as StorylockPayload;

    if (!(await isStrictBusinessEmail(raw.email ?? ""))) {
      return NextResponse.json(
        { ok: false, error: BUSINESS_EMAIL_REQUIRED_MESSAGE },
        { status: 400 },
      );
    }

    const payload: StorylockPayload = {
      ...raw,
      submitted_at: raw.submitted_at ?? new Date().toISOString(),
      source_url: raw.source_url ?? req.headers.get("referer") ?? undefined,
      resource_requested: raw.resource_requested ?? "storylock-tax-calculator",
      phone_provided: typeof raw.phone === "string" && raw.phone.trim().length > 0,
    };

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
