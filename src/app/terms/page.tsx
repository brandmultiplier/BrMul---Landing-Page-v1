import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — BrandMultiplier",
  description:
    "The terms governing use of brandmultiplier.ai, our gated resources, diagnostic tools, and free content. Colorado law applies.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.brandmultiplier.ai/terms" },
};

export default function TermsPage() {
  return (
    <>
      <style>{LEGAL_CSS}</style>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="masthead">
        <div className="wrap">
          <a className="wordmark" href="/" aria-label="BrandMultiplier home">
            <span className="wordmark-badge">
              <img
                src="/brandmultiplier-logo.png"
                alt="BrandMultiplier"
                className="wordmark-logo"
              />
            </span>
            <span className="wordmark-text">BrandMultiplier</span>
          </a>
          <nav className="mast-nav" aria-label="Legal">
            <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy</a>
            <a href="/terms" aria-current="page" target="_blank" rel="noopener noreferrer">
              Terms
            </a>
            <a href="/">Home</a>
          </nav>
        </div>
      </header>

      <div className="hero">
        <div className="wrap">
          <p className="kicker">Legal</p>
          <h1>Terms of Use</h1>
          <p className="standfirst">
            The rules for using this site, our free resources, and our
            diagnostic tools. If we have signed a services agreement with your
            company, that document governs the engagement &mdash; this one
            governs the website.
          </p>
          <p className="meta">
            <span>
              Effective <strong>August 17, 2026</strong>
            </span>
            <span>
              Version <strong>1.0</strong>
            </span>
            <span>
              Governing law <strong>State of Colorado</strong>
            </span>
          </p>
        </div>
      </div>

      <div className="wrap">
        <div className="layout">
          <main className="content" id="main">
            <section id="agreement">
              <h2 className="sec">
                <span className="num">01</span>Agreement to these terms
              </h2>
              <p>
                These Terms of Use are a binding agreement between you and{" "}
                <strong>ChrisRubinCreativ, Inc.</strong>, a Colorado
                corporation doing business as BrandMultiplier (&ldquo;b*&rdquo;,
                &ldquo;we&rdquo;, &ldquo;us&rdquo;).
              </p>
              <p>
                They apply when you visit <strong>brandmultiplier.ai</strong>,
                download a gated resource, use a diagnostic tool, subscribe to
                our email programs, or otherwise interact with anything we
                publish. <strong>By doing any of those things, you accept these terms.</strong>{" "}
                If you do not accept them, do not use the site.
              </p>
              <p>
                Our <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> is incorporated into
                these terms by reference and forms part of this agreement.
              </p>
            </section>

            <hr className="rule" />

            <section id="precedence">
              <h2 className="sec">
                <span className="num">02</span>Order of precedence
              </h2>
              <div className="note">
                <span className="label">Read this before anything else</span>
                <p>
                  These terms govern the{" "}
                  <strong>website and free materials only</strong>. They do not
                  govern paid engagements.
                </p>
                <p>
                  If you are a client, the terms of your executed services
                  agreement, statement of work, master services agreement, or
                  order form control, and they prevail over these terms wherever
                  the two conflict. Nothing here reduces, limits, or replaces
                  any commitment we made to you in a signed contract &mdash;
                  including confidentiality, deliverable scope, guarantees, or
                  termination rights.
                </p>
              </div>
            </section>

            <hr className="rule" />

            <section id="eligibility">
              <h2 className="sec">
                <span className="num">03</span>Eligibility and business use
              </h2>
              <ul>
                <li>You must be at least 18 years old.</li>
                <li>
                  You must have the authority to accept these terms on behalf
                  of yourself and, where you are acting for a company, on
                  behalf of that company.
                </li>
                <li>
                  Our site and materials are directed at businesses and
                  business professionals. They are not consumer products, and
                  consumer-protection frameworks designed for household or
                  personal use are not intended to apply.
                </li>
                <li>
                  You are responsible for complying with the laws of your own
                  jurisdiction. We make no claim that our materials are
                  appropriate or available for use in every location.
                </li>
              </ul>
            </section>

            <hr className="rule" />

            <section id="resources">
              <h2 className="sec">
                <span className="num">04</span>Free resources and tools
              </h2>
              <p>
                We publish frameworks, diagnostics, guides, benchmarks,
                calculators, and other resources, some behind an email gate.
                In exchange for your business email address, we grant you the
                following license.
              </p>

              <h3>What you may do</h3>
              <ul>
                <li>
                  Download, read, and use the resource inside your own
                  organization.
                </li>
                <li>
                  Apply the frameworks to your own business, and to your own
                  clients&rsquo; businesses where you are a consultant or
                  advisor operating in your own name.
                </li>
                <li>Share the resource internally with colleagues.</li>
                <li>
                  Quote short excerpts publicly with attribution to
                  BrandMultiplier and a link to{" "}
                  <strong>brandmultiplier.ai</strong>.
                </li>
              </ul>

              <h3>What you may not do</h3>
              <ul>
                <li>
                  Resell, sublicense, or redistribute the resource, in whole
                  or in substantial part, whether or not for a fee.
                </li>
                <li>
                  Remove, obscure, or alter attribution, wordmarks, or
                  copyright notices.
                </li>
                <li>
                  Present our frameworks or methodology as your own
                  proprietary work or repackage them under another brand.
                </li>
                <li>
                  Use the resource, or any output derived from it, to build,
                  train, or market a competing product or service.
                </li>
                <li>
                  Scrape, harvest, or bulk-download our materials by automated
                  means.
                </li>
              </ul>
              <p>
                This license is non-exclusive, non-transferable, revocable,
                and limited to the purposes stated. It grants you no ownership
                of anything.
              </p>
            </section>

            <hr className="rule" />

            <section id="ip">
              <h2 className="sec">
                <span className="num">05</span>Intellectual property
              </h2>
              <p>
                All content on this site &mdash; text, frameworks, diagrams,
                methodology, code, imagery, video, audio, and design &mdash;
                is owned by ChrisRubinCreativ, Inc. or licensed to us, and is
                protected by United States and international copyright,
                trademark, and trade-secret law.
              </p>
              <p>
                Our proprietary methodology, including the{" "}
                <strong>Narrative Operating System</strong>, the{" "}
                <strong>Storyline Method</strong>, the UNLOCK &rarr; RUMBLE
                &rarr; ARCHITECT &rarr; INSTALL &rarr; TUNE delivery sequence,
                and the multi-agent system supporting them, together with all
                associated frameworks, diagnostics, prompts, and models,
                remains our exclusive property. Engaging us, downloading a
                resource, or reading this site transfers none of it.
              </p>
              <p>
                BrandMultiplier&trade;, b*&trade;, Narrative Operating
                System&trade;, NOS&trade;, and Storyline Method&trade; are
                trademarks of ChrisRubinCreativ, Inc., asserted under common
                law. Third-party names and marks appearing on this site belong
                to their respective owners and are used for identification only.
              </p>
              <p>
                Ownership of work product created during a paid engagement is
                governed by your services agreement, not by this section.
              </p>
            </section>

            <hr className="rule" />

            <section id="acceptable">
              <h2 className="sec">
                <span className="num">06</span>Acceptable use
              </h2>
              <p>You agree not to:</p>
              <ul>
                <li>
                  Use the site for any unlawful purpose, or in violation of
                  any applicable law or regulation.
                </li>
                <li>
                  Submit false, misleading, or another person&rsquo;s
                  information on any form, or impersonate anyone.
                </li>
                <li>
                  Attempt to gain unauthorized access to any part of the site,
                  its servers, or connected systems.
                </li>
                <li>
                  Probe, scan, or test the vulnerability of the site, or
                  breach or circumvent any security or authentication measure.
                </li>
                <li>
                  Interfere with the site&rsquo;s operation, including by
                  denial-of-service attack, malware, or excessive automated
                  requests.
                </li>
                <li>
                  Use bots, scrapers, or automated tools to extract content or
                  bypass email gates, except for well-behaved search-engine
                  crawlers respecting our robots directives.
                </li>
                <li>
                  Harvest email addresses or contact information from the site.
                </li>
                <li>
                  Reverse-engineer, decompile, or attempt to derive the source
                  of any tool or software we make available.
                </li>
                <li>
                  Use our content or output to develop a competing product,
                  service, or model.
                </li>
                <li>
                  Harass, abuse, or threaten our team, our clients, or other
                  users.
                </li>
              </ul>
              <p>
                We may investigate suspected violations and take any action we
                consider appropriate, including blocking access, suppressing
                your contact record, notifying law enforcement, and pursuing
                legal remedies.
              </p>
            </section>

            <hr className="rule" />

            <section id="submissions">
              <h2 className="sec">
                <span className="num">07</span>Your submissions
              </h2>
              <p>
                When you submit information through a form, diagnostic tool,
                survey, or message, you confirm that you have the right to
                provide it and that it does not infringe anyone&rsquo;s rights
                or breach any obligation of confidence.
              </p>
              <p>
                <strong>
                  Do not send us confidential information through public site
                  forms.
                </strong>{" "}
                Website forms are not a secure channel. If you need to share
                something sensitive, contact us and we will set up an
                appropriate one.
              </p>
              <p>
                <strong>Phone numbers.</strong> Where a form offers a phone
                number field, completing it is optional and never a condition
                of receiving the resource. If you provide a number, you confirm
                that it is yours or that you are authorized to provide it, and
                you understand that a member of our team may call you about
                your request. We do not use autodialers, prerecorded messages,
                or marketing text messages. You can stop the calls at any time
                by saying so on a call or emailing{" "}
                <a href="mailto:support@brandmultiplier.ai">
                  support@brandmultiplier.ai
                </a>
                . Section 7 of the{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> governs how we use it.
              </p>
              <p>
                You retain ownership of what you submit. You grant us a
                non-exclusive, worldwide, royalty-free license to use it for
                the purpose you submitted it for &mdash; returning your
                diagnostic result, answering your question, delivering the
                resource. We may also use aggregated and de-identified
                submission data to improve our tools and to publish benchmarks,
                in a form that cannot identify you or your company. Your
                identifiable submissions are never used in our marketing
                without your written permission.
              </p>
              <p>
                If you send us unsolicited ideas, feedback, or suggestions, we
                may use them freely and without obligation, compensation, or
                attribution.
              </p>
            </section>

            <hr className="rule" />

            <section id="ai">
              <h2 className="sec">
                <span className="num">08</span>AI-assisted output
              </h2>
              <p>
                Some of our tools, resources, and diagnostics are produced with
                the assistance of artificial intelligence, and some generate
                output for you in real time.
              </p>
              <ul>
                <li>
                  <strong>AI output can be wrong.</strong> Language models
                  produce plausible text, which is not the same thing as
                  correct text. Output may contain factual errors, outdated
                  information, flawed reasoning, or fabricated citations, and
                  it will do so confidently.
                </li>
                <li>
                  <strong>Verify before you act.</strong> Any output from a
                  public tool on this site is a starting point for your own
                  analysis, not a finding, a recommendation, or a substitute
                  for professional judgment.
                </li>
                <li>
                  <strong>No reliance.</strong> We accept no liability for
                  decisions made in reliance on AI-generated or AI-assisted
                  output delivered through free resources or public tools.
                </li>
                <li>
                  <strong>Deliverables are different.</strong> Work product
                  delivered under a paid engagement passes through human review
                  and carries the accountability set out in your services
                  agreement. This section does not dilute that.
                </li>
              </ul>
              <p>
                How we handle the data you put into AI-assisted tools,
                including our commitment not to use it for model training, is
                set out in Section 9 of the{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
              </p>
            </section>

            <hr className="rule" />

            <section id="noadvice">
              <h2 className="sec">
                <span className="num">09</span>No professional advice
              </h2>
              <p>
                Everything on this site is general business information. It is
                not legal, financial, tax, accounting, investment, or
                employment advice, and no attorney-client, fiduciary, or other
                professional relationship is created by your use of the site or
                by our correspondence with you.
              </p>
              <p>
                Consult a qualified professional licensed in your jurisdiction
                before acting on anything you read here.
              </p>
            </section>

            <hr className="rule" />

            <section id="results">
              <h2 className="sec">
                <span className="num">10</span>No guarantee of results
              </h2>
              <div className="flag">
                <span className="label">Read this one carefully</span>
                <p>
                  We do not guarantee any business outcome. Nothing on this
                  site &mdash; including case studies, testimonials,
                  benchmarks, projections, examples, or diagnostic output
                  &mdash; is a promise, warranty, or representation that you
                  will achieve any particular result.
                </p>
              </div>
              <p>
                Results described anywhere on this site are the results those
                specific clients achieved in their specific circumstances.{" "}
                <strong>
                  They are not typical, and they are not a prediction of what
                  you will achieve.
                </strong>{" "}
                Outcomes in narrative and go-to-market work depend on factors
                largely outside our control: your market, your product, your
                team&rsquo;s execution, your capital position, your timing,
                and competitive conditions.
              </p>
              <p>
                Where a testimonial appears, it reflects that
                individual&rsquo;s genuine experience and opinion. Where a
                person providing a testimonial has a material connection to us
                &mdash; compensation, a commercial relationship, or a referral
                arrangement &mdash; that connection is disclosed alongside the
                testimonial. Any financial figure presented is illustrative and
                is not an earnings claim.
              </p>
              <p>
                Any outcome-based commitment we make to a client lives in that
                client&rsquo;s signed services agreement, not on this website.
              </p>
            </section>

            <hr className="rule" />

            <section id="thirdparty">
              <h2 className="sec">
                <span className="num">11</span>Third-party links and services
              </h2>
              <p>
                We link to third-party sites and use third-party services for
                scheduling, email delivery, hosting, analytics, and file
                sharing. We do not control them, we do not endorse their
                content by linking to them, and we are not responsible for
                their practices, availability, or security. Their terms and
                privacy policies govern your use of them. Read them.
              </p>
            </section>

            <hr className="rule" />

            <section id="availability">
              <h2 className="sec">
                <span className="num">12</span>Availability and changes
              </h2>
              <p>
                We provide the site on an as-available basis and may modify,
                suspend, or discontinue any part of it &mdash; including any
                free resource or tool &mdash; at any time, without notice and
                without liability. We do not warrant uninterrupted or
                error-free availability.
              </p>
              <p>
                We may amend these terms at any time. The effective date at the
                top reflects the current version. Material changes take effect{" "}
                <strong>14 days</strong> after posting, or immediately where a
                change is required by law. Continuing to use the site after
                that period means you accept the amended terms. If you do not,
                stop using the site.
              </p>
            </section>

            <hr className="rule" />

            <section id="warranties">
              <h2 className="sec">
                <span className="num">13</span>Disclaimer of warranties
              </h2>
              <p className="legal-caps">
                The site and all content, resources, and tools are provided
                &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without
                warranty of any kind, express, implied, or statutory. To the
                fullest extent permitted by law, we disclaim all warranties,
                including implied warranties of merchantability, fitness for a
                particular purpose, title, non-infringement, accuracy, and any
                warranty arising from course of dealing or usage of trade.
              </p>
              <p className="legal-caps">
                We do not warrant that the site will be uninterrupted, secure,
                or error-free, that defects will be corrected, that the site is
                free of viruses or harmful components, or that any content,
                tool output, or benchmark is accurate, complete, current, or
                reliable.
              </p>
              <p>
                Some jurisdictions do not allow the exclusion of certain
                warranties. Where that is the case, the exclusions above apply
                to the fullest extent permitted, and nothing here excludes
                liability for fraud, fraudulent misrepresentation, death or
                personal injury caused by negligence, or any other liability
                that cannot lawfully be excluded.
              </p>
            </section>

            <hr className="rule" />

            <section id="liability">
              <h2 className="sec">
                <span className="num">14</span>Limitation of liability
              </h2>
              <p className="legal-caps">
                To the fullest extent permitted by law, ChrisRubinCreativ,
                Inc., its officers, directors, employees, contractors, and
                agents will not be liable for any indirect, incidental,
                special, consequential, exemplary, or punitive damages, or for
                any loss of profits, revenue, data, goodwill, business
                opportunity, or anticipated savings, arising out of or relating
                to your use of the site or its content, whether based in
                contract, tort, negligence, strict liability, or any other
                theory, and whether or not we were advised of the possibility
                of such damages.
              </p>
              <p className="legal-caps">
                Our total aggregate liability for all claims arising out of or
                relating to these terms or your use of the site will not exceed
                the greater of (a) the total amount you paid us for access to
                the site or the material giving rise to the claim in the twelve
                months preceding the claim, or (b) one hundred US dollars
                ($100).
              </p>
              <p>
                This limitation applies to the website and free materials.
                Liability arising under a paid services agreement is governed
                by the limitation of liability clause in that agreement.
              </p>
              <p>
                Some jurisdictions do not allow the limitation or exclusion of
                liability for incidental or consequential damages, so parts of
                the above may not apply to you.
              </p>
            </section>

            <hr className="rule" />

            <section id="indemnity">
              <h2 className="sec">
                <span className="num">15</span>Indemnification
              </h2>
              <p>
                You agree to indemnify, defend, and hold harmless
                ChrisRubinCreativ, Inc. and its officers, directors, employees,
                contractors, and agents from any claim, demand, loss,
                liability, damage, cost, or expense, including reasonable
                attorneys&rsquo; fees, arising from your use of the site, your
                violation of these terms, your violation of any law or
                third-party right, or any content you submit.
              </p>
              <p>
                We reserve the right to assume the exclusive defense and
                control of any matter subject to indemnification by you, at
                your expense, in which case you agree to cooperate with our
                defense.
              </p>
            </section>

            <hr className="rule" />

            <section id="termination">
              <h2 className="sec">
                <span className="num">16</span>Termination
              </h2>
              <p>
                We may suspend or terminate your access to the site or any
                resource at any time, for any reason, without notice, including
                for breach of these terms. You may terminate this agreement at
                any time by ceasing to use the site and unsubscribing from our
                communications.
              </p>
              <p>
                Sections 5, 7, 9, 10, 13, 14, 15, 17, and 18 survive
                termination.
              </p>
            </section>

            <hr className="rule" />

            <section id="disputes">
              <h2 className="sec">
                <span className="num">17</span>Governing law and disputes
              </h2>
              <p>
                These terms are governed by the laws of the{" "}
                <strong>State of Colorado</strong>, United States, without
                regard to its conflict-of-laws principles. The United Nations
                Convention on Contracts for the International Sale of Goods
                does not apply.
              </p>

              <h3>Talk to us first</h3>
              <p>
                Before filing anything, send a written description of the
                dispute and the relief you want to{" "}
                <a href="mailto:support@brandmultiplier.ai">
                  support@brandmultiplier.ai
                </a>
                . We will do the same. Both parties agree to attempt
                good-faith resolution for <strong>30 days</strong> from that
                notice. This step is a precondition to filing, except for
                claims seeking injunctive relief to protect intellectual
                property.
              </p>

              <h3>Venue</h3>
              <p>
                If informal resolution fails, you and we agree that any dispute
                will be brought exclusively in the state or federal courts
                located in Pitkin County, Colorado. Both parties consent to
                personal jurisdiction and venue in those courts and waive any
                objection to them as an inconvenient forum.
              </p>

              <h3>No class actions</h3>
              <p>
                To the extent permitted by law, any dispute will be brought in
                an individual capacity only, and not as a plaintiff or class
                member in any purported class, collective, or representative
                proceeding.
              </p>

              <h3>Time limit</h3>
              <p>
                Any claim arising out of or relating to these terms or the site
                must be filed within <strong>one year</strong> after the claim
                arose, or it is permanently barred, to the extent such a
                limitation is permitted by applicable law.
              </p>
            </section>

            <hr className="rule" />

            <section id="general">
              <h2 className="sec">
                <span className="num">18</span>General provisions
              </h2>
              <ul>
                <li>
                  <strong>Entire agreement.</strong> These terms and the
                  Privacy Policy are the entire agreement between you and us
                  regarding the site, superseding all prior understandings on
                  that subject, and subject always to Section 2.
                </li>
                <li>
                  <strong>Severability.</strong> If any provision is held
                  unenforceable, it is modified to the minimum extent necessary
                  to make it enforceable, or severed, and the remainder stays
                  in force.
                </li>
                <li>
                  <strong>No waiver.</strong> Our failure to enforce any
                  provision is not a waiver of our right to enforce it later.
                </li>
                <li>
                  <strong>Assignment.</strong> You may not assign or transfer
                  these terms without our written consent. We may assign them
                  freely, including in connection with a merger, acquisition,
                  or sale of assets.
                </li>
                <li>
                  <strong>Force majeure.</strong> Neither party is liable for
                  failure to perform caused by events beyond its reasonable
                  control, including natural disasters, war, terrorism, civil
                  unrest, labor disputes, utility or internet failures, and
                  government action.
                </li>
                <li>
                  <strong>No third-party beneficiaries.</strong> These terms
                  create no rights in anyone who is not a party to them.
                </li>
                <li>
                  <strong>Headings.</strong> Section headings are for
                  convenience and do not affect interpretation.
                </li>
                <li>
                  <strong>Notices.</strong> We may give notice by email to the
                  address you provided or by posting to the site. You give
                  notice to us at{" "}
                  <a href="mailto:support@brandmultiplier.ai">
                    support@brandmultiplier.ai
                  </a>
                  .
                </li>
              </ul>
            </section>

            <hr className="rule" />

            <section id="contact">
              <h2 className="sec">
                <span className="num">19</span>Contact
              </h2>
              <div className="contact">
                <dl>
                  <dt>Entity</dt>
                  <dd>
                    ChrisRubinCreativ, Inc., a Colorado corporation, doing
                    business as BrandMultiplier
                  </dd>
                  <dt>Legal notices</dt>
                  <dd>
                    <a href="mailto:support@brandmultiplier.ai">
                      support@brandmultiplier.ai
                    </a>
                  </dd>
                  <dt>General enquiries</dt>
                  <dd>
                    <a href="mailto:info@brandmultiplier.ai">
                      info@brandmultiplier.ai
                    </a>
                  </dd>
                  <dt>Mailing address</dt>
                  <dd>1500 N Grant St, Ste N, Denver, CO 80203, USA</dd>
                </dl>
                <p style={{ marginTop: 32 }}>
                  <a className="btn" href="/privacy" target="_blank" rel="noopener noreferrer">
                    Read the Privacy Policy
                  </a>
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>

      <footer className="sitefoot">
        <div className="wrap">
          <p>
            &copy; 2026 ChrisRubinCreativ, Inc. dba BrandMultiplier. All
            rights reserved.
          </p>
          <nav className="footlinks" aria-label="Legal">
            <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy</a>
            <a href="/terms" target="_blank" rel="noopener noreferrer">Terms</a>
            <a href="mailto:support@brandmultiplier.ai">Contact</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

const LEGAL_CSS = `
:root{
  --purple:#4940C6;
  --purple-lift:#6C63E0;
  --orange:#F36901;
  --bg:#0A0A0A;
  --surface:#080808;
  --line:rgba(255,255,255,0.08);
  --line-strong:rgba(255,255,255,0.16);
  --text:#FFFFFF;
  --text-2:#A1A1AA;
  --text-3:#52525B;
  --glow:rgba(168,85,247,0.6);
  --font:'Inter','Inter var',-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;
  --maxw:1180px;
}
html,body{margin:0;padding:0;background:var(--bg);color:var(--text);font-family:var(--font-inter),var(--font),sans-serif;-webkit-font-smoothing:antialiased}
.skip{position:absolute;left:-9999px;top:0;background:var(--purple);color:#fff;padding:12px 20px;border:0;z-index:99;}
.skip:focus{left:16px;top:16px;}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 24px;}
.masthead{position:fixed;top:0;left:0;right:0;z-index:80;border-bottom:1px solid var(--line);padding:16px 0;background:rgba(10,10,10,0.92);backdrop-filter:blur(8px);}
.masthead .wrap{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;}
.wordmark{border:0;border-bottom:0;text-decoration:none;display:inline-flex;align-items:center;gap:12px;color:#fff}
.wordmark:hover,.wordmark:focus{color:#fff;border-bottom:0}
.wordmark-badge{position:relative;height:40px;width:auto;display:inline-flex;align-items:center;flex:none}
.wordmark-logo{height:100%;width:auto;display:block;object-fit:contain;border-radius:8px}
.wordmark-text{font:inherit;font-weight:700;font-size:1.125rem;line-height:1.75rem;letter-spacing:-0.025em;color:#fff;transition:color .15s ease}
.wordmark:hover .wordmark-text{color:rgba(255,255,255,.9)}
.mast-nav{display:flex;gap:28px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;font-weight:500;}
.mast-nav a{color:var(--text-2);border:0;border-bottom:0;text-decoration:none;}
.mast-nav a:hover{color:#fff;border-bottom:0}
.mast-nav a[aria-current="page"]{color:#fff;}
.hero{padding:88px 0 56px;margin-top:76px;border-bottom:1px solid var(--line);}
.kicker{font-size:12px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--orange);margin:0 0 22px;}
h1{font-size:clamp(40px,6.2vw,69px);font-weight:500;line-height:1.06;letter-spacing:-.02em;margin:0 0 26px;color:var(--text);}
.standfirst{font-size:clamp(18px,2.2vw,22px);font-weight:300;color:var(--text-2);max-width:60ch;margin:0 0 34px;line-height:1.6;}
.meta{display:flex;flex-wrap:wrap;gap:10px 32px;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-3);font-weight:500;}
.meta strong{color:var(--text-2);font-weight:500;}
.layout{padding:64px 0 0;}
@media (max-width:900px){.layout{padding-top:40px;}}
.content{max-width:74ch;min-width:0;padding-bottom:40px;margin:0;}
.content section{padding:0 0 56px;scroll-margin-top:32px;}
h2.sec{font-size:clamp(26px,3.4vw,34px);font-weight:500;line-height:1.2;letter-spacing:-.01em;margin:0 0 8px;padding-top:8px;color:var(--text);}
h2.sec .num{display:block;font-size:12px;font-weight:700;letter-spacing:.24em;color:var(--purple-lift);margin-bottom:14px;font-variant-numeric:tabular-nums;}
h3{font-size:19px;font-weight:700;line-height:1.4;margin:38px 0 12px;color:#fff;letter-spacing:-.005em;}
p{margin:0 0 18px;color:var(--text-2);}
.content p strong,.content li strong{color:#fff;font-weight:700;}
ul,ol{margin:0 0 18px;padding-left:22px;color:var(--text-2);}
li{margin:0 0 10px;}
li::marker{color:var(--purple-lift);}
hr.rule{border:0;border-top:1px solid var(--line);margin:0 0 56px;}
.card{background:var(--surface);border:1px solid var(--line);border-radius:2px;padding:40px;margin:0 0 36px;}
.card>:last-child{margin-bottom:0;}
.card h3:first-child{margin-top:0;}
.note{border-left:3px solid var(--purple);background:rgba(73,64,198,0.07);padding:24px 28px;margin:0 0 28px;border-radius:0 2px 2px 0;}
.note>:last-child{margin-bottom:0;}
.note .label{font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--purple-lift);display:block;margin-bottom:10px;}
.flag{border-left:3px solid var(--orange);background:rgba(243,105,1,0.06);padding:24px 28px;margin:0 0 28px;border-radius:0 2px 2px 0;}
.flag>:last-child{margin-bottom:0;}
.flag .label{font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--orange);display:block;margin-bottom:10px;}
.legal-caps{font-size:15px;line-height:1.65;color:var(--text-2);text-transform:uppercase;letter-spacing:.02em;}
.tablewrap{overflow-x:auto;margin:0 0 32px;border:1px solid var(--line);border-radius:2px;}
table{width:100%;border-collapse:collapse;font-size:15px;min-width:560px;}
caption{text-align:left;font-size:13px;color:var(--text-3);padding:16px 20px;border-bottom:1px solid var(--line);letter-spacing:.06em;text-transform:uppercase;font-weight:500;}
th{background:var(--purple);color:#fff;text-align:left;font-weight:700;font-size:13px;letter-spacing:.06em;padding:14px 20px;vertical-align:top;}
td{padding:16px 20px;border-top:1px solid var(--line);color:var(--text-2);vertical-align:top;line-height:1.55;}
tbody tr:nth-child(even) td{background:rgba(255,255,255,0.02);}
td strong{color:#fff;font-weight:700;}
.contact{background:var(--surface);border:1px solid var(--line-strong);border-radius:2px;padding:40px;}
.contact dl{margin:0;display:grid;grid-template-columns:180px 1fr;gap:14px 24px;}
@media (max-width:620px){.contact dl{grid-template-columns:1fr;gap:4px 0;}.contact dd{margin-bottom:18px;}}
.contact dt{font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--text-3);padding-top:4px;}
.contact dd{margin:0;color:var(--text-2);}
.btn{display:inline-block;background:var(--purple);color:#fff;font-weight:700;font-size:15px;padding:16px 36px;border-radius:100px;border:0;box-shadow:0 0 28px var(--glow);min-height:48px;letter-spacing:.01em;text-decoration:none;}
.btn:hover,.btn:focus{background:var(--purple-lift);color:#fff;border:0;box-shadow:0 0 40px var(--glow);}
a{color:var(--purple-lift);text-decoration:none;border-bottom:1px solid rgba(108,99,224,0.35);transition:color .15s ease,border-color .15s ease;}
a:hover,a:focus{color:#fff;border-color:#fff;}
a:focus-visible{outline:2px solid var(--purple-lift);outline-offset:3px;border-radius:2px;}
.sitefoot{border-top:1px solid var(--line);margin-top:40px;padding:48px 0 64px;}
.sitefoot .wrap{display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap;}
.sitefoot p{font-size:13px;color:var(--text-3);margin:0;}
.footlinks{display:flex;gap:28px;font-size:13px;letter-spacing:.1em;text-transform:uppercase;font-weight:500;}
.footlinks a{color:var(--text-2);border:0;}
.footlinks a:hover{color:#fff;}
@media print{
  body{background:#fff;color:#000;font-size:11pt;}
  .toc,.masthead,.sitefoot,.skip{display:none;}
  .layout{display:block;}
  p,li,td{color:#000;}
  a{color:#000;border:0;}
  .card,.note,.flag,.contact{border:1px solid #ccc;background:#fff;}
}
`;
