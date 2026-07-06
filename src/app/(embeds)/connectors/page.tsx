import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connector Hub—Serving Founders",
  description:
    "Private hub for inducted Serving Founders Connectors: the one move, the signal bank, your client-ready assets, and how the Narrative Operating System works.",
  robots: { index: false, follow: false },
};

export default function ConnectorsPage() {
  return (
    <>
      <style>{`
  :root{
    --purple:#4940C6; --purple-d:#3a32a8; --orange:#F36901;
    --black:#000; --ink:#0A0A0A; --ink2:#16161f;
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
  .serif{font-family:var(--serif)}

  .btn{display:inline-block;background:var(--purple);color:#fff;font-weight:600;font-size:15.5px;letter-spacing:.01em;
       padding:14px 30px;border-radius:100px;border:1px solid var(--purple);box-shadow:0 8px 22px rgba(73,64,198,.26);transition:.18s ease}
  .btn:hover{background:var(--purple-d);border-color:var(--purple-d);box-shadow:0 12px 30px rgba(73,64,198,.42);transform:translateY(-1px)}

  section{padding:70px 0;border-bottom:1px solid var(--line);position:relative}
  .lav{background:var(--lav)}
  .tag{font-size:12.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--purple);margin-bottom:16px;display:flex;align-items:baseline;gap:10px}
  .tag .snum{font-family:var(--serif);font-style:italic;font-weight:400;letter-spacing:0;font-size:15px;color:var(--orange);text-transform:none}
  h2.section-title{font-size:31px;font-weight:800;letter-spacing:-.025em;color:#15131c;margin-bottom:12px}
  .section-intro{font-size:17.5px;color:#37343f;max-width:66ch;margin-bottom:34px}

  /* top bar */
  .topbar{border-bottom:1px solid var(--line);background:rgba(255,255,255,.85);backdrop-filter:saturate(140%) blur(8px);position:sticky;top:0;z-index:20}
  .topbar .wrap{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding-top:14px;padding-bottom:14px}
  .mark{font-weight:700;letter-spacing:.2em;color:var(--purple);font-size:13.5px}
  .mark em{font-style:normal;color:var(--gray);font-weight:500;letter-spacing:.04em}
  .navlinks a{font-size:13.5px;color:#444;margin-left:20px}
  .navlinks a:hover{color:var(--purple)}

  /* hub header */
  .hubhead{padding:70px 0 60px;background:
        radial-gradient(900px 420px at 88% -8%, rgba(73,64,198,.10), transparent 60%),
        radial-gradient(700px 360px at 6% 12%, rgba(243,105,1,.05), transparent 55%),
        linear-gradient(180deg,#fff 0%,var(--lav) 100%)}
  .hubhead .kicker{font-size:12.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--purple)}
  .hubhead h1{font-size:44px;font-weight:800;letter-spacing:-.025em;margin:16px 0 18px;max-width:18ch}
  .hubhead p{font-size:19px;color:#2a2733;max-width:58ch}
  .hubhead .pill{display:inline-block;margin-top:22px;font-size:12.5px;font-weight:600;letter-spacing:.04em;color:#5b5766;background:#fff;border:1px solid var(--line);border-radius:100px;padding:8px 16px;box-shadow:var(--shadow-sm)}
  .toc{display:flex;gap:10px 22px;flex-wrap:wrap;margin-top:30px}
  .toc a{font-size:14px;font-weight:600;color:var(--purple)}
  .toc a:hover{color:var(--orange)}

  /* grids + cards */
  .grid{display:grid;gap:20px}
  .g2{grid-template-columns:repeat(2,1fr)}
  .g3{grid-template-columns:repeat(3,1fr)}
  .card{background:#fff;border:1px solid rgba(20,16,48,.07);border-radius:14px;padding:26px;box-shadow:var(--shadow-sm)}
  .card h3{font-size:18px;margin-bottom:8px;color:#15131c}
  .card p{font-size:15px;color:#444}

  /* steps */
  .steps{display:grid;gap:18px;margin-bottom:30px}
  .step{display:flex;gap:18px;align-items:flex-start}
  .step .n{flex:0 0 auto;width:38px;height:38px;border-radius:50%;background:var(--purple);color:#fff;font-weight:700;display:flex;align-items:center;justify-content:center;font-size:15px;box-shadow:0 6px 16px rgba(73,64,198,.3)}
  .step h3{font-size:18px;margin-bottom:4px}
  .step p{font-size:15px;color:#444;max-width:64ch}

  /* intro template */
  .template{background:#fff;border:1px solid rgba(20,16,48,.07);border-left:4px solid var(--purple);border-radius:0 14px 14px 0;padding:28px 30px;font-size:15px;box-shadow:var(--shadow-sm)}
  .template .line{margin-bottom:12px;color:#2a2733}
  .template .field{color:var(--purple);font-weight:600}
  .tplnote{margin-top:16px;font-size:13.5px;color:var(--gray);line-height:1.55;max-width:74ch}
  .tplnote .tnlabel{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--purple);background:var(--lav);border:1px solid rgba(73,64,198,.18);border-radius:6px;padding:3px 9px;margin-right:10px}
  .howto{margin:0 0 28px;padding-left:0;list-style:none}
  .howto li{position:relative;padding-left:24px;margin-bottom:10px;font-size:15px;color:#37343f;max-width:74ch}
  .howto li::before{content:"";position:absolute;left:0;top:8px;width:8px;height:8px;border-radius:2px;background:var(--orange)}
  .howto li b{color:#15131c}
  .flowsplit{background:var(--lav);border-radius:12px;padding:20px 22px;margin-top:8px;font-size:14.5px;color:#37343f}
  .flowsplit b{color:var(--purple)}

  /* signal cards */
  .sig{background:#fff;border:1px solid rgba(20,16,48,.07);border-left:4px solid var(--purple);border-radius:0 14px 14px 0;padding:22px 24px;box-shadow:var(--shadow-sm)}
  .sig .hear{font-family:var(--serif);font-style:italic;font-size:17px;color:#15131c;margin-bottom:10px;line-height:1.4}
  .sig .read{font-size:14.5px;color:#444}

  /* resources / downloads */
  .res{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
  .rescard{display:flex;justify-content:space-between;align-items:center;gap:18px;background:#fff;border:1px solid rgba(20,16,48,.07);border-radius:14px;padding:22px 24px;box-shadow:var(--shadow-sm);transition:.18s}
  .rescard:hover{box-shadow:var(--shadow-md);transform:translateY(-2px)}
  .rescard .rinfo h3{font-size:16px;margin-bottom:4px;color:#15131c}
  .rescard .rinfo p{font-size:13.5px;color:#555}
  .rescard .dl{flex:0 0 auto;font-size:13px;font-weight:600;color:var(--purple);border:1px solid rgba(73,64,198,.32);border-radius:100px;padding:9px 17px;white-space:nowrap;transition:.16s}
  .rescard .dl:hover{background:var(--purple);color:#fff}
  .reshint{font-size:13px;color:var(--gray);margin-top:18px}

  /* ===== DARK NOS SECTION ===== */
  .nos{background:
       radial-gradient(800px 380px at 84% -6%, rgba(73,64,198,.28), transparent 60%),
       radial-gradient(620px 320px at 4% 108%, rgba(243,105,1,.12), transparent 60%),
       var(--ink);color:#e9e8ef;border-bottom:none}
  .nos .tag{color:#b9b4ff}
  .nos .tag .snum{color:var(--orange)}
  .nos h2{font-size:33px;font-weight:800;letter-spacing:-.025em;color:#fff;margin-bottom:14px;max-width:22ch}
  .nos .lede{font-size:18px;color:#c7c5d4;max-width:64ch;margin-bottom:10px}
  .nos .prov{font-size:12.5px;letter-spacing:.04em;color:#8d8aa6;margin-bottom:30px;text-transform:uppercase;font-weight:500}
  .nos .prov b{color:#cfcdff;font-weight:600}
  .postcode{font-family:var(--serif);font-style:italic;font-size:20px;color:#fff;border-left:3px solid var(--orange);padding:6px 0 6px 20px;margin:24px 0 36px;max-width:54ch}
  .noscols{display:grid;grid-template-columns:1.15fr .85fr;gap:44px;align-items:start}
  .operate{display:flex;gap:14px;align-items:baseline;background:linear-gradient(90deg,rgba(243,105,1,.16),rgba(243,105,1,.04));
           border:1px solid rgba(243,105,1,.35);border-radius:12px;padding:12px 18px;margin-bottom:12px}
  .operate .olabel{font-size:12px;font-weight:700;letter-spacing:.18em;color:#ffb070;flex:0 0 auto}
  .operate .od{font-size:13px;color:#d8d6e6}
  .stack{display:flex;flex-direction:column;gap:9px}
  .layer{display:flex;align-items:center;gap:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:15px 18px}
  .layer .lnum{font-family:var(--serif);font-size:18px;color:#a9a4ff;flex:0 0 auto;width:30px;text-align:center}
  .layer .ltxt b{display:block;font-size:15px;color:#fff;font-weight:600;letter-spacing:-.01em}
  .layer .ltxt span{display:block;font-size:13px;color:#b3b1c6;margin-top:3px;line-height:1.45}
  .layer.base{background:linear-gradient(90deg,rgba(73,64,198,.5),rgba(73,64,198,.22));border-color:rgba(123,114,255,.55);box-shadow:0 0 36px rgba(73,64,198,.3)}
  .layer.base .lnum{color:var(--orange)}
  .layer.base .ltxt span{color:#d8d6f3}
  .nosright h3{font-size:16px;color:#fff;margin-bottom:18px}
  .pillars{display:flex;flex-direction:column;gap:18px;margin-bottom:26px}
  .pillar{padding-left:16px;border-left:2px solid rgba(123,114,255,.5)}
  .pillar b{display:block;font-size:14.5px;color:#fff;font-weight:600;margin-bottom:3px}
  .pillar span{font-size:13.5px;color:#b3b1c6;line-height:1.5}
  .methodnote{font-size:14px;color:#c7c5d4;font-style:italic;font-family:var(--serif)}
  .flow{margin-top:46px;border-top:1px solid rgba(255,255,255,.12);padding-top:32px;display:flex;gap:40px;flex-wrap:wrap}
  .pgroup{flex:1 1 auto}
  .pglabel{display:block;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#9b97c4;margin-bottom:14px}
  .pglabel em{font-style:normal;color:var(--orange);font-weight:600}
  .steps2{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  .pstep{font-size:13.5px;font-weight:600;letter-spacing:.02em;color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.18);border-radius:100px;padding:9px 18px}
  .pstep.tune{background:rgba(243,105,1,.16);border-color:rgba(243,105,1,.5);color:#ffcaa0}
  .arr{color:#6f6c8c;font-size:14px}
  .flowcap{margin-top:26px;font-family:var(--serif);font-style:italic;font-size:16px;color:#e9e8ef}
  .archlink{color:#fff;font-weight:600;border-bottom:1px solid rgba(255,255,255,.35);padding-bottom:2px;transition:.16s}
  .archlink:hover{color:#ffd2ad;border-color:var(--orange)}

  /* ladder */
  .ladder{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
  .tier{background:#fff;border:1px solid rgba(20,16,48,.07);border-radius:14px;padding:24px;box-shadow:var(--shadow-sm);position:relative;overflow:hidden}
  .tier::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--purple),var(--orange))}
  .tier .name{font-weight:700;color:var(--purple);font-size:16px;letter-spacing:-.01em}
  .tier .price{font-size:13.5px;color:var(--gray);margin:6px 0 12px}
  .tier p{font-size:14px;color:#444}

  /* paid / support */
  .paid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px}
  .paidcard{background:#fff;border:1px solid rgba(20,16,48,.07);border-radius:16px;padding:30px 32px;box-shadow:var(--shadow-sm)}
  .paidcard h3{font-size:18px;margin-bottom:12px;color:var(--purple)}
  .paidcard ul{list-style:none}
  .paidcard li{position:relative;padding-left:22px;margin-bottom:11px;font-size:15px;color:#37343f}
  .paidcard li::before{content:"";position:absolute;left:0;top:8px;width:7px;height:7px;border-radius:50%;background:var(--orange)}
  .paidcard li b{color:#15131c}

  footer{background:#fff;padding:50px 0;border-top:3px solid var(--purple)}
  footer .wrap{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:24px}
  footer .mark{font-size:14px;margin-bottom:10px;display:block}
  footer p{font-size:13px;color:var(--gray);max-width:48ch}
  footer .links a{font-size:14px;color:#444;display:block;margin-bottom:7px}
  footer .links a:hover{color:var(--purple)}

  @media(max-width:860px){.noscols{grid-template-columns:1fr;gap:34px}}
  @media(max-width:820px){
    .g2,.g3,.res,.paid,.ladder{grid-template-columns:1fr}
    .hubhead h1{font-size:34px}
    .nos h2{font-size:27px}
    .ladder{grid-template-columns:repeat(2,1fr)}
    .navlinks{display:none}
  }
      `}</style>

      {/* TOP BAR */}
      <div className="topbar">
        <div className="wrap">
          <span className="mark">SERVING&nbsp;FOUNDERS &nbsp;<em>· Connector Hub</em></span>
          <span className="navlinks">
            <a href="#move">The one move</a>
            <a href="#signals">Signals</a>
            <a href="#assets">Assets</a>
            <a href="#nos">The NOS</a>
          </span>
        </div>
      </div>

      {/* HUB HEADER */}
      <header className="hubhead">
        <div className="wrap">
          <span className="kicker">Private hub for inducted Connectors</span>
          <h1>Welcome. Everything you need to refer effortlessly is here.</h1>
          <p>You&rsquo;re in. This is your kit: the one move to make, the signals to listen for, the assets to hand your clients, and how the system works under the hood. <b>Bookmark it.</b></p>
          <span className="pill">This is your private space, Connectors only. Not for forwarding.</span>
          <div className="toc">
            <a href="#move">The one move &rarr;</a>
            <a href="#signals">The signal bank &rarr;</a>
            <a href="#assets">Your assets &rarr;</a>
            <a href="#nos">How the NOS works &rarr;</a>
            <a href="#paid">How you&rsquo;re paid &rarr;</a>
          </div>
        </div>
      </header>

      {/* THE ONE MOVE */}
      <section id="move">
        <div className="wrap">
          <span className="tag"><span className="snum">01</span> The one move</span>
          <h2 className="section-title">One warm introduction. We take it from there.</h2>
          <p className="section-intro">When you spot a signal, you don&rsquo;t sell anything. You send a short, warm introduction to your client and copy us. No booking link, no forwarded deck, just the intro. We reply, we book the call, and your client gets white-glove handling from the first touch.</p>
          <div className="steps">
            <div className="step"><div className="n">1</div><div><h3>Recognize the signal</h3><p>A client says one of the six lines below. You don&rsquo;t pitch. You just know it&rsquo;s a fit.</p></div></div>
            <div className="step"><div className="n">2</div><div><h3>Introduce us, CC&rsquo;d</h3><p>Send the template below to one client and CC chris@brandmultiplier.ai and sapir@brandmultiplier.ai. No booking link.</p></div></div>
            <div className="step"><div className="n">3</div><div><h3>We take it from there</h3><p>We reply within one business day, handle scheduling, and keep you looped the whole way.</p></div></div>
          </div>

          <ul className="howto">
            <li><b>Send it to one client at a time</b>&mdash;not a list. One name keeps it warm.</li>
            <li><b>Keep it in your voice.</b> Two or three sentences. Use the signal you actually heard.</li>
            <li><b>Don&rsquo;t forward our deck or attach assets.</b> The introduction is the whole job. We bring the rest.</li>
          </ul>

          <div className="template">
            <div className="line"><b>Subject:</b> Quick intro&mdash;<span className="field">[Client first name]</span> x <span className="field">[Your name]</span></div>
            <div className="line"><span className="field">[Client first name]</span>,</div>
            <div className="line">You mentioned <span className="field">[the specific thing you heard]</span>. I keep running into that same pattern, and there&rsquo;s one team I trust on exactly this: BrandMultiplier. They get a founder-led company&rsquo;s story out of the founder&rsquo;s head and built into something the whole team can sell, without <span className="field">[him / her / you]</span> in every room.</div>
            <div className="line">I&rsquo;ve CC&rsquo;d <span className="field">[Chris / Sapir]</span>. I&rsquo;ll let you two take it from here. No pitch, no obligation, just worth a conversation.</div>
            <div className="line"><span className="field">[Your name]</span></div>
          </div>
          <p className="tplnote"><span className="tnlabel" style={{ display: "block", marginBottom: "10px" }}>Why no booking link?</span>Two flows, never crossed. Your client intro is a warm email with us CC&rsquo;d and <b>no booking link</b>&mdash;we reply and schedule, which keeps the first touch warm and lets you watch it move. The booking link is only ever for partners qualifying themselves into the program.</p>
        </div>
      </section>

      {/* SIGNAL BANK */}
      <section id="signals" className="lav">
        <div className="wrap">
          <span className="tag"><span className="snum">02</span> The signal bank</span>
          <h2 className="section-title">Six things a client says right before this becomes their problem.</h2>
          <p className="section-intro">Your cue to make the introduction. Recognize one line and you&rsquo;ve found a fit. You don&rsquo;t have to diagnose the mechanism or pitch the fix.</p>
          <div className="grid g2">
            <div className="sig">
              <div className="hear">&ldquo;We can&rsquo;t close without the founder. Every real deal still runs through one person.&rdquo;</div>
              <p className="read">The selling logic never left the founder&rsquo;s head, so the motion won&rsquo;t transfer. Fractional sales leader Louie Bernstein: <i>&ldquo;extract the genius from your head and build a repeatable sales playbook&rdquo;</i> (LinkedIn, June 2026).</p>
            </div>
            <div className="sig">
              <div className="hear">&ldquo;Our marketing sounds like everyone else&rsquo;s&mdash;even after we rewrote it.&rdquo;</div>
              <p className="read">Sharper copy doesn&rsquo;t invent differentiation. It makes the absence of it impossible to miss. The thing that sets them apart is real. It&rsquo;s just locked in the founder, not on the page.</p>
            </div>
            <div className="sig">
              <div className="hear">&ldquo;The plan&rsquo;s right. It&rsquo;s just been sitting in the founder&rsquo;s inbox for two weeks.&rdquo;</div>
              <p className="read">Not a scheduling problem. A founder can&rsquo;t sign off on a story they&rsquo;ve never been able to say out loud. The work stalls on a floor no one laid.</p>
            </div>
            <div className="sig">
              <div className="hear">&ldquo;We hired the VP, bought the CRM, ran the process&mdash;and nothing moved.&rdquo;</div>
              <p className="read">You can&rsquo;t amplify a sound the source never made. Fractional executive Austin Gilbert: <i>&ldquo;adding more people to a broken structure scales the chaos&rdquo;</i> (LinkedIn, May 2026). The foundation is missing, not the headcount.</p>
            </div>
            <div className="sig">
              <div className="hear">&ldquo;The founder is the bottleneck. Everything works until they leave the room.&rdquo;</div>
              <p className="read">Founder-dependency is structural, not a character flaw. It has a method, not a magic wand. Strategy consultant Jason Branin: <i>&ldquo;everything works, until someone leaves&rdquo;</i> (LinkedIn, June 2026).</p>
            </div>
            <div className="sig">
              <div className="hear">&ldquo;A buyer will pay less because the business runs through one person.&rdquo;</div>
              <p className="read">M&amp;A advisor Khaled Azar: <i>&ldquo;buyers do not want to buy a company that walks out the door with the founder&hellip; buyers pay more for transferable companies&rdquo;</i> (LinkedIn, June 2026). Use this one for PE, M&amp;A, and exit-readiness clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ASSETS / DOWNLOADS */}
      <section id="assets">
        <div className="wrap">
          <span className="tag"><span className="snum">03</span> Your assets</span>
          <h2 className="section-title">Client-ready, whenever you need them.</h2>
          <p className="section-intro">Hand these to a client when it helps, or keep them for your own reference. You never have to explain the work yourself; the assets do it.</p>
          <div className="res">
            <div className="rescard">
              <div className="rinfo"><h3>The NOS one-pager</h3><p>The hand-this-to-your-client overview of what we do.</p></div>
              <a className="dl" href="https://drive.google.com/uc?export=download&id=1Cu9CIx--GZlg7Y2R26Lq5Tltb8kcYP3Q" target="_blank" rel="noopener" data-asset="nos-one-pager">Download</a>
            </div>
            <div className="rescard">
              <div className="rinfo"><h3>Narrative ROI Audit</h3><p>A five-dimension diagnostic your client can run themselves.</p></div>
              <a className="dl" href="https://drive.google.com/uc?export=download&id=1VtOy_Fkv6JAc3ix3nBuhwjcTegAhzg56" target="_blank" rel="noopener" data-asset="narrative-roi-audit">Download</a>
            </div>
            <div className="rescard">
              <div className="rinfo"><h3>Case studies</h3><p>BetterCloud, Apto, and more&mdash;proof, not promises.</p></div>
              <a className="dl" href="https://drive.google.com/uc?export=download&id=1SUV9jds-ceav1kx7iBsQ3gNptEcDiAoT" target="_blank" rel="noopener" data-asset="case-studies">Download</a>
            </div>
            <div className="rescard">
              <div className="rinfo"><h3>Sample StoryLock deliverable</h3><p>Early-stage output, from just after the Rumble.</p></div>
              <a className="dl" href="https://drive.google.com/uc?export=download&id=1iiAjVtPIMywkG0Vy97qriiZhhdp9wkhL" target="_blank" rel="noopener" data-asset="sample-storylock">Download</a>
            </div>
            <div className="rescard">
              <div className="rinfo"><h3>StoryLock Tax Calculator</h3><p>A free tool your client can use to size the cost of the gap.</p></div>
              <a className="dl" href="https://www.brandmultiplier.ai/storylock-tax" target="_blank" rel="noopener" data-asset="storylock-calculator">Open tool</a>
            </div>
            <div className="rescard">
              <div className="rinfo"><h3>LinkedIn article library</h3><p>Shareable links to the thinking behind the method.</p></div>
              <a className="dl" href="/connectors/linkedin-library" data-asset="linkedin-library">View links</a>
            </div>
          </div>
        </div>
      </section>

      {/* THE NARRATIVE OPERATING SYSTEM (dark, full) */}
      <section className="nos" id="nos">
        <div className="wrap">
          <span className="tag"><span className="snum">04</span> How the NOS works</span>
          <h2>It isn&rsquo;t a project. It&rsquo;s an operating system.</h2>
          <p className="lede">So you can speak to it with confidence: the Narrative Operating System extracts a founder&rsquo;s story once and installs it as infrastructure the whole company runs on, so the story keeps selling whether the founder is in the room or not.</p>
          <p className="prov"><b>In development since 2023</b> &nbsp;&middot;&nbsp; grounded in cognitive science &nbsp;&middot;&nbsp; <b>38+ peer-reviewed studies</b> &nbsp;&middot;&nbsp; built for founder-led B2B, not the Fortune 500</p>

          <p className="postcode">As AI commoditizes execution, story becomes the last defensible advantage.</p>

          <div className="noscols">
            <div className="nosleft">
              <div className="operate">
                <span className="olabel">OPERATE</span>
                <span className="od">The post-install layer. We run &amp; tune every layer below on an ongoing cadence, so the system compounds instead of decaying.</span>
              </div>
              <div className="stack">
                <div className="layer">
                  <span className="lnum">04</span>
                  <div className="ltxt"><b>Control &middot; Interface</b><span>Where their team steers it, inside the Slack, Notion, email, and CRM they already use.</span></div>
                </div>
                <div className="layer">
                  <span className="lnum">03</span>
                  <div className="ltxt"><b>Coordination &middot; Orchestration</b><span>Routes the work, enforces their rules, and gates quality before anything ships.</span></div>
                </div>
                <div className="layer">
                  <span className="lnum">02</span>
                  <div className="ltxt"><b>Production &middot; Execution</b><span>AI-amplified production across five workstreams, on-brand from the first draft.</span></div>
                </div>
                <div className="layer base">
                  <span className="lnum">01</span>
                  <div className="ltxt"><b>Foundation &middot; Encoded Brand Code</b><span>Their story, extracted and encoded as the one source everything else runs on.</span></div>
                </div>
              </div>
            </div>

            <div className="nosright">
              <h3>What the category still skips</h3>
              <div className="pillars">
                <div className="pillar"><b>Grounded in cognitive science</b><span>A model of how attention, memory, and decision actually work, backed by 38+ peer-reviewed studies. Not a content calendar.</span></div>
                <div className="pillar"><b>Built for B2B&rsquo;s real complexity</b><span>Every deal has many stakeholders, each needing their own arc. The buying committee is first-class, not an afterthought.</span></div>
                <div className="pillar"><b>A methodology, not a template</b><span>We extract their story through a proprietary process. Most tools hand them a blank form. We don&rsquo;t.</span></div>
              </div>
              <p className="methodnote">Human-delivered, AI-amplified. The client stays in the driver&rsquo;s seat; the system carries the load.</p>
            </div>
          </div>

          <div className="flow">
            <div className="pgroup">
              <span className="pglabel">Phase 1 &middot; Installation <em>&middot; 75 days</em></span>
              <div className="steps2">
                <span className="pstep">Unlock</span><span className="arr">&rarr;</span>
                <span className="pstep">Rumble</span><span className="arr">&rarr;</span>
                <span className="pstep">Architect</span><span className="arr">&rarr;</span>
                <span className="pstep">Install</span>
              </div>
              <p className="flowcap">The team that builds it is the team that runs it.</p>
            </div>
            <div className="pgroup">
              <span className="pglabel">Phase 2 &middot; Operate <em>&middot; ongoing</em></span>
              <div className="steps2">
                <span className="pstep tune">Tune</span>
              </div>
              <p className="flowcap">Explore the full architecture <a className="archlink" href="https://www.brandmultiplier.ai/NOS-architecture">here</a>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ENTRY POINTS */}
      <section>
        <div className="wrap">
          <span className="tag"><span className="snum">05</span> Where a client can start</span>
          <h2 className="section-title">What you&rsquo;re referring into.</h2>
          <p className="section-intro">Every engagement opens with the Rumble. Pilots run 75 days, with an outcomes-based continuation built in. Knowing the range helps you gauge fit; the numbers are for your context, not for the intro email.</p>
          <div className="ladder">
            <div className="tier"><div className="name">StoryLock Diagnostic</div><div className="price">$5K &middot; 14 days</div><p>A fast read on where the story is trapped and what it&rsquo;s costing. The lowest-risk first step.</p></div>
            <div className="tier"><div className="name">Foundation</div><div className="price">$7.5K / mo &middot; 75-day pilot</div><p>Core story extraction and codification for a single motion.</p></div>
            <div className="tier"><div className="name">Signature</div><div className="price">$12.5K&ndash;$15K / mo</div><p>The full system, deployed across multiple stakeholders.</p></div>
            <div className="tier"><div className="name">Transformation</div><div className="price">Custom</div><p>Enterprise-grade install with comprehensive team enablement.</p></div>
          </div>
        </div>
      </section>

      {/* HOW YOU'RE PAID / SUPPORTED */}
      <section id="paid" className="lav">
        <div className="wrap">
          <span className="tag"><span className="snum">06</span> How you&rsquo;re paid &amp; supported</span>
          <h2 className="section-title">The terms we covered on your call, in one place.</h2>
          <div className="paid">
            <div className="paidcard">
              <h3>How you&rsquo;re paid</h3>
              <ul>
                <li><b>10% of the first engagement value</b>, on the work that closes from your introduction.</li>
                <li><b>Paid quarterly</b>, as we collect.</li>
                <li><b>First engagement only</b>&mdash;renewals aren&rsquo;t commissionable, so the math stays simple.</li>
                <li>It&rsquo;s yours on <b>every client you send who signs.</b></li>
              </ul>
            </div>
            <div className="paidcard">
              <h3>How you&rsquo;re supported</h3>
              <ul>
                <li><b>White-glove for your client</b> from the first touch&mdash;their name and yours both on it.</li>
                <li><b>You stay looped</b> on anyone you introduce, and we close the loop with you when they sign.</li>
                <li><b>We never cold-pitch your client.</b> The intro stays warm; we earn the next step.</li>
                <li>Questions, edge cases, a client who doesn&rsquo;t fit the mold? Reply to any note from us.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div>
            <span className="mark">SERVING&nbsp;FOUNDERS</span>
            <p>Private Connector hub. Built by BrandMultiplier&mdash;we install Narrative Operating Systems for founder-led B2B companies, so the team can tell the story without the founder in the room.</p>
            <p style={{ marginTop: "12px" }}><a href="https://www.brandmultiplier.ai">brandmultiplier.ai</a> &middot; <a href="https://weservefounders.com">weservefounders.com</a></p>
          </div>
          <div className="links">
            <a href="#move">The one move</a>
            <a href="#signals">The signal bank</a>
            <a href="#assets">Your assets</a>
            <a href="https://www.brandmultiplier.ai/NOS-architecture">Full NOS architecture</a>
          </div>
        </div>
      </footer>
    </>
  );
}
