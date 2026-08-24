import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Suspense } from "react";
import AnalyticsRuntime from "@/components/analytics/AnalyticsRuntime";
import TrackingScripts from "@/components/analytics/TrackingScripts";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.brandmultiplier.ai"),
  title: "B2B Narrative Infrastructure | BrandMultiplier.ai",
  description: "B2B narrative infrastructure that scales your founder story into a system your team deploys. CAC down 30%, deal cycles 35% faster — without you in every room.",
  keywords: ["B2B marketing", "founder-led companies", "narrative infrastructure", "brand strategy", "CAC reduction", "sales enablement"],
  authors: [{ name: "BrandMultiplier.ai" }],
  openGraph: {
    title: "BrandMultiplier.ai | Narrative Infrastructure",
    description: "Your Story Closes Deals. Your Team Can't Tell It. We fix that.",
    type: "website",
    locale: "en_US",
    siteName: "BrandMultiplier.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrandMultiplier.ai | Narrative Infrastructure",
    description: "Your Story Closes Deals. Your Team Can't Tell It. We fix that.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <TrackingScripts />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-black`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
        suppressHydrationWarning
      >
        <Suspense fallback={null}>
          <AnalyticsRuntime />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
