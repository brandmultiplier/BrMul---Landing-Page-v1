import type { Metadata } from "next";
import {
  RESOURCE_ARTICLE_DATES,
  RESOURCE_CSS,
  RESOURCE_LOGO_MARKUP,
  buildArticleLd,
  buildArticleMetadata,
  buildBreadcrumbLd,
  withLazyImages,
} from "../_shared";

const ARTICLE_META = {
  slug: "the-solution-graveyard",
  title: "The Solution Graveyard",
  subtitle: "Why Eight Fixes Couldn't Solve One Problem",
  eyebrow: "The Fixes That Fail",
  description:
    "Why eight fixes couldn't solve one problem. Every founder-led company buys the same eight fixes in the same order. None of them reach the layer underneath.",
  heroAlt:
    "Silhouette walking past a row of dark purple monoliths toward a glowing orange doorway",
} as const;

export const metadata = buildArticleMetadata(ARTICLE_META);

const BODY_HTML = `
<div class="site-head-bar"><header class="site-head">
  <a class="logo" href="/resources">${RESOURCE_LOGO_MARKUP}</a>
  <div class="head-actions">
    <a class="back" href="/resources">← All resources</a>
    <a class="btn-nav" href="https://calendly.com/book-crc/storyline/?utm_source=resources&utm_medium=nav_cta&utm_campaign=narrative_diagnostic&utm_content=the-solution-graveyard__nav" data-cta="nav">Book The Diagnostic</a>
  </div>
</header></div>
<main class="resource">
  <div class="eyebrow">The Fixes That Fail</div>
  <h1>The Solution Graveyard</h1>
  <p class="h1-sub">Why Eight Fixes Couldn't Solve <span class="c-orange">One Problem</span></p>
  <p class="byline">By <a href="https://www.linkedin.com/in/chrisrubin">Chris Rubin</a></p>
  <figure class="hero">
    <img src="/resources/the-solution-graveyard-cover.png" alt="Silhouette walking past a row of dark purple monoliths toward a glowing orange doorway">
    <figcaption>Eight headstones. One buried assumption.</figcaption>
  </figure>
  <article class="body">

<h2>You have probably stood in three of these graves already</h2>
<p>Every founder-led B2B company between $3M and $50M runs the same experiment, usually without realizing it is an experiment. Something is off in sales. The team can't close what the founder closes. So the company buys a fix. Then another. Then a third, when the first two didn't move the number.</p>
<p>Eight purchases show up again and again across these companies, in almost the same order, for almost the same reasons. None of them are bad purchases. All of them are aimed at the wrong layer of the problem.</p>
<p><span class="c-orange"><strong>Read the eight below and mark the ones you have already bought. Most founders stop counting at three.</strong></span></p>
<hr>

<figure class="fig"><div class="statrow">
<div class="stat"><div class="n">8</div><div class="l">Fixes Bought</div><div class="d">the same eight purchases, in the same order, across founder-led companies</div></div>
<div class="stat"><div class="n">1</div><div class="l">Buried Assumption</div><div class="d">that the selling logic was ever extracted—it wasn't</div></div>
<div class="stat"><div class="n">3-4x</div><div class="l">Not 7-8x</div><div class="d">the EBITDA multiple a founder-dependent business settles for</div></div>
</div><figcaption class="fig-cap">Eight headstones. One cause underneath all of them.</figcaption></figure>

<div class="callout mid-cta">
<span class="ico">🎯</span>
<h3>Not sure if this is your problem?</h3>
<p>30 minutes, live. We run your public content through our tooling before the call — your story in your own words, next to what your channels did to it. You keep the scorecard either way.</p>
<p class="cta-wrap"><a class="btn-primary" href="https://calendly.com/book-crc/storyline/?utm_source=resources&utm_medium=inline_cta&utm_campaign=narrative_diagnostic&utm_content=the-solution-graveyard__midcontent" data-cta="midcontent">Book The Diagnostic</a></p>
</div>
<h2>Eight purchases, one buried assumption</h2>
<ul>
<li><strong>The brand agency.</strong><br>$10,000 to $30,000. Delivers a positioning deck and a style guide. The sales team opens it once, in the kickoff call, and never again—because a deck is not something a rep can improvise from under pressure on a live call.</li>
<li><strong>The first AE hire.</strong><br>$150,000 to $250,000 loaded. Commonly cited SaaS sales benchmarks put the failure rate for early sales hires at roughly 70 percent within the first year (SaaStr), and the reason is rarely talent. It is that the hire was handed a deck, a price sheet, and a lead list, and never handed the judgment that makes a founder close at double the rate—because that judgment was never written down anywhere a new hire could learn it from. (Related: <a class="inline-link" href="/resources/the-500k-dead-weight">The $500k Dead Weight</a>.)</li>
<li><strong>The StoryBrand workshop.</strong><br>A few thousand dollars. Produces a clean one-buyer narrative. Collapses the first time the actual deal has a CFO, a technical evaluator, and a procurement lead in it, because the framework was built for a single audience and the real sale has committee. (Related: <a class="inline-link" href="/resources/the-multi-protagonist-map">The Multi-Protagonist Map</a>.)</li>
<li><strong>The fractional CMO.</strong><br>$8,000 to $15,000 a month. Executes campaigns well. Never touches the alignment problem underneath—the fact that nobody in the company, including the founder, has ever written down why a skeptical buyer should choose them over the incumbent.</li>
<li><strong>Sales enablement software.</strong><br>A few thousand a month. Organizes and distributes whatever narrative you feed it. Systematizes a story that was never extracted in the first place, which means it systematizes the gap, not the fix.</li>
<li><strong>AI content tools.</strong><br>Variable cost, often near zero per piece. Generate more content, faster, trained on the same public corpus every competitor's tools are trained on—which is a large part of why the content converges toward sameness instead of differentiation. (Related: <a class="inline-link" href="/resources/the-extraction-economy">The Extraction Economy</a> and <a class="inline-link" href="/resources/stop-posting-content">Stop Posting Content</a>.)</li>
<li><strong>The DIY documentation sprint.</strong><br>No cash cost, real opportunity cost. Dies in week two, most often, because the founder does not have a free week and the output tends to be a feature list rather than the judgment calls that actually win deals.</li>
<li><strong>Doing nothing.</strong><br>The most expensive option, and the hardest to see, because the bill never arrives as a single invoice. It arrives as a valuation multiple that stays at 3 to 4x EBITDA instead of 7 to 8x, one quarter at a time. (Related: <a class="inline-link" href="/resources/the-valuation-killer">The Valuation Killer</a>.)</li>
</ul>
<hr>

<h2>What all eight have in common</h2>
<p>Look at the eight again and the pattern is not subtle. Each one treats a systems problem as if it were a talent problem, an artifact problem, or a tool problem. Hire better talent (the AE). Produce a better artifact (the agency, the workshop). Buy a better tool (the software, the AI content generator). Each purchase is a reasonable response to the wrong diagnosis.</p>
<p><span class="c-orange"><strong>The actual problem sits one layer beneath all eight: the founder's selling logic was never extracted, codified, and installed into a system the team can run without them. Every purchase downstream of that gap inherits it.</strong></span></p>
<p>A better deck cannot fix that. A better hire cannot fix that, because you are asking them to intuit what has never been written down. A better tool cannot fix that either, because software distributes whatever you feed it, and there was never anything complete to feed it.</p>

<h2>The Solution Graveyard Audit</h2>
<div class="callout"><span class="ico">💡</span>
<p>Go through the eight below and answer honestly, in one line each. Ten minutes.</p>
</div>
<ol>
<li><strong>Brand agency or positioning consultant:</strong><br>Tried it? What did it cost? What did it actually change on a live call?</li>
<li><strong>First (or most recent) AE / sales hire:</strong><br>Tried it? What did it cost? What judgment were they never handed?</li>
<li><strong>StoryBrand or single-buyer messaging workshop:</strong><br>Tried it? What did it cost? Did it survive contact with a real multi-stakeholder deal?</li>
<li><strong>Fractional CMO or marketing agency:</strong><br>Tried it? What did it cost? Did it touch why buyers choose you over the incumbent?</li>
<li><strong>Sales enablement software:</strong><br>Tried it? What did it cost? What was it distributing that was never actually extracted first?</li>
<li><strong>AI content tools:</strong><br>Tried it? What did it cost? Does your content sound different from your competitors' content?</li>
<li><strong>DIY documentation sprint:</strong><br>Tried it? What week did it die in, and what got produced before it did?</li>
<li><strong>Doing nothing:</strong><br>How long has it been? What is your current valuation multiple, and where do you think it would sit if the team could sell without you?</li>
</ol>
<p><span class="c-orange"><strong>Count your marks.</strong></span></p>
<p>If you are like most founders who run this audit, you have stood in at least three of these graves, spent real money in each one, and are still the senior-most closer in your own company. That is not a talent gap in your team. It is the one purchase you have not made yet—the one that starts by extracting what is currently only in your head. (Start with the <a class="inline-link" href="/extraction-instrument">Uncopyable-Asset Instrument</a>.)</p>
<hr>

<h2>The one thing not for sale in any of these eight categories</h2>
<p>None of the eight purchases above are shopping for what actually fixes this, because the category does not have a name in most founders' vocabularies yet. It is not a hire. It is not a deck. It is not a subscription.</p>
<p>It is extraction, codification, and installation, done as one connected system instead of three separate purchases made in three different years from three different vendors who never talk to each other.</p>
<p>You do not need a ninth headstone in this graveyard. You need to know which one you are standing over right now, and what the one purchase looks like that actually reaches the layer underneath it. (That purchase is a <a class="inline-link" href="/what-is-a-narrative-operating-system">Narrative Operating System</a>.)</p>
<hr>

<div class="callout note"><span class="ico">📎</span><p><em>Cost ranges reflect typical founder-led B2B spend at the $3M-$50M ARR stage, as referenced in the companion LinkedIn post. ~70% first-year failure rate for early sales hires—SaaStr (Jason Lemkin). The founder-dependency valuation gap is documented in John Warrillow's Value Builder analysis of 14,000 businesses—owner-dependent companies draw acquisition offers of 2.93x pre-tax profit versus 4.49x for owner-independent ones—and in the IRS- and ASA-recognized "key person discount"; the specific 3-4x vs 7-8x EBITDA figures reflect BrandMultiplier's diagnostic model.</em></p></div>
  </article>
</main>
<section class="related"><h3>Keep going</h3><div class="cards"><a class="card" href="/resources/the-multi-protagonist-map"><span class="k">Why one story fails</span><span class="t">The Multi-Protagonist Map</span></a><a class="card" href="/resources/the-3m-15m-death-valley"><span class="k">The plateau underneath</span><span class="t">The $3M-$15M Death Valley</span></a></div></section>
<section class="tail-cta"><p class="tail-cta-line">Or stop reading and get the live read.</p><p class="cta-wrap"><a class="btn-primary" href="https://calendly.com/book-crc/storyline/?utm_source=resources&utm_medium=bottom_cta&utm_campaign=narrative_diagnostic&utm_content=the-solution-graveyard__bottom" data-cta="bottom">Book The Diagnostic</a></p><p class="tail-links"><a class="back" href="/resources">← All resources</a><span class="tail-sep">·</span><a class="back" href="/storylock-tax">Calculate your StoryLock Tax →</a></p></section>
<div class="sticky-cta" role="complementary" aria-label="Book The Diagnostic"><span class="sticky-cta-txt">Is your bottleneck structural?</span><a class="btn-sticky" href="https://calendly.com/book-crc/storyline/?utm_source=resources&utm_medium=sticky_cta&utm_campaign=narrative_diagnostic&utm_content=the-solution-graveyard__sticky" data-cta="sticky">Book The Diagnostic</a></div>
<footer class="site-foot"><p><strong>BrandMultiplier</strong>—B2B Narrative Infrastructure for Founder-Led Companies. <a href="https://www.brandmultiplier.ai">brandmultiplier.ai</a></p></footer>
`;

export default function Page() {
  const dates = RESOURCE_ARTICLE_DATES[ARTICLE_META.slug];
  const articleLd = buildArticleLd({
    ...ARTICLE_META,
    datePublished: dates?.datePublished,
    dateModified: dates?.dateModified,
  });
  const breadcrumbLd = buildBreadcrumbLd(ARTICLE_META.title, ARTICLE_META.slug);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: RESOURCE_CSS }} />
      <div dangerouslySetInnerHTML={{ __html: withLazyImages(BODY_HTML) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
