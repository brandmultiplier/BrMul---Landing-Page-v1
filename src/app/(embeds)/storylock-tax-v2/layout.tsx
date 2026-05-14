import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What StoryLock is Costing Your Business this Year | BrandMultiplier",
};

export default function StoryLockTaxV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
