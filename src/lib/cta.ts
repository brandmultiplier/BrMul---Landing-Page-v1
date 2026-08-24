export const CTA_LABEL = "Book The Diagnostic";

export const CALENDLY_BASE = "https://calendly.com/book-crc/storyline/";
export const CALENDLY_UTM_SOURCE = "resources";
export const CALENDLY_UTM_CAMPAIGN = "narrative_diagnostic";

export const CALENDLY_PLACEMENTS = {
  nav: { medium: "nav_cta", content: "nav" },
  midcontent: { medium: "midcontent_cta", content: "midcontent" },
  bottom: { medium: "bottom_cta", content: "bottom" },
  sticky: { medium: "sticky_cta", content: "sticky" },
  endcontent: { medium: "midcontent_cta", content: "endcontent" },
  index_nav: { medium: "nav_cta", content: "nav" },
  index_hero: { medium: "index_hero", content: "hero" },
  index_footer: { medium: "index_footer", content: "footer" },
} as const;

export type CalendlyPlacement = keyof typeof CALENDLY_PLACEMENTS;

type CalendlyHrefArgs = {
  slug: string;
  placement: CalendlyPlacement;
};

export function calendlyHref({ slug, placement }: CalendlyHrefArgs): string {
  const { medium, content } = CALENDLY_PLACEMENTS[placement];
  const url = new URL(CALENDLY_BASE);
  url.searchParams.set("utm_source", CALENDLY_UTM_SOURCE);
  url.searchParams.set("utm_medium", medium);
  url.searchParams.set("utm_campaign", CALENDLY_UTM_CAMPAIGN);
  url.searchParams.set("utm_content", `${slug}__${content}`);
  url.searchParams.set("hide_gdpr_banner", "1");
  return url.toString();
}
