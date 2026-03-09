import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://www.brandmultiplier.ai"),
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
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KS2JZD8Z');`}
      </Script>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-black`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KS2JZD8Z"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <GlobalMouseHalo />
        <Navbar />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
