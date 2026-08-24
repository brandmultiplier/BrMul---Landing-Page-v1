# Resource pages — shipped markers (T1 / T4)

This is the crawl contract that matches the build. Check these markers, not an older draft of the spec.

## T1 — nav CTA

Every article page and `/resources` ships a header booking control with **both**:

- `class="btn-nav"` (original T1 acceptance marker)
- `data-cta="nav"` (shipped attribute)

The href is built by `calendlyHref()` in `src/lib/cta.ts` and includes `utm_medium=nav_cta`.

A crawl that looks only for `btn-nav` or only for `data-cta="nav"` should both pass. Prefer checking `utm_medium=nav_cta` on the Calendly href — that is the T4 booking-test parameter.

## T4 — Calendly URLs

All resource Calendly hrefs are produced by `calendlyHref({ slug, placement })`. There are no hand-authored Calendly query strings under `src/app/(embeds)/resources`.

Required params on every href:

| Param | Value |
|---|---|
| `utm_source` | `resources` |
| `utm_medium` | from the placement map in `src/lib/cta.ts` |
| `utm_campaign` | `narrative_diagnostic` (constant) |
| `utm_content` | `<slug>__<placement-suffix>` |
| `hide_gdpr_banner` | `1` |

Placement map (medium and content suffix derived together):

| Placement | `utm_medium` | `utm_content` suffix |
|---|---|---|
| `nav` | `nav_cta` | `nav` |
| `midcontent` | `midcontent_cta` | `midcontent` |
| `bottom` | `bottom_cta` | `bottom` |
| `sticky` | `sticky_cta` | `sticky` |
| `endcontent` | `midcontent_cta` | `endcontent` |
| `index_nav` | `nav_cta` | `nav` |
| `index_hero` | `index_hero` | `hero` |
| `index_footer` | `index_footer` | `footer` |

`utm_term` is reserved for the library `bm_lead_id` cookie (appended client-side after opt-in). Inbound UTMs may overlay source/medium/campaign/content; they must not clear `hide_gdpr_banner` or a stored lead id.

## Do-not-call (Privacy §7)

`POST /api/opt-out` posts `{ email, source, ts, do_not_call: true }` to `DNC_WEBHOOK_URL`. The setter dial queue is **not** in this repo. The permanent flag is only written when that webhook is mapped in CRM/n8n. Until then, this check stays blocked.

## Whole-library crawl

For each of the 12 article routes plus `/resources`:

1. HTML contains `class="btn-nav"` and `data-cta="nav"`.
2. A Calendly href contains `utm_medium=nav_cta`.
3. Every `calendly.com/book-crc` href contains `utm_campaign=narrative_diagnostic`, a `utm_content` of `<slug>__<placement>`, and `hide_gdpr_banner=1`.
4. Zero hrefs use `utm_medium=internal` or `utm_medium=inline_cta`.
