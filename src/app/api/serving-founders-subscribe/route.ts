import { NextResponse } from "next/server";
import { isValidEmailShape } from "@/lib/business-email";

const KIT_API_BASE = "https://api.kit.com/v4";

type SubscribePayload = {
  name?: string;
  email?: string;
};

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as SubscribePayload;
    const email = (payload.email ?? "").trim();
    const name = (payload.name ?? "").trim();

    if (!email || !isValidEmailShape(email)) {
      return NextResponse.json(
        { ok: false, error: "A valid email address is required." },
        { status: 400 },
      );
    }

    const apiKey = process.env.KIT_API_KEY;

    if (!apiKey) {
      console.error("[serving-founders-subscribe] Missing KIT_API_KEY env var");
      return NextResponse.json(
        { ok: false, error: "Server configuration error." },
        { status: 500 },
      );
    }

    // Create the subscriber as active so they appear immediately in Kit's
    // subscribers list. The previous client-side implementation was creating
    // them as inactive (the default), which is why they never appeared.
    const createRes = await fetch(`${KIT_API_BASE}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": apiKey,
      },
      body: JSON.stringify({
        email_address: email,
        first_name: name || undefined,
        state: "active",
      }),
      cache: "no-store",
    });

    if (!createRes.ok) {
      const body = await createRes.text();
      console.error("[serving-founders-subscribe] subscriber create failed", {
        status: createRes.status,
        body,
      });
      return NextResponse.json(
        { ok: false, error: "Failed to register subscriber." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[serving-founders-subscribe] unexpected error", err);
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }
}
