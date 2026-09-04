import type { Metadata } from "next";
import ExtractionInstrumentWidget from "../extraction-instrument/ExtractionInstrumentWidget";
import LibraryGateOverlay from "@/components/library/LibraryGateOverlay";
import LegalLinks from "@/components/legal/LegalLinks";

// Library-gated twin of /extraction-instrument. The overlay renders itself
// only while the bm_library cookie is missing, so a known lead never sees
// a second ask. Public (ungated) entry is /extraction-instrument.

export const metadata: Metadata = {
  title: "The Uncopyable-Asset Instrument \u2014 BrandMultiplier",
  description: "Four prompts. One synthesis of the thing about your business that can't be copied.",
  robots: { index: false, follow: true },
};

export default function ExtractionInstrumentToolPage() {
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
        redirectTo="/extraction-instrument-tool"
        intent="extraction_instrument"
        show
      />
    </>
  );
}
