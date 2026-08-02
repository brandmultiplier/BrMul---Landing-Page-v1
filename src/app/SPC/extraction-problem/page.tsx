import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "The Extraction Problem | Chris Rubin, BrandMultiplier",
  description:
    "Founder judgment is the last thing that won't transfer, and nobody has ever measured what a story is worth. An addendum to the 2024 BrandMultiplier white paper.",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const DOC_CSS = `
:root{
  --purple:#4940C6;--ink:#000000;--gray:#666666;--lav:#F3F1FA;--lav2:#EDE8F5;
  --peach:#FFF4EC;--amber:#5A3800;--rule:#E8E6E1;--measure:37rem;
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
html body{background:#fff;color-scheme:light;overflow-x:visible}
.spc-doc{margin:0;font-family:Arial,Helvetica,sans-serif;color:var(--ink);background:#fff;font-size:17px;line-height:1.7;-webkit-font-smoothing:antialiased}
.spc-doc .wrap{max-width:var(--measure);margin:0 auto;padding:0 1.5rem}

.spc-doc header.top{border-bottom:1px solid var(--rule);padding:1.1rem 0;margin-bottom:3.6rem}
.spc-doc .brandmark{font-size:.66rem;letter-spacing:.22em;font-weight:bold;color:var(--purple);text-transform:uppercase}

.spc-doc .eyebrow{font-size:.66rem;letter-spacing:.2em;text-transform:uppercase;color:var(--purple);font-weight:bold;margin-bottom:1.3rem;line-height:1.7}
.spc-doc h1{font-size:clamp(2.3rem,7vw,3.35rem);line-height:1.05;letter-spacing:-.022em;font-weight:bold;margin:0 0 1.5rem;color:var(--ink)}
.spc-doc .deck{font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:1.24rem;line-height:1.58;color:var(--gray);margin:0 0 2rem}
.spc-doc .byline{font-size:.82rem;color:var(--gray);padding-top:1.2rem;border-top:1px solid var(--rule)}
.spc-doc .byline b{color:var(--ink)}

/* orientation block */
.spc-doc .orient{border:1px solid var(--rule);border-top:3px solid var(--purple);padding:1.5rem 1.6rem .4rem;margin:2.4rem 0 0;background:#fff}
.spc-doc .orient .hd{font-size:.63rem;letter-spacing:.18em;text-transform:uppercase;font-weight:bold;color:var(--purple);margin-bottom:1rem}
.spc-doc .orient dl{margin:0}
.spc-doc .orient dt{font-size:.63rem;letter-spacing:.13em;text-transform:uppercase;color:var(--gray);font-weight:bold;margin-bottom:.2rem}
.spc-doc .orient dd{margin:0 0 1.05rem;font-size:.94rem;line-height:1.55}
.spc-doc .orient dd b{font-weight:bold}
.spc-doc .orient a{font-weight:bold}

.spc-doc section{margin:3.6rem 0}
.spc-doc .num{font-size:.66rem;letter-spacing:.2em;color:var(--purple);font-weight:bold;text-transform:uppercase;margin-bottom:.5rem}
.spc-doc h2{font-size:1.54rem;line-height:1.22;letter-spacing:-.012em;font-weight:bold;color:var(--purple);margin:0 0 1.1rem}
.spc-doc h3{font-size:1rem;font-weight:bold;color:var(--ink);margin:1.9rem 0 .5rem;line-height:1.4}
.spc-doc p{margin:0 0 1.2rem}
.spc-doc a{color:var(--purple);text-decoration:none;border-bottom:1px solid rgba(73,64,198,.32)}
.spc-doc a:hover{border-bottom-color:var(--purple)}

.spc-doc .pull{border-left:5px solid var(--purple);padding:.15rem 0 .15rem 1.4rem;margin:2.1rem 0;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:1.16rem;line-height:1.5}
.spc-doc .pull cite{display:block;font-family:Arial,Helvetica,sans-serif;font-style:normal;font-size:.75rem;color:var(--gray);margin-top:.65rem}
.spc-doc .callout{background:var(--lav);padding:1.4rem 1.5rem;margin:2rem 0;border-radius:2px}
.spc-doc .callout p:last-child{margin-bottom:0}
.spc-doc .callout .label{font-size:.63rem;letter-spacing:.18em;text-transform:uppercase;font-weight:bold;color:var(--purple);display:block;margin-bottom:.65rem}
.spc-doc .warm{background:var(--peach)}
.spc-doc .warm .label{color:var(--amber)}

.spc-doc .flow{background:var(--lav2);padding:1.05rem 1.25rem;margin:1.5rem 0;font-weight:bold;font-size:1rem;letter-spacing:.01em;line-height:1.5;border-radius:2px}
.spc-doc .flow span{color:var(--purple)}

.spc-doc ul,.spc-doc ol{margin:0 0 1.2rem;padding-left:1.15rem}
.spc-doc li{margin-bottom:.65rem}
.spc-doc li::marker{color:var(--purple)}

.spc-doc .kills{list-style:none;padding:0;margin:1.5rem 0 0;counter-reset:k}
.spc-doc .kills li{counter-increment:k;position:relative;padding:1.1rem 0 1.1rem 3.1rem;border-top:1px solid var(--rule);margin:0}
.spc-doc .kills li:last-child{border-bottom:1px solid var(--rule)}
.spc-doc .kills li::before{content:counter(k,decimal-leading-zero);position:absolute;left:0;top:1.24rem;font-size:.72rem;font-weight:bold;color:var(--purple);letter-spacing:.06em}
.spc-doc .kills .k-title{font-weight:bold;display:block;margin-bottom:.15rem}
.spc-doc .kills .k-why{color:var(--gray);font-size:.94rem;line-height:1.58;display:block}
.spc-doc .kills .k-why b{color:var(--ink);font-weight:bold}

.spc-doc .tablewrap{overflow-x:auto;margin:1.6rem 0 1.1rem;-webkit-overflow-scrolling:touch}
.spc-doc table{border-collapse:collapse;width:100%;font-size:.85rem;line-height:1.5;min-width:33rem}
.spc-doc th{background:var(--purple);color:#fff;text-align:left;padding:.7rem .82rem;font-weight:bold;font-size:.67rem;letter-spacing:.09em;text-transform:uppercase}
.spc-doc td{padding:.7rem .82rem;vertical-align:top;border-bottom:1px solid var(--rule)}
.spc-doc tbody tr:nth-child(odd){background:var(--lav)}
.spc-doc td:first-child{font-weight:bold}

.spc-doc .status{margin:1.6rem 0}
.spc-doc .status div{display:flex;gap:1rem;align-items:baseline;padding:.8rem 0;border-bottom:1px solid var(--rule)}
.spc-doc .status .tag{flex:0 0 5.2rem;font-size:.62rem;letter-spacing:.13em;text-transform:uppercase;font-weight:bold;padding-top:.22rem}
.spc-doc .tag.built{color:#2E7D32}
.spc-doc .tag.part{color:var(--amber)}
.spc-doc .tag.not{color:var(--gray)}
.spc-doc .status .what{font-size:.94rem;line-height:1.55}

.spc-doc .obj{border-top:1px solid var(--rule);padding:1.3rem 0 .2rem;margin:0}
.spc-doc .obj .q{font-weight:bold;display:block;margin-bottom:.5rem}
.spc-doc .obj p{font-size:.96rem;line-height:1.62}

.spc-doc .notes{margin-top:4rem;padding-top:1.8rem;border-top:2px solid var(--purple);font-size:.82rem;line-height:1.6;color:#333}
.spc-doc .notes h2{font-size:1.05rem;margin-bottom:1.1rem}
.spc-doc .notes ol{padding-left:1.3rem}
.spc-doc .notes li{margin-bottom:.8rem}
.spc-doc .notes a{word-break:break-word}

.spc-doc footer{margin-top:3.2rem;padding:2rem 0 4rem;border-top:1px solid var(--rule);font-size:.79rem;color:var(--gray)}
.spc-doc footer a{color:var(--purple)}
.spc-doc .footrule{height:3px;background:var(--purple);width:3rem;margin-bottom:1.3rem}

.spc-doc sup{font-size:.66em;line-height:0;vertical-align:super}
.spc-doc sup a{border-bottom:none;font-weight:bold}

@media (max-width:640px){
  .spc-doc{font-size:16px}
  .spc-doc section{margin:2.9rem 0}
  .spc-doc .status div{flex-direction:column;gap:.2rem}
  .spc-doc .status .tag{flex:none}
  .spc-doc .flow{font-size:.9rem}
}
@media print{
  .spc-doc{font-size:10.5pt;line-height:1.42}
  .spc-doc .callout,.spc-doc .pull,.spc-doc .flow,.spc-doc .orient,.spc-doc .obj{break-inside:avoid}
  .spc-doc a{border:none;color:var(--ink)}
}
`;

const BODY_HTML = `
<header class="top">
  <div class="wrap"><span class="brandmark">BrandMultiplier</span></div>
</header>

<main class="wrap">

  <div class="eyebrow">Addendum to the 2024 BrandMultiplier White Paper</div>
  <h1>The Extraction Problem</h1>
  <p class="deck">A founder's commercial judgment is the hardest thing in a company to transfer, and no one has ever measured what it is worth in pipeline. My 2024 white paper missed both. Two years of evidence, six killed versions of this company, and what they forced me to build.</p>
  <p class="byline"><b>Chris Rubin</b> &nbsp;·&nbsp; Founder and CEO, BrandMultiplier &nbsp;·&nbsp; Aspen, Colorado &nbsp;·&nbsp; July 2026</p>

  <div class="orient">
    <div class="hd">Before you read the argument</div>
    <dl>
      <dt>What we do</dt>
      <dd>We extract a founder's commercial judgment through a facilitated protocol, codify it into a machine-readable narrative object, and deploy it across the workflows where selling happens. We call the result a <b>Narrative Operating System</b>. Services today, services and software together as the product ships, to founder-led B2B companies at $3M to $50M ARR.</dd>

      <dt>Where it stands</dt>
      <dd>A bootstrapped services business delivering the methodology by hand. MRR is $32.5K across two accounts, a $390K annualized run rate; trailing-twelve ARR is $300K. It consolidates to $300K from a single account. Of three clients: one left to headwinds in their own industry; one paused through a difficult platform launch and returned at $25K per month as the design partner for the NOS build; the third pays $7.5K per month and is bringing the scoped-down version we built them in-house. The software product is designed and specified in full. It is not built.</dd>

      <dt>See the design</dt>
      <dd><a href="https://nos.brandmultiplier.ai/login">The NOS prototype</a> (access on request). A clickable prototype of the system I intend to build: the module structure, the metric model, and how narrative signal resolves against pipeline attribution, CAC, LTV, and cycle velocity. The data in it is illustrative. I use it in live sales conversations as a demand test, and it is the reason the design partner signed. <a href="https://www.brandmultiplier.ai/NOS-architecture">The public architecture walkthrough</a> explains the system underneath it.</dd>

      <dt>What I am raising for</dt>
      <dd>Building the thing the prototype depicts, against the design partner's environment first. Eighteen-month targets: live CRM and pipeline integrations; scoring automated to the point it can gate without a human reviewer; the first score-to-outcome correlation on real closed deals; and an extraction step that runs without me, which is the one part I have not solved by hand.</dd>
    </dl>
  </div>

  <section>
    <div class="num">01</div>
    <h2>What the 2024 paper got wrong</h2>

    <p>Two years ago I published a twenty-two-page white paper arguing that the future of brand strategy belonged to teams who combined machine analysis with human creative judgment.<sup><a href="#n1">1</a></sup> It felt bold at the time and reads as wallpaper now. As a thesis it was also close to useless, because "AI plus humans beats either alone" is a statement no one can act on and no one can disprove. It described a condition instead of a mechanism, and it never said which part of the work was actually hard.</p>

    <p>Three specific errors, in the order they became visible.</p>

    <p><b>It put the scarcity in the wrong place.</b> The implicit model was that AI generates raw material and experienced humans shape it into something that lands. That did not survive the year. What collapsed was the assumption that <em>producing the artifact</em> was the constrained step. The constraint sits earlier.</p>

    <p><b>It treated narrative as an output.</b> Everything flowed toward deliverables, and deliverables decay. Clients quoted a new strategy accurately for a quarter or two and were improvising by the end of the year, because the strategy lived in a document while the market lived in motion.</p>

    <p><b>It sold synergy in place of a mechanism.</b> The methodology could not be taught to anyone who had not watched me do it, which meant it could not be delegated, priced consistently, or improved against evidence. I had written a paper about scaling human judgment using a method that did not scale past me.</p>

    <p>One thing in that paper held. On page seven there is a paragraph about a session type we call the Rumble, which I described as discovery. It is an extraction protocol, and it is the only part of the original method still standing, because it was the only part solving the real problem.<sup><a href="#n2">2</a></sup></p>
  </section>

  <section>
    <div class="num">02</div>
    <h2>Problem one: the model does not transfer</h2>

    <p>A founder-led B2B company sells well because the founder sells. They walk into a room, read the buyer in ninety seconds, and reassemble the same facts into whichever argument that person needs to hear. They are running a model of the market, the buyer's fears, and the objection that has not surfaced yet, and the model is good because it was built from a decade of being wrong in specific ways.</p>

    <p>Then they hire a sales team, and the model stays behind.</p>

    <p>What transfers is the artifact of the model: the deck, the messaging doc, the battlecard. The team says accurate things in a way that persuades no one, win rates diverge, and the founder gets pulled back into every consequential deal. We call the condition StoryLock, and its diagnostic is one question. <em>Can your team explain why you win, to a skeptical buyer, without you in the room?</em></p>

    <p>Organizational theory has a precise name for the missing step. Nonaka and Takeuchi's SECI model describes four modes of knowledge conversion, and the one that matters here is <b>Externalization</b>, tacit to explicit, performed through metaphor, analogy and model. Snowden's 2002 critique is that this is precisely where knowledge management failed in practice, and that narrative is the instrument it was missing.<sup><a href="#n3">3</a></sup> Thirty years of that literature says the bottleneck is externalization. Thirty years of brand consulting has been selling downstream of it.</p>

    <div class="pull">We can always know more than we can tell, and we will always tell more than we can write down.<cite>David Snowden, <i>Journal of Knowledge Management</i>, 2002<sup><a href="#n3">3</a></sup></cite></div>

    <p>The reason a single document cannot fix this: the founder is not delivering one argument. They are delivering a different argument to every person in the room, recalibrated in real time. Gartner's 2025 buyer survey puts the median buying group for a complex solution at six to ten decision-makers, running as high as sixteen across four functions, with 74% showing unhealthy internal conflict during the decision.<sup><a href="#n4">4</a></sup> Dixon and McKenna's analysis of 2.5 million recorded sales conversations found 40% to 60% of B2B deals lost to buyers who intend to purchase and then fail to act.<sup><a href="#n5">5</a></sup> That is a coordination failure inside the buyer's own organization, reachable only by a story coherent enough to survive retelling by a champion you will never meet, in a meeting you are not invited to.</p>

    <p>Our Multi-Protagonist Framework treats each stakeholder as a first-class object with its own fear, desired outcome, decision criteria, and arc, plus the conflict and alignment points between them. Economic buyer, technical gatekeeper, champion, end user. An internal extension covers the people who carry the story afterward: reps, marketers, new hires, customer success, the executive team. Same narrative object, compiled for different jobs. A messaging document flattens all of it into one voice, which is why it stops working the moment it leaves the founder's hands.</p>
  </section>

  <section>
    <div class="num">03</div>
    <h2>Problem two: nobody has ever measured it</h2>

    <p>Brand and performance have been separate disciplines for forty years because of a measurement asymmetry. Performance marketing is instrumented to the click. Brand work, where the story lives, gets defended with impressions, recall studies, and the argument that some things matter even when you cannot count them. Every CFO who ever cut a brand budget was responding rationally to that gap.</p>

    <p>What has been missing is an instrument connecting a specific narrative choice to a specific commercial outcome. Not sentiment. Not share of voice. Whether <em>this</em> framing of the problem shortens the sales cycle, and by how many days.</p>

    <p>The system measures on three levels. Two are in use today.</p>

    <p><b>Before it ships.</b> A four-dimension rubric scored 1 to 10, with a 7.0 threshold required to pass. Recognition, does the audience see themselves in this. Ease, can it be understood, repeated, and deployed without the founder present. Novelty, does it break pattern enough to hold attention. Tension, does it create productive discomfort. Each dimension operationalizes a mechanism with literature behind it.<sup><a href="#n6">6</a></sup> The rubric is my construction and I hold it as a hypothesis. Its value is that it makes narrative quality a number people can argue with.</p>

    <p><b>After it ships.</b> A 0-to-6 index tracking how far a story travels: invisible, noticed, consumed, remembered, shared, referenced, identified. Level 5 is the interesting one, where a buyer starts using your framing inside their own organization. That is the observable signature of the narrative having transferred out of your company and into theirs.</p>

    <p><b>What it did to the business.</b> The third layer resolves both scores against the numbers a board already tracks: pipeline attributed, deals influenced, cycle velocity, CAC, deal size, LTV to CAC. This layer is designed down to the metric definitions and rendered in <a href="https://nos.brandmultiplier.ai/login">the prototype</a>, and it is not built. Today we assemble those numbers by hand, per client, which is how I know the model is executable and also why it cannot scale in its current form. Building it is the raise.</p>

    <div class="callout warm">
      <span class="label">Why this is the asset</span>
      <p>Any competent team can generate on-brand content. Almost nobody can say what a narrative choice was worth. Closing that loop produces something that compounds: narrative decisions paired with commercial outcomes, across many companies, over time. That dataset does not exist today, and the company that accumulates it first gets to answer questions the entire category is currently guessing at.</p>
    </div>
  </section>

  <section>
    <div class="num">04</div>
    <h2>Six versions of this I killed</h2>
    <p>The discarded ideas are more diagnostic than the surviving one, so here they are with the reason each died.</p>

    <ol class="kills">
      <li>
        <span class="k-title">A content-generation platform.</span>
        <span class="k-why">The obvious business, and the one everyone assumed I was building. Killed because <b>content volume was never the constraint</b>, and because that market was about to absorb a wave of better-funded entrants with better distribution. Losing on distribution to a commodity is a slow way to fail.</span>
      </li>
      <li>
        <span class="k-title">DIY-first SaaS.</span>
        <span class="k-why">Cheapest to build, best margins, cleanest story for investors. Killed after running extraction as a self-serve questionnaire with real founders. <b>They answered as their own marketing department</b>: polished, generic, useless. Snowden's first heuristic is that knowledge can only be volunteered and cannot be conscripted, and a form field conscripts.</span>
      </li>
      <li>
        <span class="k-title">Scaling the agency.</span>
        <span class="k-why">Hire and train narrative strategists, grow headcount. Killed on the arithmetic: revenue linear in practitioners, quality variance dominated by whoever runs the room. <b>I have been the ceiling of my own business before</b> and had no interest in building a larger version of it.</span>
      </li>
      <li>
        <span class="k-title">A better StoryBrand, with templates and certification.</span>
        <span class="k-why">Proven model, real market, real money in it. Killed because templates flatten. Output converges on a competent generic voice, which is the exact failure mode I sell against. <b>A framework that makes everyone sound similar cannot be sold as differentiation.</b></span>
      </li>
      <li>
        <span class="k-title">Enterprise-first, top-down.</span>
        <span class="k-why">Bigger contracts, existing budget line. Killed because enterprises already have brand systems and the pain is diffuse. <b>The acute pain is at $3M to $50M ARR</b>, where the founder is still personally in every consequential deal and can feel the ceiling arriving. Enterprise returns later as license-back, on their initiative.</span>
      </li>
      <li>
        <span class="k-title">Narrative analytics, measurement only.</span>
        <span class="k-why">Score the messaging, benchmark against competitors, sell the dashboard. Killed because measurement without an intervention produces a report, and reports produce nothing. <b>It is also the easiest thing for an incumbent to bolt on</b>, which makes it a feature wearing a company's clothing.</span>
      </li>
    </ol>

    <p style="margin-top:1.5rem">A thread runs through all six. Each was an attempt to route around the part of the problem that does not scale cleanly. Every time I removed the human extraction step, the inputs degraded and the system became a well-engineered way to produce confident nonsense.</p>
  </section>

  <section>
    <div class="num">05</div>
    <h2>What is actually built</h2>

    <p>Models did not suddenly start writing better prose. They have written adequate prose for years. What changed is that they became capable of holding a structured representation of a specific person's judgment and applying it consistently across contexts, which is a different capability, and the one this problem needed.</p>

    <p>Delivery runs in five phases.</p>
    <div class="flow">UNLOCK <span>→</span> RUMBLE <span>→</span> ARCHITECT <span>→</span> INSTALL <span>→</span> TUNE</div>
    <p>Installation runs 75 days, services and system deployed concurrently, then continuous correction. Two tiers today, done-for-you and done-with-you, setting how much operating load the client carries. A DIY path with quarterly recalibration is designed and gated on the automated scoring layer, and a license-back option exists for enterprises that want the system inside their own walls.</p>

    <h3>Where the humans are, and why they stay</h3>
    <p>Extraction requires a human in a room. I know because I tried to remove one, and the output degraded immediately. Beyond the initial Rumble, extraction recurs: follow-up sessions with the founder as the market moves, and separate sessions with the subject-matter experts on the client team who hold pieces of the model the founder cannot articulate. Inside the system, orchestration escalates to a human the moment judgment is required. Voice Fidelity Gates are five checkpoints where the founder personally validates that the output is something they would say, because "this is accurate and it does not sound like me" kills adoption faster than being wrong does. Nothing reaches a live audience without a human expert reviewing it.</p>

    <div class="status">
      <div><span class="tag built">Built</span><span class="what">The extraction protocol and facilitation sequence, documented and repeatable in structure.</span></div>
      <div><span class="tag built">Built</span><span class="what">The codification schema: the structured object a narrative is stored as, versioned, and queried against.</span></div>
      <div><span class="tag built">Built</span><span class="what">A revenue-generating services business delivering the methodology by hand, on internal tooling. This is the business today.</span></div>
      <div><span class="tag built">Built</span><span class="what">Both scoring layers, applied by trained humans across live engagements. Consistent enough to gate on. Whether the scores predict anything is untested.</span></div>
      <div><span class="tag built">Built</span><span class="what">A <a href="https://nos.brandmultiplier.ai/login">clickable prototype</a> of the full system, access on request, specified down to the metric definitions. The data in it is illustrative. It exists to test whether buyers want this before I spend a year building it, and it converted a design partner.</span></div>
      <div><span class="tag part">Partial</span><span class="what">One signed design partner, whose environment and data the first real version gets built against.</span></div>
      <div><span class="tag not">Not yet</span><span class="what">The product. Everything the prototype depicts: integrations, orchestration, automated scoring, live attribution. None of it is running.</span></div>
      <div><span class="tag not">Not yet</span><span class="what">Any claim that narrative scores predict commercial outcomes. I have a model and a rubric. I do not have the evidence, and buying the ability to get it is the raise.</span></div>
      <div><span class="tag not">Not yet</span><span class="what">An extraction session anyone can run but me. I documented the protocol and it has not fully transferred. I am the hardest case of the problem I sell against, which is most of why this became software.</span></div>
      <div><span class="tag not">Not yet</span><span class="what">Self-serve DIY tier, which requires the automated gate first or it ships an unvalidated narrative into a market.</span></div>
    </div>
  </section>

  <section>
    <div class="num">06</div>
    <h2>The four objections I would raise</h2>

    <div class="obj">
      <span class="q">You sell a cure for founder dependency. Can anyone run your own extraction session but you?</span>
      <p>No. Not yet, and the reason matters more than the admission. Two different things get called extraction. There is the <em>eliciting</em>, which is reading a room and knowing which thread to pull, and there is the <em>artifact</em>, the codified narrative object that comes out of it. Only one of those resisted transfer. The artifact externalizes cleanly, which is the whole reason a schema exists. What did not move was the eliciting, and I taught it to two people who watched me do it before I accepted that.</p><p>So the claim is not that software replaces me in the room. It is that software makes one room a year sufficient, where today the founder's judgment has to be re-summoned for every deliverable, every rep, every quarter. The failure of human-to-human transfer told me the leverage was never in cloning the facilitator. It is in making a single facilitated session produce something that then applies itself identically across a thousand downstream decisions without drifting. That is a job software is good at and people are bad at, and it is the opposite of the agency model I killed.</p><p>This is also where I part company with my own citation. Snowden is right that you cannot write down everything you know. The system does not need everything. It needs the narrative object, and that is writable. The part that stays unwritable is the elicitation, which is exactly why a human stays in it permanently rather than temporarily. I am not selling a cure I already have. I am building the thing that would have worked on me.</p>
    </div>

    <div class="obj">
      <span class="q">Gong already has the conversations. Why can't they just build this?</span>
      <p>Gong has the corpus and the outcomes. What it does not have is the label. Conversation intelligence can tell you a rep said a thing and lost the deal; it cannot tell you whether the framing was correct, because there is no ground truth for what the company was trying to say. Extraction produces that ground truth. It creates a versioned narrative object that downstream behavior can be measured against, and without one you can observe variance but never attribute it. Attribution requires the artifact only extraction produces, and extraction is the part that does not come out of a data pipeline. The credible risk is that Gong or Clari acquires a company that does extraction well. I would rather be that company.</p>
    </div>

    <div class="obj">
      <span class="q">You killed the agency for linear margins and then made humans the moat. Which is it?</span>
      <p>The distinction is where the human hours sit. An agency spends them continuously, on production, forever, and margin never improves. Here they are concentrated in a bounded window at the front of a 75-day install, plus scheduled re-extraction and gate reviews. Everything downstream of extraction, and it is most of the work by volume, runs on the codified object. The margin question is what percentage of delivery hours are human today and what mechanism moves that number, and I can answer it with our own delivery data. The strategic point is that the human hours are the input to a compounding asset instead of the product itself. Two live deals show where the agency version actually fails. At $7.5K a month, a client is hiring in-house to run the scoped-down system we built them, because at that size the work is absorbable. At $65K a month, on an SOW scoped for a second design partner, the founder told me directly that he has no interest in building the capability internally and wants us running it long term. Internalization is the failure mode at the bottom of the band and it disappears at the top.</p><p>That is an argument for moving upmarket, and for the software that makes serving the top of the market profitable rather than merely possible. Our published tiers top out at $25K a month; above that we price custom. The $65K SOW is unsigned, contingent on that company closing its Series B, and I do not count it, but its six-month commitment alone is $390K, our entire current annual run rate. At six-figure annual contracts the path to material revenue runs through a few hundred deep accounts rather than thousands of seats, and that is the shape I am building for.</p>
    </div>

    <div class="obj">
      <span class="q">You are a solo, non-engineering founder. Who builds it?</span>
      <p>I designed the schema and the metric model, and built the prototype with our AI engineer and our growth strategist. It is a prototype and I say so on the page, because a demo dressed as a product is the fastest way to lose a room. What it demonstrates is that I can specify this system down to the level an engineer can implement, which I know because I have been running every part of it by hand since that paper and can tell you which parts are hard. I have a committed lead engineer who has asked not to be named until they give notice. Everything to this point has been bootstrapped. Revenue covered the design work and I carried the rest personally, because I was not willing to raise on a thesis I had not proven. I have now proven the methodology and I cannot prove the measurement claim without capital, which is the whole of why I am raising.</p>
    </div>
  </section>

  <section>
    <div class="num">07</div>
    <h2>What would prove me wrong</h2>
    <p>Four failure conditions, stated in advance so they can be checked against.</p>

    <div class="tablewrap">
      <table>
        <thead>
          <tr><th style="width:30%">If this is true</th><th style="width:38%">The thesis fails because</th><th style="width:32%">How I would know</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>A model with enough company context extracts founder judgment as well as a facilitated session</td>
            <td>Extraction stops being defensible work and what remains is workflow tooling anyone can rebuild</td>
            <td>Head to head: model-elicited narrative against Rumble-elicited, blind-scored by the founder. Designed, runs against the design partner cohort.</td>
          </tr>
          <tr>
            <td>Codified narrative does not move win rate once the founder leaves the deal</td>
            <td>The mechanism is founder charisma instead of transferable structure, and there is nothing to install</td>
            <td>Team-closed win rate against founder-closed, before and after install, across the client base</td>
          </tr>
          <tr>
            <td>Pre-ship scores do not correlate with any commercial outcome</td>
            <td>The measurement layer is a vanity metric and the third loop has nothing to connect to</td>
            <td>Score-to-outcome correlation on cycle length and win rate, once design partner data is live</td>
          </tr>
          <tr>
            <td>Buyers stop weighting narrative as AI-generated positioning saturates the channel</td>
            <td>The differentiation window closes instead of widening, which inverts the thesis</td>
            <td>Longitudinal resonance tracking: flat or falling scores at constant production quality</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <p>The 2024 paper was unfinished more than wrong. It correctly identified that something here resisted automation, and correctly identified that the human contribution was the scarce input. It could not say <em>which</em> human contribution, so it took the flattering answer, creativity and taste, instead of the accurate one.</p>
    <p>The scarce input is extraction: getting a specific person to say the thing they have never had to say, in a form that holds when someone else picks it up, and then finding out what it was worth. Everything else exists to make those two acts pay.</p>
  </section>

  <div class="notes">
    <h2>Notes and sources</h2>
    <ol>
      <li id="n1"><a href="https://bit.ly/BrandMultiplier_White-Paper"><em>The SMB Brand Playbook: Integrating AI for Competitive Advantage</em></a>. BrandMultiplier, 2024. 22 pages, 27 citations. The document this addendum corrects.</li>
      <li id="n2">Accenture: over twelve months leading creative on new-business pitches, the regional win rate on deals above $10M moved from 54% to 88%, against pitches attributed with more than $1B in aggregate new revenue. These figures are internal to Accenture, self-reported, and not independently auditable; I led narrative and strategy rather than the commercial pursuit. Role verifiable via <a href="https://www.linkedin.com/in/chrisrubin">LinkedIn</a>. Directional evidence, not a finding. The 2024 paper stated this causally, as revenue "driven" by the work; that was stronger than the evidence supports, and the framing here supersedes it.</li>
      <li id="n3">Nonaka, I., &amp; Takeuchi, H. (1995). <em>The Knowledge-Creating Company.</em> Oxford University Press. Nonaka, I. (1994). A dynamic theory of organizational knowledge creation. <em>Organization Science</em> 5(1), 14–37. Snowden, D. J. (2002). Complex acts of knowing: paradox and descriptive self-awareness. <em>Journal of Knowledge Management</em> 6(2), 100–111. DOI: 10.1108/13673270210424639. Snowden was then a director of IBM's Institute for Knowledge Management and a Fellow of the Information Systems Research Unit at Warwick University. The paper sets out three heuristics, two of which appear above: "Knowledge can only be volunteered; it cannot be conscripted," and "We can always know more than we can tell, and we will always tell more than we can write down." The first clause of the second heuristic echoes Polanyi's "we can know more than we can tell" (<em>The Tacit Dimension</em>, 1966); Snowden's contribution is the second loss, from speech to text. He later restated it as "We always know more than we can say, and we will always say more than we can write down" ("Rendering Knowledge," 2008), which is the version in wider circulation and the one usually misattributed to the 2002 paper.</li>
      <li id="n4">Gartner (May 7, 2025), survey of 632 B2B buyers conducted Aug–Sep 2024, for the range and the 74% conflict finding; median group size from Gartner buyer-enablement research (Adamson et al., 2018–19). <a href="https://www.gartner.com/en/newsroom/press-releases/2025-05-07-gartner-sales-survey-finds-74-percent-of-b2b-buyer-teams-demonstrate-unhealthy-conflict-during-the-decision-process">gartner.com</a></li>
      <li id="n5">Dixon, M., &amp; McKenna, T. (2022). Stop Losing Sales to Customer Indecision. <em>Harvard Business Review</em>, June 2022. <a href="https://hbr.org/2022/06/stop-losing-sales-to-customer-indecision">hbr.org</a></li>
      <li id="n6">Dimension sources, operationalized rather than replicated by the rubric. <b>Recognition:</b> Stephens, Silbert &amp; Hasson (2010), <em>PNAS</em> 107(32), 14425–30, speaker–listener neural coupling; n=11 listeners, anticipatory coupling correlated with comprehension at r=0.75. <b>Ease:</b> Heath's Stanford pitch experiment, 63% of listeners recalled a story and 5% recalled any individual statistic; Heath &amp; Heath (2007), <em>Made to Stick</em>. <b>Novelty:</b> prediction-error and encoding literature. <b>Tension:</b> Brown, Imai, Vieider &amp; Camerer (2024), <em>Journal of Economic Literature</em> 62(2), 485–516; mean loss-aversion coefficient 1.96, 95% CI [1.82–2.10], across 607 estimates from 150 articles. Post-deployment index informed by Berger, J. (2013), <em>Contagious</em>, on resonance and social currency as drivers of sharing.</li>
      <li id="n7"><b>Two claims retired from BrandMultiplier's messaging.</b> "Stories are 22x more memorable than facts" traces to an uncited estimate rather than a study; the Heath figure above replaces it. Oxytocin-mediated trust is omitted entirely, because the foundational finding (Kosfeld et al., 2005, <em>Nature</em>) failed a well-powered registered replication (Declerck et al., 2020, <em>Nature Human Behaviour</em>). A smaller evidence base that survives scrutiny beats a larger one that does not.</li>
      <li>Full methodology evidence base: <em>The Science of Story: BrandMultiplier Research Compendium</em> v1.8. Twelve domains, 200+ studies, with citations and stated evidence tiers. Available on request.</li>
    </ol>
  </div>

  <footer>
    <div class="footrule"></div>
    <p><b>Chris Rubin</b>, Founder and CEO, BrandMultiplier &nbsp;·&nbsp; Aspen, Colorado<br>
    <a href="https://brandmultiplier.ai">brandmultiplier.ai</a> &nbsp;·&nbsp; <a href="https://www.linkedin.com/in/chrisrubin">linkedin.com/in/chrisrubin</a></p>
    <p style="margin-top:1.1rem;font-size:.75rem">Addendum to <a href="https://bit.ly/BrandMultiplier_White-Paper">The SMB Brand Playbook</a> (BrandMultiplier, 2024). StoryLock&trade;, Narrative Operating System&trade;, NOS&trade;, Voice Fidelity Gates&trade;, and Multi-Protagonist Framework&trade; are trademarks of BrandMultiplier, used in commerce and not yet registered. © 2026 BrandMultiplier.</p>
  </footer>

</main>
`;

export default function ExtractionProblemPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DOC_CSS }} />
      <div className="spc-doc" dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
    </>
  );
}
