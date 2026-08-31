import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The StoryLock Tax Calculator | BrandMultiplier",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StoryLockTaxToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
