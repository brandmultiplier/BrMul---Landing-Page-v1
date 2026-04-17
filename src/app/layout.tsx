import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
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
      <Script id="rb2b-loader" strategy="afterInteractive">
        {`!function(key) {if (window.reb2b) return;window.reb2b = {loaded: true};var s = document.createElement("script");s.async = true;s.src = "https://b2bjsstore.s3.us-west-2.amazonaws.com/b/" + key + "/" + key + ".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);}("ZQ6J2RH73W6D");`}
      </Script>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-black`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
