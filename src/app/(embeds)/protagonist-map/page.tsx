import type { Metadata } from "next";
import ProtagonistMapWidget from "./ProtagonistMapWidget";
import LegalLinks from "@/components/legal/LegalLinks";

export const metadata: Metadata = {
  title: "The Multi-Protagonist Mapper \u2014 BrandMultiplier",
  description: "Map every stakeholder in your deal \u2014 their stake, their fear, what proves it to them, and the first line that isn't generic.",
};

export default function Page() {
  return (
    <>
      <ProtagonistMapWidget />
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
