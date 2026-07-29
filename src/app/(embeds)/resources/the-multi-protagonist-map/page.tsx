import type { Metadata } from "next";
import { RESOURCE_CSS, RESOURCE_LOGO } from "../_shared";

export const metadata: Metadata = {
  title: "The Multi-Protagonist Map—BrandMultiplier",
  description:
    "Why your deal is stalling with 8-13 people you've never individually convinced. It's stalling because each person needs a different version of the story, and your team is telling all of them the same one.",
};

const BODY_HTML = `
<header class="site-head">
  <a class="logo" href="/resources"><img src="${RESOURCE_LOGO}" alt="BrandMultiplier b✳"><b>BrandMultiplier</b></a>
  <a class="back" href="/resources">← All resources</a>
</header>
<main class="resource">
  <div class="eyebrow">The Multi-Protagonist Map</div>
  <h1>The Multi-Protagonist Map</h1>
  <p class="h1-sub">Why Your Deal Is <span class="c-orange">Stalling</span> With 8-13 People You've Never Individually Convinced</p>
  <p class="byline">By BrandMultiplier</p>
  <figure class="hero">
    <img src="/resources/the-multi-protagonist-map-cover.png" alt="Silhouette in a circular stone chamber connected by glowing orange lines to multiple purple portals around the walls">
    <figcaption>One hero's journey can't carry a committee of thirteen.</figcaption>
  </figure>
  <article class="body">

<h2>Your deal isn't stalling on price</h2>
<p>It's stalling because 8 to 13 people need to say yes before it closes, each one needs a different version of the story, and your team is telling all of them the same one.</p>
<p>The single hero's journey—one buyer, one narrative arc, one clean story—collapses the moment the eleventh stakeholder walks into the room with a completely different definition of risk than stakeholder number three.</p>
<hr>

<figure class="fig"><div class="statrow">
<div class="stat"><div class="n">~22</div><div class="l">On The Committee</div><div class="d">average B2B buying group: 13 internal, 9 external (Forrester, 2026)</div></div>
<div class="stat"><div class="n">74%</div><div class="l">In Conflict</div><div class="d">of buying teams sit in unhealthy internal conflict (Gartner)</div></div>
<div class="stat"><div class="n">86%</div><div class="l">Stall Before Closing</div><div class="d">of B2B purchases stall out before they ever close (Forrester)</div></div>
</div><figcaption class="fig-cap">One hero's journey can't carry a cast of thirteen.</figcaption></figure>

<h2>The committee reality</h2>
<p>B2B buying groups have grown from roughly five stakeholders a decade ago to a range most teams are not prepared for. Forrester's 2026 research puts the average B2B buying committee at 22 people—13 internal, 9 external. Gartner finds 74% of buying teams fall into some form of unhealthy conflict during the purchase, and Forrester finds 86% of B2B purchases stall out before they close—the deal dies inside the committee, not against the product on the table.</p>
<p><span class="c-orange"><strong>Your CTO needs architectural integrity. Your CFO needs ROI confidence. Your procurement lead needs compliance assurance. Your internal champion needs enough career-risk cover to put their name on the recommendation.</strong></span></p>
<p>One narrative, built for one buyer, was never going to carry all four—let alone the other nine to eighteen people in the room behind them.</p>
<hr>

<h2>Why one story can't carry a committee</h2>
<p>A single hero's journey assumes a single hero. Real B2B deals have a cast: the economic buyer weighing total cost of ownership, the technical evaluator weighing architecture and risk, the end user weighing whether this makes their job easier or harder, and the internal champion weighing whether recommending you is safe for their own career.</p>
<p>Most sales narratives are written for the first person in that list and recited, unchanged, to the other three. The champion is left to translate a CFO-shaped pitch into something that will hold up when their CTO asks a question nobody on your team prepared them for.</p>
<p>When the translation fails, the deal doesn't die loudly. It goes quiet, and you find out three weeks later it went to "no decision." (40-60% of qualified deals are lost to 'no decision'—The JOLT Effect, Dixon &amp; McKenna) (Related: <a class="inline-link" href="/resources/the-valuation-killer">The Valuation Killer</a>.)</p>
<hr>

<h2>The Multi-Protagonist Map</h2>
<p>This is a working template for one live deal, not a generic framework. Pull up an active opportunity with more than one stakeholder and fill in a row for each person who has to say yes.</p>
<p><strong>For each stakeholder, answer four questions:</strong></p>
<ol>
<li><strong>Their stake</strong>—What do they personally get if this succeeds? Not the company benefit. Their benefit: budget freed up, a problem off their desk, a promotion case, a quieter Tuesday.</li>
<li><strong>Their fear</strong>—What do they personally risk if this goes wrong? Being blamed, being seen as careless, inheriting a mess, looking like they didn't do their diligence.</li>
<li><strong>Their version of proof</strong>—What actually moves this specific person? A CFO wants a number. A CTO wants an architecture diagram. An end user wants to see it work before they trust it works.</li>
<li><strong>Their entry point</strong>—What is the first sentence your champion needs to say to this person that isn't the sentence they'd say to anyone else in the room?</li>
</ol>
<p>Do this for every named stakeholder you can identify on the deal, including the ones who haven't spoken in a meeting yet but will have to sign off. If you can't answer all four questions for someone on your own stakeholder list, that is the exact person your deal is currently exposed to losing.</p>
<p><strong>BONUS:</strong> Here's an interactive version we built for you, to make it as easy as possible to generate value quickly.</p>
<p class="cta-wrap"><a class="btn-secondary" href="/protagonist-map">Open the Multi-Protagonist Map</a></p>
<p><span class="c-orange"><strong>Once the map is filled in, hand it to whoever on your team owns this deal.</strong></span> The test isn't whether you can recite it. It's whether they can walk into a room with the CTO alone and carry the CTO's version of the story without you feeding them lines from a side channel.</p>
<hr>

<h2>The bridge</h2>
<p>You can build this map by hand, for one deal, in about twenty minutes. A system builds it automatically, for every deal, for every rep, the moment a new stakeholder is added to a CRM record—which is the difference between solving this once and solving it as infrastructure. (That is what a <a class="inline-link" href="/what-is-a-narrative-operating-system">Narrative Operating System</a> is for. Related: <a class="inline-link" href="/resources/the-solution-graveyard">The Solution Graveyard</a>.)</p>

<p class="cta-wrap"><a class="btn-primary" href="https://calendly.com/book-crc/storyline/">Book The Diagnostic</a></p>
<hr>

<div class="callout note"><span class="ico">📎</span><p><em>Sources: Average B2B buying committee of ~22 people (13 internal, 9 external)—Forrester (2026). 86% of B2B purchases stall before closing—Forrester, The State of Business Buying. 74% of buying teams experience unhealthy conflict during the purchase—Gartner (2025). 40-60% of qualified deals lost to 'no decision', 56% to buyer indecision, across 2.5M sales conversations—Matthew Dixon &amp; Ted McKenna, The JOLT Effect (2022).</em></p></div>
  </article>
</main>
<section class="related"><h3>Keep going</h3><div class="cards"><a class="card" href="/resources/the-valuation-killer"><span class="k">What stalled deals cost</span><span class="t">The Valuation Killer</span></a><a class="card" href="/resources/the-solution-graveyard"><span class="k">The fixes that missed</span><span class="t">The Solution Graveyard</span></a></div></section>
<footer class="site-foot"><p><strong>BrandMultiplier</strong>—B2B Narrative Infrastructure for Founder-Led Companies. <a href="https://brandmultiplier.ai">brandmultiplier.ai</a></p></footer>
`;

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: RESOURCE_CSS }} />
      <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
    </>
  );
}
