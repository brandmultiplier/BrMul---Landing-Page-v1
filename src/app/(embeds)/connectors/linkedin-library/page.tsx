import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn Library—Serving Founders Connector Hub",
  description:
    "Curated, shareable links to the thinking behind the Narrative Operating System—organized by the client situation each piece serves.",
  robots: { index: false, follow: false },
};

export default function LinkedInLibraryPage() {
  return (
    <>
      <style>{`
  :root{
    --purple:#4940C6; --purple-d:#3a32a8; --orange:#F36901;
    --black:#000; --ink:#0A0A0A;
    --gray:#666; --lav:#F3F1FA; --lav2:#EDE8F5; --peach:#FFF4EC; --line:#E8E6E1; --white:#fff;
    --shadow-sm:0 1px 2px rgba(20,16,48,.05), 0 6px 18px rgba(20,16,48,.05);
    --shadow-md:0 2px 6px rgba(20,16,48,.06), 0 16px 40px rgba(20,16,48,.09);
    --serif:Georgia,'Times New Roman',serif;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth;scroll-padding-top:74px}
  body{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
       color:#15131c;line-height:1.55;background:var(--white);-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
  .wrap{max-width:1080px;margin:0 auto;padding:0 28px}
  a{color:var(--purple);text-decoration:none}
  h1,h2,h3{line-height:1.16;letter-spacing:-.02em;font-weight:700}

  /* top bar */
  .topbar{border-bottom:1px solid var(--line);background:rgba(255,255,255,.85);backdrop-filter:saturate(140%) blur(8px);position:sticky;top:0;z-index:20}
  .topbar .wrap{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding-top:14px;padding-bottom:14px}
  .mark{font-weight:700;letter-spacing:.2em;color:var(--purple);font-size:13.5px}
  .mark em{font-style:normal;color:var(--gray);font-weight:500;letter-spacing:.04em}
  .backlink{font-size:13.5px;color:#444}
  .backlink:hover{color:var(--purple)}

  /* header */
  .libhead{padding:64px 0 48px;background:
        radial-gradient(900px 420px at 88% -8%, rgba(73,64,198,.10), transparent 60%),
        radial-gradient(700px 360px at 6% 12%, rgba(243,105,1,.05), transparent 55%),
        linear-gradient(180deg,#fff 0%,var(--lav) 100%)}
  .libhead .kicker{font-size:12.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--purple)}
  .libhead h1{font-size:40px;font-weight:800;letter-spacing:-.025em;margin:16px 0 16px;max-width:20ch}
  .libhead p{font-size:18px;color:#2a2733;max-width:62ch}
  .libhead .pill{display:inline-block;margin-top:22px;font-size:12.5px;font-weight:600;letter-spacing:.04em;color:#5b5766;background:#fff;border:1px solid var(--line);border-radius:100px;padding:8px 16px;box-shadow:var(--shadow-sm)}

  /* sections */
  section{padding:54px 0;border-bottom:1px solid var(--line);position:relative}
  .lav{background:var(--lav)}
  .tag{font-size:12.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--purple);margin-bottom:12px;display:flex;align-items:baseline;gap:10px}
  .tag .snum{font-family:var(--serif);font-style:italic;font-weight:400;letter-spacing:0;font-size:15px;color:var(--orange);text-transform:none}
  h2.section-title{font-size:26px;font-weight:800;letter-spacing:-.025em;color:#15131c;margin-bottom:8px}
  .section-intro{font-size:16px;color:#37343f;max-width:70ch;margin-bottom:28px}

  /* article cards */
  .arts{display:grid;gap:16px}
  .art{display:flex;justify-content:space-between;align-items:center;gap:22px;background:#fff;border:1px solid rgba(20,16,48,.07);border-left:4px solid var(--purple);border-radius:0 14px 14px 0;padding:22px 26px;box-shadow:var(--shadow-sm);transition:.18s}
  .art:hover{box-shadow:var(--shadow-md);transform:translateY(-2px)}
  .art .info{flex:1 1 auto}
  .art .info h3{font-size:18px;margin-bottom:6px;color:#15131c}
  .art .info .when{font-size:14.5px;color:#444;max-width:74ch}
  .art .info .when b{color:#15131c;font-weight:600}
  .art .read{flex:0 0 auto;font-size:13px;font-weight:600;color:var(--purple);border:1px solid rgba(73,64,198,.32);border-radius:100px;padding:10px 18px;white-space:nowrap;transition:.16s}
  .art .read:hover{background:var(--purple);color:#fff}

  /* connector-only block */
  .conly{background:var(--peach);border:1px solid rgba(243,105,1,.28);border-radius:16px;padding:30px 32px;margin-top:8px}
  .conly .badge{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#5A3800;background:#fff;border:1px solid rgba(90,56,0,.22);border-radius:6px;padding:4px 10px;margin-bottom:14px}
  .conly h3{font-size:19px;margin-bottom:8px;color:#15131c}
  .conly p{font-size:15px;color:#37343f;max-width:74ch;margin-bottom:16px}
  .conly .read{display:inline-block;font-size:13px;font-weight:600;color:var(--purple);border:1px solid rgba(73,64,198,.32);border-radius:100px;padding:10px 18px;transition:.16s}
  .conly .read:hover{background:var(--purple);color:#fff}

  .usehint{font-size:13.5px;color:var(--gray);margin-top:22px;max-width:78ch}

  footer{background:#fff;padding:46px 0;border-top:3px solid var(--purple)}
  footer .wrap{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:24px}
  footer .mark{font-size:14px;margin-bottom:10px;display:block}
  footer p{font-size:13px;color:var(--gray);max-width:52ch}

  @media(max-width:820px){
    .art{flex-direction:column;align-items:flex-start;gap:14px}
    .libhead h1{font-size:31px}
  }
      `}</style>

      {/* TOP BAR */}
      <div className="topbar">
        <div className="wrap">
          <span className="mark">SERVING&nbsp;FOUNDERS &nbsp;<em>· LinkedIn Library</em></span>
          <a className="backlink" href="/connectors">&larr; Back to the Connector Hub</a>
        </div>
      </div>

      {/* HEADER */}
      <header className="libhead">
        <div className="wrap">
          <span className="kicker">The thinking behind the method</span>
          <h1>Twelve pieces. Each one mapped to a moment you&rsquo;ll recognize.</h1>
          <p>This isn&rsquo;t a reading list&mdash;it&rsquo;s a tool. Hear a signal from a client, find the matching piece below, and forward it in your own words. You never have to explain the method yourself; the writing does it. Read the first three for your own conviction; share the rest as the moment calls for it.</p>
          <span className="pill">Unlisted &middot; for you and the clients you choose to share with</span>
        </div>
      </header>

      {/* CLUSTER 1 */}
      <section>
        <div className="wrap">
          <span className="tag"><span className="snum">01</span> Start here&mdash;what the method fixes</span>
          <h2 className="section-title">The core argument.</h2>
          <p className="section-intro">If you read three things before you refer anyone, read these. They&rsquo;re the spine of everything the Narrative Operating System does.</p>
          <div className="arts">
            <div className="art">
              <div className="info">
                <h3>StoryLock</h3>
                <p className="when"><b>The anchor.</b> Why the story that built a company becomes the ceiling that limits it&mdash;and why the team can&rsquo;t sell the way the founder can. Start every Connector here.</p>
              </div>
              <a className="read" href="https://www.linkedin.com/pulse/founders-voice-trap-christopher-rubin-n5wye" target="_blank" rel="noopener">Read on LinkedIn &rarr;</a>
            </div>
            <div className="art">
              <div className="info">
                <h3>The Extraction Problem</h3>
                <p className="when"><b>The mechanism.</b> Why a founder&rsquo;s selling expertise resists every attempt to transfer it. Share with a client who says &ldquo;I just need to document what I do.&rdquo;</p>
              </div>
              <a className="read" href="https://www.linkedin.com/pulse/extraction-problem-christopher-rubin-uzr4f" target="_blank" rel="noopener">Read on LinkedIn &rarr;</a>
            </div>
            <div className="art">
              <div className="info">
                <h3>The Rise of the Narrative Operating System</h3>
                <p className="when"><b>What they&rsquo;re referring into.</b> Names and explains the NOS itself, so you can speak to the system with confidence.</p>
              </div>
              <a className="read" href="https://www.linkedin.com/pulse/rise-narrative-operating-system-christopher-rubin-okmlc" target="_blank" rel="noopener">Read on LinkedIn &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* CLUSTER 2 */}
      <section className="lav">
        <div className="wrap">
          <span className="tag"><span className="snum">02</span> Why the usual fixes fail</span>
          <h2 className="section-title">For the operator who has already tried everything.</h2>
          <p className="section-intro">These speak to what you see in your own work&mdash;the hire, the copy, the process that should have worked and didn&rsquo;t. Use them when a client has spent money on the symptom.</p>
          <div className="arts">
            <div className="art">
              <div className="info">
                <h3>Why Your Sales Playbook Doesn&rsquo;t Work</h3>
                <p className="when"><b>Signal:</b> &ldquo;We built the playbook and it still doesn&rsquo;t transfer.&rdquo; Playbooks capture <i>what</i> experts do and miss <i>why</i>. Best for fractional sales leaders and RevOps partners.</p>
              </div>
              <a className="read" href="https://www.linkedin.com/pulse/why-your-sales-playbook-doesnt-work-christopher-rubin-wsdef" target="_blank" rel="noopener">Read on LinkedIn &rarr;</a>
            </div>
            <div className="art">
              <div className="info">
                <h3>Your Agency Thinks It&rsquo;s an Agency. That&rsquo;s the Problem.</h3>
                <p className="when"><b>Signal:</b> &ldquo;We hired the agency and the message still sounds like everyone else.&rdquo; The vendor and amplifier trap&mdash;for agency and fractional-marketing partners.</p>
              </div>
              <a className="read" href="https://www.linkedin.com/pulse/your-agency-thinks-its-thats-problem-christopher-rubin-h90bc" target="_blank" rel="noopener">Read on LinkedIn &rarr;</a>
            </div>
            <div className="art">
              <div className="info">
                <h3>The AI Paradox for Founders</h3>
                <p className="when"><b>Signal:</b> &ldquo;We bought the CRM and the AI tools and the gap hasn&rsquo;t moved.&rdquo; Why execution tooling can&rsquo;t close a founder-dependency gap&mdash;and why story is the advantage AI can&rsquo;t commoditize.</p>
              </div>
              <a className="read" href="https://www.linkedin.com/pulse/ai-paradox-founders-christopher-rubin-op7wf" target="_blank" rel="noopener">Read on LinkedIn &rarr;</a>
            </div>
            <div className="art">
              <div className="info">
                <h3>The $80,000 Deck Nobody Uses</h3>
                <p className="when"><b>Signal:</b> &ldquo;We paid for the deck and nobody on the team uses it.&rdquo; The deck that sits in a drawer because the story behind it was never extracted. The sharpest hit on the strategist-versus-PowerPoint fracture.</p>
              </div>
              <a className="read" href="https://www.linkedin.com/pulse/80000-deck-nobody-uses-christopher-rubin-s4waf" target="_blank" rel="noopener">Read on LinkedIn &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* CLUSTER 3 */}
      <section>
        <div className="wrap">
          <span className="tag"><span className="snum">03</span> The B2B buying reality</span>
          <h2 className="section-title">Why a &ldquo;won&rdquo; deal still stalls.</h2>
          <p className="section-intro">Hand these to a client in the middle of a deal that should be closing and isn&rsquo;t. They reframe the stall as a narrative problem, not a sales-effort problem.</p>
          <div className="arts">
            <div className="art">
              <div className="info">
                <h3>The Committee Problem</h3>
                <p className="when"><b>When:</b> the deal has many stakeholders and no one will say yes. How to win when 11 people have to agree before anything moves.</p>
              </div>
              <a className="read" href="https://www.linkedin.com/pulse/committee-problem-christopher-rubin-z5lke" target="_blank" rel="noopener">Read on LinkedIn &rarr;</a>
            </div>
            <div className="art">
              <div className="info">
                <h3>Solving the Multi-Protagonist Problem</h3>
                <p className="when"><b>When:</b> the CTO, CFO, and procurement each need a different reason. Give them three reasons that point to the same yes&mdash;the sharpest, most recent take on the committee.</p>
              </div>
              <a className="read" href="https://www.linkedin.com/pulse/solving-multi-protagonist-problem-christopher-rubin-pxtwe" target="_blank" rel="noopener">Read on LinkedIn &rarr;</a>
            </div>
            <div className="art">
              <div className="info">
                <h3>The Stakes That Move Markets</h3>
                <p className="when"><b>When:</b> &ldquo;We love it, the ROI is clear&mdash;but we&rsquo;ll wait until Q3.&rdquo; Loss aversion, and why obvious value still doesn&rsquo;t move a buyer.</p>
              </div>
              <a className="read" href="https://www.linkedin.com/pulse/stakes-move-markets-christopher-rubin-vexse" target="_blank" rel="noopener">Read on LinkedIn &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* CLUSTER 4 */}
      <section className="lav">
        <div className="wrap">
          <span className="tag"><span className="snum">04</span> Cost, proof, and why now</span>
          <h2 className="section-title">Size the gap. Prove the return. Create urgency.</h2>
          <p className="section-intro">These pair with the tools already on your hub&mdash;the StoryLock Tax Calculator and the Narrative ROI Audit. Use them to put a number on the problem and a clock on the decision.</p>
          <div className="arts">
            <div className="art">
              <div className="info">
                <h3>The Expertise Transfer Tax</h3>
                <p className="when"><b>Pairs with the StoryLock Tax Calculator.</b> The compounding cost a founder pays every quarter the selling expertise stays locked in one head.</p>
              </div>
              <a className="read" href="https://www.linkedin.com/pulse/expertise-transfer-tax-christopher-rubin-qecpf" target="_blank" rel="noopener">Read on LinkedIn &rarr;</a>
            </div>
            <div className="art">
              <div className="info">
                <h3>The Return on Narrative</h3>
                <p className="when"><b>Pairs with the Narrative ROI Audit.</b> How to measure what matters when story drives the business&mdash;for the ROI-skeptical buyer.</p>
              </div>
              <a className="read" href="https://www.linkedin.com/pulse/return-narrative-christopher-rubin-utsme" target="_blank" rel="noopener">Read on LinkedIn &rarr;</a>
            </div>
            <div className="art">
              <div className="info">
                <h3>Narrative Surrender: AI Is Already Your Brand&rsquo;s First Storyteller</h3>
                <p className="when"><b>Signal:</b> &ldquo;Our marketing sounds like everyone else&rsquo;s.&rdquo; Wharton&rsquo;s cognitive-surrender research&mdash;buyers accept AI&rsquo;s flat version of your story and never question it.</p>
              </div>
              <a className="read" href="https://www.linkedin.com/pulse/narrative-surrender-ai-already-your-brands-first-christopher-rubin-dx6wf" target="_blank" rel="noopener">Read on LinkedIn &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* CONNECTOR ONLY */}
      <section>
        <div className="wrap">
          <span className="tag"><span className="snum">05</span> For your judgment only</span>
          <h2 className="section-title">Read it. Don&rsquo;t forward it.</h2>
          <div className="conly">
            <span className="badge">Connector reference &middot; not client-facing</span>
            <h3>Who This Isn&rsquo;t For</h3>
            <p>The disqualification piece. Read it to calibrate fit <i>before</i> you introduce a client&mdash;it&rsquo;ll save everyone a wasted call and protect the white-glove handling we promise. It names the engagements that fail, and why. Keep it for your own read, not for the client&rsquo;s inbox.</p>
            <a className="read" href="https://www.linkedin.com/pulse/who-isnt-christopher-rubin-ebclf" target="_blank" rel="noopener">Read on LinkedIn &rarr;</a>
          </div>
          <p className="usehint">One move, every time: hear a signal, pick the matching piece, forward it in your voice with a line about why it made you think of them. No pitch, no deck&mdash;just the link and the recognition. When a client wants to talk, that&rsquo;s your cue to make the warm introduction back on the hub.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div>
            <span className="mark">SERVING&nbsp;FOUNDERS</span>
            <p>Private Connector library. Built by BrandMultiplier&mdash;we install Narrative Operating Systems for founder-led B2B companies, so the team can tell the story without the founder in the room.</p>
            <p style={{ marginTop: "12px" }}>brandmultiplier.ai &middot; weservefounders.com</p>
          </div>
          <div className="links">
            <a className="backlink" href="/connectors">&larr; Back to the Connector Hub</a>
          </div>
        </div>
      </footer>
    </>
  );
}
