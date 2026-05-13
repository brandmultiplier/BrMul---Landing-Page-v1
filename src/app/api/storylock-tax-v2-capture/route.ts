import { NextResponse } from "next/server";
import {
  BUSINESS_EMAIL_REQUIRED_MESSAGE,
  isStrictBusinessEmail,
} from "@/lib/business-email";

type StorylockV2Payload = {
  email?: string;
};

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as StorylockV2Payload;

    if (!(await isStrictBusinessEmail(payload.email ?? ""))) {
      return NextResponse.json(
        { ok: false, error: BUSINESS_EMAIL_REQUIRED_MESSAGE },
        { status: 400 },
      );
    }

    console.log("[storylock-tax-v2-capture] lead received:", JSON.stringify(payload));

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 },
    );
  }
}
