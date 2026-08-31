"use client";

import StoryLockTaxCalculator from "./StoryLockTaxCalculator";
import LegalLinks from "@/components/legal/LegalLinks";

// Public page. Always asks for name + work email after the calculation,
// for every visitor, cookie or not. The library-gated twin is /storylock-tax-tool.
export default function StoryLockTaxPage() {
  return (
    <>
      <StoryLockTaxCalculator gated />
      <p
        style={{
          margin: 0,
          padding: "16px 24px 32px",
          textAlign: "center",
          fontSize: 13,
          color: "#A1A1AA",
          background: "#0A0A0A",
        }}
      >
        <LegalLinks />
      </p>
    </>
  );
}
