import type { Metadata } from "next";
import ProtagonistMapWidget from "./ProtagonistMapWidget";

export const metadata: Metadata = {
  title: "The Multi-Protagonist Mapper \u2014 BrandMultiplier",
  description: "Map every stakeholder in your deal \u2014 their stake, their fear, what proves it to them, and the first line that isn't generic.",
};

export default function Page() {
  return <ProtagonistMapWidget />;
}
