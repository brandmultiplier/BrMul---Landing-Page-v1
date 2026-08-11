export const RESOURCE_CSS = `
:root{--purple:#4940C6;--orange:#f36901;--ink:#111114;--gray:#666;--line:#E8E6E1;
--lav:#F3F1FA;--lav2:#EDE8F5;--peach:#FFF4EC;--green:#2E7D32;--red:#C0392B;--pmid:#7a5bd0}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;font-family:Arial,Helvetica,sans-serif;color:var(--ink);background:#fff;line-height:1.62;font-size:18px}
img{max-width:100%;display:block}a{color:var(--purple)}
.site-head-bar{position:sticky;top:0;z-index:50;background:#fff;border-bottom:1px solid var(--line);transform:translateZ(0)}
.site-head{position:static;display:flex;align-items:center;justify-content:space-between;gap:16px;max-width:960px;margin:0 auto;padding:20px 24px}
.logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--ink)}
.logo img{width:40px;height:40px;border-radius:8px;object-fit:contain}
.logo b{font-weight:700;letter-spacing:.06em;font-size:15px;text-transform:uppercase}
.back{font-size:14px;color:var(--gray);text-decoration:none}.back:hover{color:var(--purple)}
.head-actions{display:flex;align-items:center;gap:16px}
a.btn-nav{display:inline-block;background:var(--orange);color:#fff;text-decoration:none;font-weight:700;padding:9px 16px;border-radius:8px;font-size:14px;line-height:1.2;white-space:nowrap;box-shadow:0 3px 10px rgba(243,105,1,.22)}
a.btn-nav:hover{filter:brightness(1.05)}
.resource{max-width:720px;margin:0 auto;padding:8px 24px 40px}
.eyebrow{color:var(--purple);font-weight:700;letter-spacing:.14em;text-transform:uppercase;font-size:13px;margin:24px 0 10px}
h1{font-size:40px;line-height:1.14;margin:0 0 14px;letter-spacing:-.01em;font-weight:800}
.lead{font-size:21px;color:#33333a;margin:0 0 16px}
.byline{color:var(--gray);font-size:14px;margin:0 0 26px;font-family:Georgia,serif;font-style:italic}
.byline a{color:var(--purple);text-decoration:underline;text-underline-offset:2px}
.hero{margin:0 0 34px}
.hero img{width:100%;height:auto;border-radius:14px;display:block;aspect-ratio:16/9;object-fit:cover;border:1px solid var(--line)}
.hero-ph{position:relative;aspect-ratio:16/9;border-radius:14px;overflow:hidden;
background:linear-gradient(120deg,#2b2470 0%,var(--purple) 52%,#7a3bd0 74%,var(--orange) 128%);
display:flex;align-items:center;justify-content:center;border:1px solid var(--line)}
.hero-ph span{color:#fff;font-size:13px;letter-spacing:.16em;text-transform:uppercase;opacity:.9;border:1px dashed rgba(255,255,255,.6);padding:8px 14px;border-radius:6px}
.hero figcaption{color:var(--gray);font-size:14px;margin-top:10px;font-style:italic}
.h1-sub{font-size:28px;line-height:1.2;margin:0 0 14px;font-weight:700;letter-spacing:-.01em}
.body a.inline-link{color:var(--orange);font-weight:700;text-decoration:underline;text-underline-offset:2px}
.body a.inline-link:hover{filter:brightness(1.05)}
.body h2{font-size:26px;line-height:1.2;color:var(--purple);margin:40px 0 12px;font-weight:800;letter-spacing:-.01em}
.body h3{font-size:20px;line-height:1.25;color:#1F2A5A;margin:28px 0 8px;font-weight:700}
.body h4{font-size:17px;margin:22px 0 6px;font-weight:700}
.body p{margin:0 0 16px}.body ul,.body ol{margin:0 0 18px;padding-left:22px}.body ul{list-style:disc outside}.body ol{list-style:decimal outside}.body li{margin:0 0 8px}
.body strong{font-weight:700}.body hr{border:0;height:1px;background:var(--line);margin:30px 0}
.c-orange{color:var(--orange)}.c-red{color:var(--red);font-weight:700}.c-green{color:var(--green)}
.c-purple{color:var(--purple)}.c-gray{color:var(--gray)}.c-yellow{background:#FFF3BF;padding:.05em .28em;border-radius:3px}
.hl{background:var(--lav);padding:.05em .28em;border-radius:3px}
.callout{background:var(--lav);border:1px solid var(--lav2);border-left:4px solid var(--purple);border-radius:10px;padding:18px 20px;margin:22px 0}
.callout>*:first-child{margin-top:0}.callout>*:last-child{margin-bottom:0}
.callout .ico{float:left;font-size:20px;margin:0 12px 4px 0;line-height:1}
.callout.note{background:#faf9fc;border-left-color:#c9c4e6}.callout.note p{font-size:14px;color:#555;margin:0}
.callout.mid-cta{background:var(--peach);border-color:#f6d9c0;border-left-color:var(--orange)}
.callout.mid-cta h3{margin-top:0;color:var(--ink)}
a.btn-primary{display:inline-block;background:var(--orange);color:#fff;text-decoration:none;font-weight:700;padding:15px 26px;border-radius:10px;font-size:17px;box-shadow:0 6px 18px rgba(243,105,1,.24)}
a.btn-primary:hover{filter:brightness(1.05)}
a.btn-secondary{display:inline-block;background:#fff;color:var(--purple);border:2px solid var(--purple);text-decoration:none;font-weight:700;padding:12px 22px;border-radius:10px;font-size:15px}
.cta-wrap{display:block;margin:22px 0 4px}
.related{max-width:720px;margin:16px auto 0;padding:26px 24px;border-top:1px solid var(--line)}
.related h3{font-size:14px;letter-spacing:.14em;text-transform:uppercase;color:var(--gray);margin:0 0 16px;font-weight:700}
.cards{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.card{display:block;text-decoration:none;color:var(--ink);border:1px solid var(--line);border-radius:12px;padding:16px 18px;transition:border-color .15s,box-shadow .15s}
.card:hover{border-color:var(--purple);box-shadow:0 6px 18px rgba(73,64,198,.10)}
.card .k{display:block;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--orange);font-weight:700}
.card .t{display:block;font-weight:700;margin-top:6px;font-size:17px;line-height:1.25}
.tail-cta{max-width:720px;margin:0 auto;padding:26px 24px 8px;text-align:center}
.tail-cta-line{font-size:19px;font-weight:700;color:var(--ink);margin:0 0 16px}
.tail-cta .cta-wrap{margin:0 0 18px}
.tail-links{font-size:14px;margin:0}
.tail-links .back{color:var(--gray);text-decoration:none}
.tail-links .back:hover{color:var(--purple)}
.tail-sep{color:var(--line);margin:0 10px}
.site-foot{max-width:720px;margin:26px auto 0;padding:24px;border-top:1px solid var(--line);color:var(--gray);font-size:13px}
.site-foot a{color:var(--gray)}
.sticky-cta{display:none}
.fig{margin:28px 0}
.fig-cap{font-size:13px;color:var(--gray);margin-top:10px;font-style:italic}
.statrow{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.stat{background:var(--lav);border:1px solid var(--lav2);border-radius:12px;padding:18px}
.stat .n{font-size:29px;font-weight:800;color:var(--purple);line-height:1}
.stat .l{font-weight:700;margin:9px 0 4px;font-size:15px}
.stat .d{font-size:13px;color:#555;line-height:1.42}
.breakdown{background:#fff;border:1px solid var(--line);border-radius:14px;padding:22px 22px 20px;box-shadow:0 8px 26px rgba(73,64,198,.06)}
.bar{display:flex;height:44px;border-radius:8px;overflow:hidden;margin-bottom:18px}
.bar .seg{display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px;min-width:34px}
.brk-list{list-style:none;margin:0;padding:0}
.brk-list li{display:flex;justify-content:space-between;align-items:baseline;padding:10px 0;border-bottom:1px solid var(--line)}
.brk-name{display:flex;align-items:center;gap:10px;font-size:15px}
.dot{width:12px;height:12px;border-radius:3px;flex:none}
.brk-amt{font-weight:700;font-variant-numeric:tabular-nums}
.brk-total{display:flex;justify-content:space-between;align-items:baseline;margin-top:14px;padding-top:14px;border-top:2px solid var(--ink)}
.brk-total span:first-child{font-weight:700}
.brk-total .brk-amt{font-size:23px;color:var(--orange)}
.cardgrid{display:flex;flex-wrap:wrap;justify-content:center;gap:12px}
.acard{flex:0 1 calc(50% - 6px);border:1px solid var(--line);border-radius:12px;padding:16px 18px;position:relative;background:#fff}
.acard .num{position:absolute;top:12px;right:16px;font-size:28px;font-weight:800;color:var(--lav2)}
.acard .nm{font-weight:800;font-size:16px;margin-bottom:6px;padding-right:30px;line-height:1.2}
.acard .cz{font-size:13px;color:#555;line-height:1.45}.acard .cz b{color:var(--red)}
@media (max-width:640px){h1{font-size:31px}.lead{font-size:19px}.cards{grid-template-columns:1fr}
body{font-size:17px}.head-actions{gap:10px}.back{font-size:13px}a.btn-nav{padding:8px 13px;font-size:13px}.sticky-cta{display:flex;align-items:center;justify-content:space-between;gap:12px;position:fixed;left:0;right:0;bottom:0;z-index:60;padding:10px 14px calc(10px + env(safe-area-inset-bottom));background:#fff;border-top:1px solid var(--line);transform:translateZ(0)}.sticky-cta-txt{font-size:13px;font-weight:700;color:var(--ink);line-height:1.25;flex:1 1 auto}a.btn-sticky{flex:0 0 auto;display:inline-block;background:var(--orange);color:#fff;text-decoration:none;font-weight:700;padding:11px 16px;border-radius:9px;font-size:14px;white-space:nowrap}.site-foot{padding-bottom:84px}.statrow{grid-template-columns:1fr}.cardgrid .acard{flex-basis:100%}}
@media (max-width:640px){.tail-links{display:flex;flex-direction:column;gap:8px}.tail-sep{display:none}}
@media (max-width:400px){.back{display:none}}
`;

export const RESOURCE_LOGO = "/brandmultiplier-logo.png";

const SITE = "https://www.brandmultiplier.ai";

export const RESOURCE_ARTICLE_DATES: Partial<
  Record<
    string,
    {
      datePublished?: string;
      dateModified?: string;
    }
  >
> = {};

const truncateHeadline = (value: string): string =>
  value.length <= 110 ? value : `${value.slice(0, 107).trimEnd()}...`;

type BuildArticleLdArgs = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  eyebrow: string;
  datePublished?: string;
  dateModified?: string;
};

export const buildArticleLd = ({
  slug,
  title,
  subtitle,
  description,
  eyebrow,
  datePublished,
  dateModified,
}: BuildArticleLdArgs) => {
  const articleLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE}/resources/${slug}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE}/resources/${slug}`,
    },
    url: `${SITE}/resources/${slug}`,
    headline: truncateHeadline(title),
    alternativeHeadline: subtitle,
    description,
    articleSection: eyebrow,
    inLanguage: "en-US",
    image: {
      "@type": "ImageObject",
      url: `${SITE}/resources/${slug}-og.jpg`,
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: "Chris Rubin",
      url: "https://www.linkedin.com/in/chrisrubin",
      jobTitle: "Founder",
      worksFor: { "@id": `${SITE}/#organization` },
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "BrandMultiplier",
      alternateName: "BrandMultiplier.ai",
      url: SITE,
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/brandmultiplier-logo.png`,
        width: 512,
        height: 512,
      },
    },
    isAccessibleForFree: true,
  };

  if (datePublished) {
    articleLd.datePublished = datePublished;
    articleLd.dateModified = dateModified ?? datePublished;
  } else if (dateModified) {
    articleLd.dateModified = dateModified;
  }

  return articleLd;
};

export const buildBreadcrumbLd = (title: string, slug: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    {
      "@type": "ListItem",
      position: 2,
      name: "Resources",
      item: `${SITE}/resources`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: title,
      item: `${SITE}/resources/${slug}`,
    },
  ],
});

type ResourceItem = {
  slug: string;
  title: string;
  description: string;
};

export const buildResourcesCollectionLd = (items: ResourceItem[]) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE}/resources#collection`,
  url: `${SITE}/resources`,
  name: "BrandMultiplier Resources",
  description:
    "The BrandMultiplier resource library: narrative infrastructure diagnostics for founder-led B2B companies between $3M and $50M ARR.",
  inLanguage: "en-US",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE}/resources/${item.slug}`,
      name: item.title,
      description: item.description,
    })),
  },
});
