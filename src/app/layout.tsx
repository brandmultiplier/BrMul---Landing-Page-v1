import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";

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
  title: "BrandMultiplier.ai | Narrative Infrastructure for Founder-Led B2B Companies",
  description: "We extract your narrative and codify it into infrastructure anyone can deploy. Stop being the bottleneck. CAC down 30%, deal cycles 35% faster.",
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

import GlobalMouseHalo from "@/components/ui/GlobalMouseHalo";

// ... (existing imports)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-black`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        <GlobalMouseHalo />
        <Navbar />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
