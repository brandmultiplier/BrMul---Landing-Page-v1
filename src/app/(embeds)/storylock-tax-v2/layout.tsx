import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The StoryLock Tax Calculator | BrandMultiplier",
};

export default function StoryLockTaxAliasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
