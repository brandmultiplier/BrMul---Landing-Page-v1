import type { Metadata } from "next";
import SignupForm from "./SignupForm";

// TODO: confirm a real 1200×630 share image exists at weservefounders.com/share.png
// before launch — social previews will show a broken image if it doesn't.
export const metadata: Metadata = {
  title: "Serving Founders—for the operators who sit closest to founder-led companies",
  description:
    "A community for the fractional execs, operating partners, and advisors who sit beside founder-led B2B companies when the story stops scaling. Serve the same founders we do.",
  openGraph: {
    title: "Serving Founders—for operators who serve founder-led companies",
    description:
      "The wall you keep hitting was never yours to fix. Join the community of operators who serve the same founders we do.",
    url: "https://weservefounders.com",
    images: ["https://weservefounders.com/share.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serving Founders",
    description:
      "The wall you keep hitting was never yours to fix. A community for operators who serve founder-led companies.",
  },
};

export default function ServingFoundersPage() {
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
  .eyebrow{font-size:12.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--purple)}
  .serif{font-family:var(--serif)}

  .btn{display:inline-block;background:var(--purple);color:#fff;font-weight:600;font-size:15.5px;letter-spacing:.01em;
       padding:15px 32px;border-radius:100px;border:1px solid var(--purple);
       box-shadow:0 8px 22px rgba(73,64,198,.26);transition:.18s ease}
  .btn:hover{background:var(--purple-d);border-color:var(--purple-d);box-shadow:0 12px 30px rgba(73,64,198,.42);transform:translateY(-1px)}
  .btn.light{background:#fff;color:var(--purple);border-color:#fff;box-shadow:0 8px 26px rgba(0,0,0,.18)}
  .btn.light:hover{background:var(--peach);transform:translateY(-1px)}

  section{padding:74px 0;border-bottom:1px solid var(--line);position:relative}
  .lav{background:var(--lav)}
  .tag{font-size:12.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--purple);margin-bottom:16px;display:flex;align-items:baseline;gap:10px}
  .tag .snum{font-family:var(--serif);font-style:italic;font-weight:400;letter-spacing:0;font-size:15px;color:var(--orange);text-transform:none}

  /* top bar */
  .topbar{border-bottom:1px solid var(--line);background:rgba(255,255,255,.85);backdrop-filter:saturate(140%) blur(8px);position:sticky;top:0;z-index:20}
  .topbar .wrap{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding-top:14px;padding-bottom:14px}
  .mark{font-weight:700;letter-spacing:.2em;color:var(--purple);font-size:13.5px}
  .topbar .btn{padding:10px 22px;font-size:13.5px}

  /* hero */
  .hero{padding:92px 0 84px;background:
        radial-gradient(900px 420px at 88% -8%, rgba(73,64,198,.10), transparent 60%),
        radial-gradient(700px 360px at 6% 12%, rgba(243,105,1,.05), transparent 55%),
        linear-gradient(180deg,#fff 0%,var(--lav) 100%)}
  .hero h1{font-size:50px;font-weight:800;letter-spacing:-.025em;margin:18px 0 22px;max-width:17ch}
  .hero .lede{font-size:20px;color:#2a2733;max-width:60ch;margin-bottom:16px;font-weight:400}
  .hero .sub{font-family:var(--serif);font-style:italic;font-size:20px;color:#5b5766;margin-bottom:34px;max-width:60ch}
  .doctrine{border-left:4px solid var(--purple);background:var(--peach);padding:20px 26px;border-radius:0 10px 10px 0;
            font-family:var(--serif);font-style:italic;font-size:21px;color:#1a1822;max-width:62ch;margin-top:40px;box-shadow:var(--shadow-sm)}
  .cta-row{display:flex;gap:18px;align-items:center;flex-wrap:wrap}
  .cta-note{font-size:14px;color:var(--gray)}

  h2.section-title{font-size:33px;font-weight:800;letter-spacing:-.025em;color:#15131c;margin-bottom:12px}
  .section-intro{font-size:18px;color:#37343f;max-width:66ch;margin-bottom:36px}

  /* grids + cards */
  .grid{display:grid;gap:20px}
  .g2{grid-template-columns:repeat(2,1fr)}
  .g3{grid-template-columns:repeat(3,1fr)}
  .card{background:#fff;border:1px solid rgba(20,16,48,.07);border-radius:14px;padding:26px;box-shadow:var(--shadow-sm);transition:.18s ease}
  .card:hover{box-shadow:var(--shadow-md);transform:translateY(-2px)}
  .card h3{font-size:18px;margin-bottom:8px;color:#15131c}
  .card p{font-size:15px;color:#444}
  .card .when{font-size:12.5px;color:var(--purple);font-weight:600;margin-top:14px;letter-spacing:.01em}

  /* signal cards */
  .sig{background:#fff;border:1px solid rgba(20,16,48,.07);border-left:4px solid var(--purple);border-radius:0 14px 14px 0;padding:24px 26px;box-shadow:var(--shadow-sm);transition:.18s ease}
  .sig:hover{box-shadow:var(--shadow-md);transform:translateY(-2px)}
  .sig .hear{font-family:var(--serif);font-style:italic;font-size:17.5px;color:#15131c;margin-bottom:12px;line-height:1.4}
  .sig .read{font-size:15px;color:#444}

  /* proof strip */
  .proof{padding:34px 0;background:#fff}
  .proof .wrap{display:grid;grid-template-columns:auto 1fr 1fr;align-items:center;gap:0 40px}
  .proof .plabel{font-size:12.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--purple);line-height:1.5}
  .proof .pitem{font-size:15px;color:#2a2733;padding-left:40px;border-left:1px solid var(--line)}
  .proof .pitem b{color:#15131c}
  @media(max-width:760px){
    .proof .wrap{grid-template-columns:1fr;gap:18px}
    .proof .pitem{padding-left:0;border-left:none;border-top:1px solid var(--line);padding-top:16px}
  }

  /* slim dark NOS teaser */
  .nos{background:
       radial-gradient(800px 360px at 84% -10%, rgba(73,64,198,.30), transparent 60%),
       radial-gradient(560px 300px at 2% 112%, rgba(243,105,1,.12), transparent 60%),
       var(--ink);color:#e9e8ef;border-bottom:none;padding:64px 0}
  .nos .tag{color:#b9b4ff}
  .nos .tag .snum{color:var(--orange)}
  .nos h2{font-size:34px;font-weight:800;letter-spacing:-.025em;color:#fff;margin-bottom:14px;max-width:20ch}
  .nos .lede{font-size:18.5px;color:#c7c5d4;max-width:62ch;margin-bottom:8px}
  .postcode{font-family:var(--serif);font-style:italic;font-size:21px;color:#fff;border-left:3px solid var(--orange);padding:6px 0 6px 20px;margin:24px 0 22px;max-width:54ch}
  .nos .prov{font-size:12.5px;letter-spacing:.05em;color:#9b98b6;text-transform:uppercase;font-weight:500;margin-bottom:26px}
  .nos .prov b{color:#cfcdff;font-weight:600}
  .archlink{display:inline-block;color:#fff;font-weight:600;font-size:15px;border-bottom:1px solid rgba(255,255,255,.35);padding-bottom:3px;transition:.16s}
  .archlink:hover{color:#ffd2ad;border-color:var(--orange)}

  /* referral (strong secondary) */
  .referral{background:var(--peach)}
  .referral .rgrid{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:start}
  .referral h2{font-size:30px;font-weight:800;letter-spacing:-.02em;color:var(--purple);margin-bottom:14px}
  .referral p{font-size:17px;color:#2a2733;margin-bottom:12px;max-width:60ch}
  .referral .reframe{font-family:var(--serif);font-style:italic;font-size:19px;color:#15131c;margin:16px 0 18px;border-left:3px solid var(--orange);padding-left:18px}
  .rcard{background:#fff;border:1px solid rgba(20,16,48,.07);border-radius:16px;padding:28px 30px;box-shadow:var(--shadow-md)}
  .rcard h3{font-size:17px;color:#15131c;margin-bottom:16px}
  .rstep{display:flex;gap:14px;align-items:flex-start;margin-bottom:16px}
  .rstep .n{flex:0 0 auto;width:30px;height:30px;border-radius:50%;background:var(--purple);color:#fff;font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;box-shadow:0 5px 14px rgba(73,64,198,.3)}
  .rstep p{font-size:14.5px;color:#37343f;margin:0}
  .rstep p b{color:#15131c}
  .rcta{margin-top:8px}
  .rcta .btn{margin-top:6px}
  .rcta .fine{font-size:13.5px;color:var(--gray);margin-top:12px}
  .booking{margin-top:18px;min-width:320px;height:630px}
  .whatfor{list-style:none;margin:6px 0 0}
  .whatfor li{position:relative;padding-left:22px;margin-bottom:10px;font-size:15.5px;color:#2a2733}
  .whatfor li::before{content:"";position:absolute;left:0;top:9px;width:7px;height:7px;border-radius:50%;background:var(--orange)}

  /* join band (primary close) */
  .joinband{background:
            radial-gradient(700px 340px at 86% -10%, rgba(243,105,1,.18), transparent 60%),
            radial-gradient(620px 320px at 0% 110%, rgba(255,255,255,.10), transparent 60%),
            var(--purple);border:none}
  .joinband .tag{color:#d7d3ff}
  .joinband .tag .snum{color:#ffd6b0}
  .joinband h2.section-title{color:#fff;font-size:34px}
  .joinband .section-intro{color:#ece9ff}
  .joincard{background:#fff;border-radius:16px;padding:32px 34px;max-width:640px;box-shadow:0 24px 60px rgba(0,0,0,.28)}
  .joincard h3{font-size:20px;margin-bottom:6px;color:#15131c}
  .joincard p{font-size:15px;color:#444;margin-bottom:18px}
  .joinband .muted{color:#d7d3ff}
  .signup{display:flex;gap:12px;flex-wrap:wrap;max-width:540px}
  .signup input{flex:1 1 240px;padding:14px 16px;border:1px solid #d3d1dd;border-radius:10px;font-size:15px;font-family:inherit}
  .signup input:focus{outline:none;border-color:var(--purple);box-shadow:0 0 0 3px rgba(73,64,198,.15)}
  .signup .btn{flex:0 0 auto}
  .muted{font-size:14px;color:var(--gray);margin-top:14px}

  footer{background:#fff;padding:52px 0;border-top:3px solid var(--purple)}
  footer .wrap{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:24px}
  footer .mark{font-size:14px;margin-bottom:10px;display:block}
  footer p{font-size:13px;color:var(--gray);max-width:46ch}
  footer .links a{font-size:14px;color:#444;display:block;margin-bottom:7px}
  footer .links a:hover{color:var(--purple)}

  @media(max-width:860px){.referral .rgrid{grid-template-columns:1fr;gap:30px}}
  @media(max-width:820px){
    .g2,.g3{grid-template-columns:1fr}
    .hero h1{font-size:38px}
    .nos h2,.joinband h2.section-title,.referral h2{font-size:28px}
  }
      `}</style>

      {/* TOP BAR */}
      <div className="topbar">
        <div className="wrap">
          <span className="mark">SERVING&nbsp;FOUNDERS</span>
          <a className="btn" href="#join">Join the community</a>
        </div>
      </div>

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <span className="eyebrow">A community for operators who serve founder-led companies</span>
          <h1>The wall you keep hitting was never yours to fix.</h1>
          <p className="lede">You get hired to fix growth, sales, ops, or an exit. Then you hit it: the company can&rsquo;t say what makes it different without the founder in the room. The motion won&rsquo;t transfer, and the stall gets remembered as yours.</p>
          <p className="sub">Serving Founders is where the operators closest to that problem trade what they see, because we serve the same founders you do.</p>
          <div className="cta-row">
            <a className="btn" href="#join">Join the community</a>
            <span className="cta-note">Operators only. No pitch. A monthly note you can reply to.</span>
          </div>
          <div className="doctrine">&ldquo;You can&rsquo;t scale a story that only lives in the founder&rsquo;s head.&rdquo;</div>
        </div>
      </header>

      {/* PROOF STRIP — confirm these are cleared for public naming, or swap, before launch */}
      <div className="proof">
        <div className="wrap">
          <span className="plabel">Evidence,<br />not promises</span>
          <div className="pitem"><b>BetterCloud</b> moved from Gartner Visionary to Leader once its story stopped depending on one voice.</div>
          <div className="pitem"><b>Apto Solutions</b> grew revenue <b>+41% year over year</b> after the founder&rsquo;s story became the team&rsquo;s.</div>
        </div>
      </div>

      {/* ABOUT */}
      <section>
        <div className="wrap">
          <span className="tag"><span className="snum">01</span> Who we are</span>
          <h2 className="section-title">We serve the same founders you do.</h2>
          <p className="section-intro">BrandMultiplier gets a founder-led company&rsquo;s story out of the founder&rsquo;s head and built into something the whole team can carry. The work you keep diagnosing and can&rsquo;t bill for, we do, so your engagement finally lands. Serving Founders is the community we built for the operators who sit next to that problem every day.</p>
        </div>
      </section>

      {/* SLIM NOS TEASER (dark) */}
      <section className="nos">
        <div className="wrap">
          <span className="tag"><span className="snum">02</span> What we install</span>
          <h2>It isn&rsquo;t a project. It&rsquo;s an operating system.</h2>
          <p className="lede">We extract a founder&rsquo;s story once and install it as infrastructure the whole company runs on, so it keeps selling whether the founder is in the room or not. Human-delivered, AI-amplified.</p>
          <p className="postcode">As AI commoditizes execution, story becomes the last defensible advantage.</p>
          <p className="prov"><b>In development since 2023</b> &nbsp;&middot;&nbsp; grounded in cognitive science &nbsp;&middot;&nbsp; <b>38+ peer-reviewed studies</b></p>
          <a className="archlink" href="https://www.brandmultiplier.ai/NOS-architecture">See the full NOS architecture &rarr;</a>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="lav">
        <div className="wrap">
          <span className="tag"><span className="snum">03</span> Who this is for</span>
          <h2 className="section-title">You already sit beside the founder when the story breaks.</h2>
          <p className="section-intro">If you serve founder-led B2B companies in the $3M&ndash;$50M ARR range, you hit the narrative gap constantly. Four kinds of operators feel it most:</p>
          <div className="grid g2">
            <div className="card">
              <h3>Fractional C-suite</h3>
              <p>CMO, CRO/VP Sales, CTO/CPO, COO, CFO, CGO. Your strategy is right; it stalls waiting on a founder sign-off that never gets scheduled.</p>
              <div className="when">Trigger: the client can&rsquo;t articulate differentiation to the team.</div>
            </div>
            <div className="card">
              <h3>PE &amp; VC operating partners</h3>
              <p>One narrative fix is a portfolio multiplier. Founder-dependency is the value-creation item nobody wants to name first.</p>
              <div className="when">Trigger: post-investment value-creation planning.</div>
            </div>
            <div className="card">
              <h3>M&amp;A &amp; exit-readiness advisors</h3>
              <p>A business that runs through one person gets priced for it. That discount has a cause, and the cause is fixable before diligence finds it.</p>
              <div className="when">Trigger: diligence reveals founder dependency.</div>
            </div>
            <div className="card">
              <h3>Sales enablement &amp; GTM consultants</h3>
              <p>Enablement can&rsquo;t install a story that was never written down. The founder&rsquo;s selling logic has to be extracted before the playbook works.</p>
              <div className="when">Trigger: enablement stalls without a narrative foundation.</div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMON SIGNALS */}
      <section>
        <div className="wrap">
          <span className="tag"><span className="snum">04</span> Common signals</span>
          <h2 className="section-title">If this sounds like your clients, you&rsquo;re who we built this for.</h2>
          <p className="section-intro">Six things a client says right before this becomes your problem to absorb. You don&rsquo;t diagnose the mechanism or sell anything. When you hear one, you&rsquo;ve found someone we can help.</p>
          <div className="grid g2">
            <div className="sig">
              <div className="hear">&ldquo;We can&rsquo;t close without the founder. Every real deal still runs through one person.&rdquo;</div>
              <p className="read">The selling logic never left the founder&rsquo;s head, so the motion won&rsquo;t transfer. Fractional sales leader Louie Bernstein names the fix outright: <i>&ldquo;extract the genius from your head and build a repeatable sales playbook&rdquo;</i> (LinkedIn, June 2026).</p>
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
              <p className="read">You can&rsquo;t amplify a sound the source never made. As fractional executive Austin Gilbert puts it, <i>&ldquo;adding more people to a broken structure scales the chaos&rdquo;</i> (LinkedIn, May 2026). The foundation is missing, not the headcount.</p>
            </div>
            <div className="sig">
              <div className="hear">&ldquo;The founder is the bottleneck. Everything works until they leave the room.&rdquo;</div>
              <p className="read">Founder-dependency is structural, not a character flaw. It has a method, not a magic wand. Strategy consultant Jason Branin: <i>&ldquo;everything works, until someone leaves&rdquo;</i> (LinkedIn, June 2026).</p>
            </div>
            <div className="sig">
              <div className="hear">&ldquo;A buyer will pay less because the business runs through one person.&rdquo;</div>
              <p className="read">M&amp;A advisor Khaled Azar: <i>&ldquo;buyers do not want to buy a company that walks out the door with the founder&hellip; buyers pay more for transferable companies&rdquo;</i> (LinkedIn, June 2026). The discount is fixable before you go to market.</p>
            </div>
          </div>
        </div>
      </section>

      {/* REFERRAL PROGRAM (strong secondary) */}
      <section className="referral" id="referral">
        <div className="wrap">
          <span className="tag"><span className="snum">05</span> The referral program</span>
          <div className="rgrid">
            <div>
              <h2>When you spot the signal, there&rsquo;s a move that pays you to make it.</h2>
              <p>Referring this work isn&rsquo;t outsourcing the problem you were hired to solve. It&rsquo;s the move that protects the engagement: you name the constraint no one inside will say out loud, route it to a team that can fix it, and stay the strategist instead of the one who absorbs the stall.</p>
              <p className="reframe">&ldquo;Naming the real constraint and routing it is the expert move, not an admission you couldn&rsquo;t.&rdquo;</p>
              <ul className="whatfor">
                <li><b>Residual income</b> on clients you were never going to serve yourself.</li>
                <li><b>White-glove for your client</b>&mdash;their story handled by the team behind the work above.</li>
                <li><b>Zero lift.</b> One warm introduction. We take it from there.</li>
              </ul>
            </div>
            <div className="rcard">
              <h3>How it works</h3>
              <div className="rstep"><span className="n">1</span><p><b>You recognize the signal.</b> A client says one of the six lines above.</p></div>
              <div className="rstep"><span className="n">2</span><p><b>You introduce us, CC&rsquo;d.</b> A short, warm intro in your voice. No booking link to manage.</p></div>
              <div className="rstep"><span className="n">3</span><p><b>We take it from there.</b> We reply within a business day, handle scheduling, and keep you looped.</p></div>
              <div className="rcta">
                <a className="btn" href="https://calendly.com/book-crc/connector-call" target="_blank" rel="noopener">See if you qualify&mdash;book a 25-min call</a>
                <p className="fine">A conversation, not a pitch. Selective by design. If it isn&rsquo;t a fit, we&rsquo;ll say so on the call.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOIN / SIGNUP (primary close) */}
      <section id="join" className="joinband">
        <div className="wrap">
          <span className="tag"><span className="snum">06</span> Join Serving Founders</span>
          <h2 className="section-title">Start with the lowest bar: the community.</h2>
          <p className="section-intro">A monthly note for operators serving founder-led companies: field notes, patterns, and the occasional reframe worth stealing. No pitch, reply any time. The referral conversation comes later, only if you raise your hand.</p>
          <div className="joincard">
            <h3>Get the monthly note</h3>
            <p>Operators only. One email a month. Unsubscribe whenever.</p>
            <SignupForm />
          </div>
          <p className="muted">Hosted in Kit. Replace this form&rsquo;s action with your Kit (ConvertKit) embed before launch.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div>
            <span className="mark">SERVING&nbsp;FOUNDERS</span>
            <p>Built by BrandMultiplier. We install Narrative Operating Systems for founder-led B2B companies, so the team can tell the story without the founder in the room.</p>
            <p style={{ marginTop: "12px" }}><a href="https://www.brandmultiplier.ai">brandmultiplier.ai</a> &middot; <a href="https://weservefounders.com">weservefounders.com</a></p>
          </div>
          <div className="links">
            <a href="#join">Join the community</a>
            <a href="#referral">The referral program</a>
            <a href="#referral">Book a fit call</a>
            <a href="https://www.brandmultiplier.ai/NOS-architecture">How the NOS works</a>
          </div>
        </div>
      </footer>
    </>
  );
}
