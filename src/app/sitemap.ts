import { MetadataRoute } from "next";

/** Matches the 12 slugs in resources/page.tsx ARTICLES */
const RESOURCE_SLUGS = [
  "stop-posting-content",
  "the-3-9m-leak",
  "the-3m-15m-death-valley",
  "the-450b-ai-hallucination",
  "the-500k-dead-weight",
  "the-extraction-economy",
  "the-multi-protagonist-map",
  "the-solution-graveyard",
  "the-unicorn-fallacy",
  "the-valuation-killer",
  "what-founders-crossed-50m",
  "cac-killer",
] as const;

const SITE_WWW = "https://www.brandmultiplier.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${SITE_WWW}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_WWW}/resources`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...RESOURCE_SLUGS.map((slug) => ({
      url: `${SITE_WWW}/resources/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_WWW}/privacy`,
      lastModified: new Date("2026-08-17"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_WWW}/terms`,
      lastModified: new Date("2026-08-17"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_WWW}/storylock-tax`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_WWW}/what-is-a-narrative-operating-system`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_WWW}/NOS-architecture`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_WWW}/extraction-instrument`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
