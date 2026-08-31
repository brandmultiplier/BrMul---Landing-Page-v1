import type { Metadata } from "next";
import ExtractionInstrumentWidget from "./ExtractionInstrumentWidget";
import LibraryGateOverlay from "@/components/library/LibraryGateOverlay";

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
      <LibraryGateOverlay
        title="The Uncopyable-Asset Instrument"
        redirectTo="/extraction-instrument"
        intent="extraction_instrument"
        show={gate === "1"}
      />
    </>
  );
}
