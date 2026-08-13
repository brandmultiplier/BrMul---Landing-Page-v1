import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The StoryLock Tax Calculator | BrandMultiplier",
  alternates: {
    canonical: "https://www.brandmultiplier.ai/storylock-tax",
  },
};

export default function StoryLockTaxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
