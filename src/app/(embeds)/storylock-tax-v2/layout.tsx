import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The StoryLock Tax Calculator | BrandMultiplier",
};

export default function StoryLockTaxV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
