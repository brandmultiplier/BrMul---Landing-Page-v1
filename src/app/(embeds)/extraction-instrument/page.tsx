import type { Metadata } from "next";
import ExtractionInstrumentWidget from "./ExtractionInstrumentWidget";
import LibraryGateOverlay from "@/components/library/LibraryGateOverlay";
import LegalLinks from "@/components/legal/LegalLinks";

export const metadata: Metadata = {
  title: "The Uncopyable-Asset Instrument \u2014 BrandMultiplier",
  description: "Four prompts. One synthesis of the thing about your business that can't be copied.",
  alternates: {
    canonical: "https://www.brandmultiplier.ai/extraction-instrument",
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ gate?: string }>;
}) {
  const { gate } = await searchParams;

  return (
    <>
      <ExtractionInstrumentWidget />
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
      <LibraryGateOverlay
        title="The Uncopyable-Asset Instrument"
        redirectTo="/extraction-instrument"
        intent="extraction_instrument"
        show={gate === "1"}
      />
    </>
  );
}
