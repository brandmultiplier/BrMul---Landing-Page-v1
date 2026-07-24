import type { Metadata } from "next";
import ExtractionInstrumentWidget from "./ExtractionInstrumentWidget";

export const metadata: Metadata = {
  title: "The Uncopyable-Asset Instrument \u2014 BrandMultiplier",
  description: "Four prompts. One synthesis of the thing about your business that can't be copied.",
};

export default function Page() {
  return <ExtractionInstrumentWidget />;
}
