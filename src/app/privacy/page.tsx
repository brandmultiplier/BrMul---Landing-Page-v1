import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — BrandMultiplier",
  description:
    "How BrandMultiplier collects, uses, and protects personal information across brandmultiplier.ai, our gated resources, and Narrative Operating System engagements.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://brandmultiplier.ai/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <style>{LEGAL_CSS}</style>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="masthead">
        <div className="wrap">
          <a className="wordmark" href="/" aria-label="BrandMultiplier home">
            <img
              src="/brandmultiplier-logo.png"
              alt="BrandMultiplier"
              className="wordmark-logo"
            />
          </a>
          <nav className="mast-nav" aria-label="Legal">
            <a href="/privacy" aria-current="page">
              Privacy
            </a>
            <a href="/terms">Terms</a>
            <a href="/">Home</a>
          </nav>
        </div>
      </header>

      <div className="hero">
        <div className="wrap">
          <p className="kicker">Legal</p>
          <h1>Privacy Policy</h1>
          <p className="standfirst">
            What we collect, why we collect it, who touches it, and how you get
            it back or get rid of it. Written to be read, not to be survived.
          </p>
          <p className="meta">
            <span>
              Effective <strong>August 17, 2026</strong>
            </span>
            <span>
              Version <strong>1.0</strong>
            </span>
            <span>
              Applies to{" "}
              <strong>brandmultiplier.ai and all b* gated resources</strong>
            </span>
          </p>
        </div>
      </div>

      <div className="wrap">
        <div className="layout">
          <nav className="toc" aria-label="Table of contents">
            <h2>Contents</h2>
            <ol>
              <li>
                <a href="#who">Who we are</a>
              </li>
              <li>
                <a href="#summary">The short version</a>
              </li>
              <li>
                <a href="#collect">What we collect</a>
              </li>
              <li>
                <a href="#use">How we use it</a>
              </li>
              <li>
                <a href="#bases">Legal bases for processing</a>
              </li>
              <li>
                <a href="#cookies">Cookies and tracking</a>
              </li>
              <li>
                <a href="#marketing">Email and phone</a>
              </li>
              <li>
                <a href="#recordings">Recorded sessions</a>
              </li>
              <li>
                <a href="#ai">AI and automated processing</a>
              </li>
              <li>
                <a href="#client">Client engagement data</a>
              </li>
              <li>
                <a href="#providers">Service providers</a>
              </li>
              <li>
                <a href="#sharing">Sharing and selling</a>
              </li>
              <li>
                <a href="#retention">How long we keep it</a>
              </li>
              <li>
                <a href="#security">Security</a>
              </li>
              <li>
                <a href="#transfers">International transfers</a>
              </li>
              <li>
                <a href="#rights">Your rights</a>
              </li>
              <li>
                <a href="#children">Children</a>
              </li>
              <li>
                <a href="#changes">Changes</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ol>
          </nav>

          <main className="content" id="main">
            <section id="who">
              <h2 className="sec">
                <span className="num">01</span>Who we are
              </h2>
              <p>
                BrandMultiplier (&ldquo;b*&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo;) is a brand of{" "}
                <strong>ChrisRubinCreativ, Inc.</strong>, a Colorado
                corporation. We install Narrative Operating Systems for
                founder-led B2B companies.
              </p>
              <p>
                ChrisRubinCreativ, Inc. is the controller of the personal
                information described in this policy. Our registered mailing
                address is 1500 N Grant St, Ste N, Denver, CO 80203, USA.
              </p>
              <p>
                This policy covers <strong>brandmultiplier.ai</strong>, every
                gated page and lead-magnet download we operate, our email
                programs, our outbound and social outreach, and the personal
                information we handle while delivering Narrative Operating
                System (&ldquo;NOS&rdquo;) engagements. It does not cover
                third-party sites we link to, or platforms you reach us on that
                run under their own policies, such as LinkedIn.
              </p>
              <p>
                Where a signed services agreement, statement of work, or data
                processing addendum exists between us and your company,{" "}
                <strong>that agreement governs</strong> the personal information
                we process on your company&rsquo;s behalf. This policy fills
                the gaps; it does not override the contract.
              </p>
            </section>

            <hr className="rule" />

            <section id="summary">
              <h2 className="sec">
                <span className="num">02</span>The short version
              </h2>
              <div className="card">
                <ul>
                  <li>
                    <strong>We do not sell your personal information</strong>{" "}
                    and we do not share it for cross-context behavioral
                    advertising by third parties.
                  </li>
                  <li>
                    If you download a resource or subscribe, we will email you.
                    Every email has a one-click unsubscribe and we honor it.
                  </li>
                  <li>
                    <strong>The phone field is always optional</strong>, on
                    every form we run. If you do give us a number, a person
                    calls it &mdash; not a robot. No autodialers, no recorded
                    messages, no marketing texts, ever, and one word from you
                    ends the calls permanently.
                  </li>
                  <li>
                    We use analytics and advertising technologies on our site.
                    Section 6 names them. Section 16 tells you how to switch
                    them off, including via a browser-level Global Privacy
                    Control signal, which we honor.
                  </li>
                  <li>
                    Client material from an engagement is confidential.{" "}
                    <strong>
                      We do not use client content to train AI models
                    </strong>
                    , and we contract with AI vendors on terms that prohibit
                    them from doing so either.
                  </li>
                  <li>
                    We extend the core privacy rights &mdash; access,
                    correction, deletion, portability, opt-out &mdash; to{" "}
                    <strong>everyone</strong>, whether or not a specific statute
                    requires it of a company our size.
                  </li>
                  <li>
                    Questions, requests, or complaints:{" "}
                    <a href="mailto:support@brandmultiplier.ai">
                      support@brandmultiplier.ai
                    </a>
                    . We answer within 30 days.
                  </li>
                </ul>
              </div>
              <p>
                The rest of this document is the detail behind those six lines.
                If a section contradicts the summary, the section wins.
              </p>
            </section>

            <hr className="rule" />

            <section id="collect">
              <h2 className="sec">
                <span className="num">03</span>What we collect
              </h2>
              <p>
                We collect four kinds of information, and the amount depends
                entirely on how far into a relationship with us you are. A
                visitor who reads one page leaves almost nothing behind. A
                client mid-engagement necessarily leaves a great deal more.
              </p>

              <h3>Information you give us directly</h3>
              <ul>
                <li>
                  <strong>Gated resources and lead magnets.</strong> Name,
                  business email, phone number, and, on some forms, company
                  name, role, company size, or revenue band. Some diagnostic
                  tools also capture the answers you enter, because the answers
                  are what generate your result.
                </li>
                <li>
                  <strong>Phone numbers.</strong> Where a form asks for a phone
                  number, providing it is <strong>optional</strong> and is
                  never a condition of receiving the resource. If you provide
                  one, a member of our team may call you about what you
                  requested and whether there is a fit between your business
                  and ours. We record the form, the timestamp, the URL, and the
                  exact consent wording you saw, so we can show why we called.
                </li>
                <li>
                  <strong>Newsletter and content subscriptions.</strong> Email
                  address and any preferences you set.
                </li>
                <li>
                  <strong>Booking a call.</strong> Name, email, company, phone
                  where you provide it, plus whatever you type into the intake
                  questions on the scheduling form.
                </li>
                <li>
                  <strong>Direct correspondence.</strong> Anything you send us
                  by email, LinkedIn message, or contact form, including the
                  content of the message itself.
                </li>
                <li>
                  <strong>Client onboarding.</strong> Contact details for you
                  and the stakeholders you nominate, billing contact
                  information, and the business context needed to run the
                  engagement.
                </li>
              </ul>

              <h3>Information we collect automatically</h3>
              <ul>
                <li>
                  <strong>Device and connection data.</strong> IP address,
                  browser type and version, operating system, device type,
                  screen dimensions, and language settings.
                </li>
                <li>
                  <strong>Usage data.</strong> Pages viewed, time on page,
                  scroll depth, referring URL, exit pages, and which links and
                  buttons you clicked.
                </li>
                <li>
                  <strong>Email engagement.</strong> Whether a message was
                  opened, which links were clicked, and delivery status.
                  Standard for every email platform, and you can defeat it by
                  blocking remote images in your mail client.
                </li>
                <li>
                  <strong>Visitor identification.</strong> We use a service
                  called RB2B that attempts to identify individual visitors to
                  our site &mdash; not just the company, but the person &mdash;
                  by matching browsing signals against commercial
                  professional-data networks. Where it succeeds, we may receive
                  your name, job title, employer, and professional background
                  without you having filled in anything. We would rather tell
                  you that plainly than describe it as &ldquo;analytics.&rdquo;
                  It operates on US visitors only. Section 6 explains how to
                  switch it off, and we honor a browser-level Global Privacy
                  Control signal as an instruction to do so.
                </li>
              </ul>

              <h3>Information we collect from third parties</h3>
              <ul>
                <li>
                  <strong>
                    Business contact databases and enrichment providers.
                  </strong>{" "}
                  For outbound prospecting we use commercial B2B data providers
                  that supply name, title, company, business email, business
                  phone, and public professional history. If we contacted you
                  cold, this is where your details came from, and you can ask
                  us to tell you which provider and to delete the record.
                </li>
                <li>
                  <strong>Public professional profiles.</strong> Publicly
                  visible LinkedIn and company-website information about
                  prospects, clients, and the executives we research as part of
                  narrative work.
                </li>
                <li>
                  <strong>Referral sources.</strong> Where a partner or
                  existing client introduces you, we receive whatever context
                  they include in the introduction.
                </li>
              </ul>

              <h3>Engagement content</h3>
              <p>
                During an NOS engagement we receive and generate substantive
                material: interview and workshop recordings, transcripts,
                internal documents you share, customer research, positioning
                artifacts, and the deliverables we build from them. This
                material frequently contains personal information about your
                employees, executives, and customers. Section 10 governs it.
              </p>

              <div className="flag">
                <span className="label">What we do not collect</span>
                <p>
                  We do not knowingly collect government identifiers, financial
                  account numbers, health information, precise geolocation,
                  biometric data, or any other category of sensitive personal
                  information. Payment card details are handled entirely by our
                  payment processor and never reach our systems. Please do not
                  send us any of the above; if you do, we will delete it.
                </p>
              </div>
            </section>

            <hr className="rule" />

            <section id="use">
              <h2 className="sec">
                <span className="num">04</span>How we use it
              </h2>
              <div className="tablewrap">
                <table>
                  <caption>Purpose, and the data that serves it</caption>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "34%" }}>
                        Purpose
                      </th>
                      <th scope="col">What we do</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Deliver what you asked for</strong>
                      </td>
                      <td>
                        Send the resource you downloaded, return your
                        diagnostic result, confirm your booking, answer your
                        message.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Run the engagement</strong>
                      </td>
                      <td>
                        Conduct interviews, build deliverables, coordinate with
                        your team, invoice, and provide support.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Email programs</strong>
                      </td>
                      <td>
                        Send the newsletter and related content you subscribed
                        to, plus follow-up sequences tied to the resource you
                        requested.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Phone follow-up</strong>
                      </td>
                      <td>
                        Where you gave us a number, have a person call you
                        about the resource you requested, answer questions, and
                        see whether a conversation with our founder makes sense.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Business development</strong>
                      </td>
                      <td>
                        Identify companies that fit our ICP, reach out, and
                        follow up on conversations already in progress.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Engagement scoring</strong>
                      </td>
                      <td>
                        Score how you interact with our resources and content,
                        so we contact people who are actually interested rather
                        than everyone equally. Scoring decides who a person on
                        our team reaches out to. It never decides anything
                        about you.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Improve the work</strong>
                      </td>
                      <td>
                        Understand which content lands, which pages convert,
                        and where the site fails people, in aggregate.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Advertising</strong>
                      </td>
                      <td>
                        Show relevant ads to people who have visited the site
                        or engaged with our content, and measure whether those
                        ads worked.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Security and integrity</strong>
                      </td>
                      <td>
                        Detect abuse, prevent fraud, protect our systems, and
                        keep backups.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Legal and financial obligations</strong>
                      </td>
                      <td>
                        Maintain accounting records, respond to lawful
                        requests, and establish or defend legal claims.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                We do not use your personal information for any purpose
                materially different from the ones above without telling you
                first.
              </p>
            </section>

            <hr className="rule" />

            <section id="bases">
              <h2 className="sec">
                <span className="num">05</span>Legal bases for processing
              </h2>
              <p>
                If you are in the United Kingdom, the European Economic Area,
                or Switzerland, the UK GDPR and EU GDPR require us to name a
                lawful basis for each processing activity. Ours are:
              </p>
              <ul>
                <li>
                  <strong>Consent</strong> &mdash; marketing email to
                  individuals in jurisdictions that require opt-in,
                  non-essential cookies and tracking technologies, and
                  recording of calls. You may withdraw consent at any time,
                  which does not affect processing already carried out.
                </li>
                <li>
                  <strong>Contract</strong> &mdash; delivering an engagement,
                  providing a resource you requested, and administering billing.
                </li>
                <li>
                  <strong>Legitimate interests</strong> &mdash; B2B outreach to
                  business contacts in a professional capacity, site security,
                  service improvement, and aggregate analytics. We have weighed
                  these interests against your rights and freedoms; you can
                  object at any time under Section 16 and we will stop unless
                  we have compelling grounds not to.
                </li>
                <li>
                  <strong>Legal obligation</strong> &mdash; tax, accounting,
                  and lawful requests from authorities.
                </li>
              </ul>
            </section>

            <hr className="rule" />

            <section id="cookies">
              <h2 className="sec">
                <span className="num">06</span>Cookies and tracking
              </h2>
              <p>
                Cookies are small files a site stores in your browser. We use
                them, along with pixels and similar technologies, in four
                categories.
              </p>
              <div className="tablewrap">
                <table>
                  <caption>
                    Categories in use on brandmultiplier.ai
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "24%" }}>
                        Category
                      </th>
                      <th scope="col" style={{ width: "36%" }}>
                        What it does
                      </th>
                      <th scope="col">Can you refuse it?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Strictly necessary</strong>
                      </td>
                      <td>
                        Page delivery, security, load balancing, remembering
                        your cookie choices.
                      </td>
                      <td>
                        No. The site does not function without these, and they
                        are exempt from consent requirements.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Analytics</strong>
                      </td>
                      <td>
                        Aggregate measurement of traffic, content performance,
                        and conversion paths via <strong>Google Analytics 4</strong>.
                      </td>
                      <td>Yes.</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Advertising and retargeting</strong>
                      </td>
                      <td>
                        The <strong>Meta Pixel</strong> and{" "}
                        <strong>LinkedIn Insight Tag</strong> record that you
                        visited, so we can show you relevant ads elsewhere and
                        measure results.
                      </td>
                      <td>Yes.</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Visitor identification</strong>
                      </td>
                      <td>
                        <strong>RB2B</strong> attempts to resolve individual US
                        visitors to a named person, job title, and employer, so
                        we know who is researching us. This is the most
                        intrusive technology on our site and we list it
                        separately rather than folding it into
                        &ldquo;analytics.&rdquo;
                      </td>
                      <td>
                        Yes &mdash; and it is switched off automatically for
                        any browser sending a Global Privacy Control signal.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h3>Your controls</h3>
              <ul>
                <li>
                  <strong>Global Privacy Control.</strong> If your browser or
                  extension transmits a GPC signal, we treat it as a valid
                  opt-out of analytics, advertising, and
                  visitor-identification technologies for that browser, and we
                  process the signal server-side. This is the fastest way to
                  switch all of it off, and it works across every site that
                  honors it, not just ours.
                </li>
                <li>
                  <strong>Email us.</strong> Write to{" "}
                  <a href="mailto:support@brandmultiplier.ai">
                    support@brandmultiplier.ai
                  </a>{" "}
                  and ask to be excluded from visitor identification. We will
                  suppress it against your details.
                </li>
                <li>
                  <strong>Browser settings.</strong> Every major browser lets
                  you block or delete cookies. Blocking strictly necessary
                  cookies will break parts of the site.
                </li>
                <li>
                  <strong>Advertising platforms.</strong> Meta and LinkedIn
                  each provide ad-preference controls inside your account on
                  those platforms, independent of anything we do.
                </li>
              </ul>
              <p>
                We do not use cookies to build profiles of your activity across
                unrelated websites, and we do not permit third parties to do so
                through our site beyond the technologies named above.
              </p>
              <p>
                We do not currently operate a cookie consent banner. Our
                advertising and visitor-identification technologies are
                configured for US visitors, and we honor Global Privacy Control
                signals server-side rather than asking you to negotiate with a
                pop-up. If you are in the UK or EEA and would prefer none of
                this ran at all, tell us at{" "}
                <a href="mailto:support@brandmultiplier.ai">
                  support@brandmultiplier.ai
                </a>{" "}
                and we will suppress it.
              </p>
            </section>

            <hr className="rule" />

            <section id="marketing">
              <h2 className="sec">
                <span className="num">07</span>Email and phone
              </h2>

              <h3>Email</h3>
              <p>
                When you download a resource, subscribe, or otherwise give us
                your email address, you should expect to hear from us.
                Specifically:
              </p>
              <ul>
                <li>A delivery email containing what you requested.</li>
                <li>
                  A short follow-up sequence related to that resource.
                </li>
                <li>
                  Our ongoing newsletter, if you subscribed or if the form told
                  you that downloading subscribes you. Where consent is
                  required, the form asks for it separately rather than burying
                  it.
                </li>
              </ul>
              <p>
                Every marketing email carries a working unsubscribe link and
                our physical mailing address, as US law requires. Unsubscribing
                removes you from all marketing sequences within ten business
                days and usually within minutes. It does not stop transactional
                messages tied to an active engagement, such as invoices or
                scheduling confirmations.
              </p>

              <h3>Phone calls</h3>
              <div className="note">
                <span className="label">The phone field is optional</span>
                <p>
                  No gated resource, diagnostic, or download is ever
                  conditioned on giving us a phone number. Leave the field
                  blank and you still get the thing you came for.
                </p>
              </div>
              <p>
                If you do give us a number, this is the whole of what happens
                to it.
              </p>
              <ul>
                <li>
                  <strong>A person dials it.</strong> Our system scores
                  engagement across the resources you download and the content
                  you interact with. When that score suggests real interest, the
                  record surfaces to a member of our team, who calls you
                  individually to see whether a conversation with our founder
                  is worth your time. That is the entire mechanism.
                </li>
                <li>
                  <strong>No automated calling of any kind.</strong> We do not
                  use autodialers, predictive dialers, prerecorded or
                  artificial voice messages, ringless voicemail drops, or AI
                  voice agents to contact you. Every call is placed manually by
                  a human being who knows your name.
                </li>
                <li>
                  <strong>No marketing text messages.</strong> We do not send
                  marketing SMS. If we ever start, we will ask for your
                  separate, explicit consent first, and giving us a number
                  today will not be treated as agreement to that.
                </li>
                <li>
                  <strong>Why we are calling.</strong> Calls follow from your
                  own request for a resource. We are contacting you in a
                  business capacity, at a business, about the business problem
                  the resource addressed.
                </li>
                <li>
                  <strong>Stopping it.</strong> Say so on the call, or email{" "}
                  <a href="mailto:support@brandmultiplier.ai">
                    support@brandmultiplier.ai
                  </a>
                  . We honor the request made by any reasonable means, through
                  any channel, and we process it within ten business days
                  &mdash; in practice, immediately. You do not have to give a
                  reason, and we will not call to ask why.
                </li>
                <li>
                  <strong>Do Not Call.</strong> We maintain an internal Do Not
                  Call list and honor it indefinitely. Ask to be added and you
                  stay on it, permanently, even if you later download something
                  else.
                </li>
                <li>
                  <strong>Transactional contact is separate.</strong> A call or
                  text tied to a meeting you actually booked &mdash; a
                  confirmation, a &ldquo;running five minutes late&rdquo;
                  &mdash; is not marketing and continues unless you ask us to
                  stop those too.
                </li>
              </ul>
              <p>
                We do not sell, rent, or share phone numbers with third parties
                for their own marketing, and we do not pass them to lead buyers
                or affiliates. Phone numbers are used by BrandMultiplier, and
                only by BrandMultiplier.
              </p>

              <h3>Cold outreach</h3>
              <p>
                We send business-to-business outreach to professional contacts
                at companies matching our ideal client profile, using contact
                data from the sources named in Section 3. Reply with
                &ldquo;remove&rdquo; or write to{" "}
                <a href="mailto:support@brandmultiplier.ai">
                  support@brandmultiplier.ai
                </a>{" "}
                and we will suppress your address permanently and delete the
                underlying record on request.
              </p>
            </section>

            <hr className="rule" />

            <section id="recordings">
              <h2 className="sec">
                <span className="num">08</span>Recorded sessions
              </h2>
              <p>
                Discovery calls, Rumble sessions, extraction interviews, and
                workshops are frequently recorded and transcribed. Recording is
                how narrative extraction works: the exact language a founder
                uses is the raw material, and reconstructing it from memory
                produces a worse result.
              </p>
              <ul>
                <li>
                  <strong>We ask first.</strong> You will be told at the start
                  of any recorded session, and consent is requested before
                  recording begins. Several US states and most of Europe
                  require the consent of every participant, and we operate to
                  that standard everywhere rather than tracking which rule
                  applies to which participant.
                </li>
                <li>
                  <strong>You can decline.</strong> If any participant objects,
                  we do not record. We take notes instead.
                </li>
                <li>
                  <strong>Where they go.</strong> Recordings and transcripts
                  are processed by our meeting-capture vendors (Section 11) and
                  stored in our access-controlled cloud storage.
                </li>
                <li>
                  <strong>What they are used for.</strong> Building your
                  deliverables and internal quality review, nothing else.
                  Recordings are never used in marketing, case studies, or
                  public material without separate, specific, written
                  permission.
                </li>
                <li>
                  <strong>Deletion.</strong> You may request deletion of a
                  recording or transcript at any time, subject to Section 13.
                </li>
              </ul>
            </section>

            <hr className="rule" />

            <section id="ai">
              <h2 className="sec">
                <span className="num">09</span>AI and automated processing
              </h2>
              <p>
                The Narrative Operating System is a services and software
                platform. The software layer is a multi-agent system that
                supports extraction, synthesis, and deployment work. Being
                direct about what that means for your data:
              </p>

              <h3>Where AI is used</h3>
              <ul>
                <li>Transcribing and summarizing recorded sessions.</li>
                <li>
                  Structured narrative extraction from interviews and source
                  documents.
                </li>
                <li>
                  Drafting, analysis, and synthesis inside deliverable
                  production.
                </li>
                <li>
                  Research and content operations on our own marketing.
                </li>
              </ul>

              <h3>What that means for your content</h3>
              <div className="note">
                <span className="label">Model training commitment</span>
                <p>
                  <strong>
                    We do not use client content, interview transcripts, or
                    personal information to train AI models
                  </strong>{" "}
                  &mdash; not ours, not anyone&rsquo;s. We access third-party
                  foundation models through commercial API arrangements whose
                  terms prohibit the vendor from training on our inputs and
                  outputs. We do not opt into any consumer-tier or
                  training-eligible plan for client work. If that ever changes,
                  we will notify affected clients in advance and obtain consent
                  before any such processing occurs.
                </p>
              </div>

              <h3>Human review and automated decisions</h3>
              <p>
                We score engagement to decide who our team should contact, as
                described in Section 4. That is profiling, and we name it as
                such rather than hiding it in a euphemism &mdash; but the only
                outcome it produces is whether a person picks up a phone and
                calls you. It sets no price, grants no access, and denies you
                nothing. You may object to it at any time under Section 16, and
                you may ask us what your score is and what drove it.
              </p>
              <p>
                Every AI-assisted output that reaches you passes through human
                review. We do not make decisions producing legal or similarly
                significant effects about any individual &mdash; employment,
                credit, housing, insurance, education, healthcare, or access to
                essential services &mdash; through automated means, with or
                without AI. If that ever changes, this section will change
                first, and we will provide the notice, explanation, correction,
                and human-review rights that the applicable law requires.
              </p>
              <p>
                AI output can be wrong, and confidently so. Our engagement
                deliverables carry human judgment and accountability; our
                public tools and resources do not, and you should treat their
                output as a starting point rather than a finding. The disclaimer
                in our <a href="/terms">Terms of Use</a> covers this in full.
              </p>
            </section>

            <hr className="rule" />

            <section id="client">
              <h2 className="sec">
                <span className="num">10</span>Client engagement data
              </h2>
              <p>
                Material you share with us during an engagement &mdash;
                strategy documents, customer research, financials, internal
                communications, anything your team says in a room with us
                &mdash; is confidential. The commitments below apply in
                addition to whatever your services agreement or NDA says, and
                never in place of it.
              </p>
              <ul>
                <li>
                  Engagement material is used solely to deliver your
                  engagement.
                </li>
                <li>
                  It is never sold, licensed, shared with other clients, or
                  used to train models.
                </li>
                <li>
                  Access is limited to the named team members working on your
                  account and the vendors in Section 11 that are technically
                  necessary to do the work.
                </li>
                <li>
                  Every person with access is bound by confidentiality
                  obligations.
                </li>
                <li>
                  We do not publish your name, logo, or engagement details as a
                  client reference without your written permission.
                </li>
                <li>
                  Where we process personal information about your employees or
                  customers, we act as a <strong>processor</strong> on your
                  instructions, and you remain the controller. We will sign a
                  data processing addendum on request.
                </li>
              </ul>
            </section>

            <hr className="rule" />

            <section id="providers">
              <h2 className="sec">
                <span className="num">11</span>Service providers
              </h2>
              <p>
                We run on third-party infrastructure rather than building
                everything ourselves. Each provider below receives only the
                data its function requires, under contract terms restricting
                use to providing the service to us.
              </p>
              <div className="tablewrap">
                <table>
                  <caption>
                    Categories of processor &mdash; current list available on
                    request
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "30%" }}>
                        Function
                      </th>
                      <th scope="col" style={{ width: "34%" }}>
                        Data involved
                      </th>
                      <th scope="col">Providers</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Website hosting and CDN</strong>
                      </td>
                      <td>IP address, request logs</td>
                      <td>Vercel (hosting), Cloudflare (DNS and CDN)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Email delivery and marketing</strong>
                      </td>
                      <td>Name, email, engagement data</td>
                      <td>Encharge</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>CRM, sales engagement, prospect data</strong>
                      </td>
                      <td>Business contact and firmographic data</td>
                      <td>Apollo.io</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Scheduling</strong>
                      </td>
                      <td>Name, email, phone, intake answers</td>
                      <td>Calendly</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Lead scoring and call records</strong>
                      </td>
                      <td>
                        Engagement history, score, phone number, call notes
                      </td>
                      <td>
                        None &mdash; held in our own database, not a
                        third-party service
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Meeting capture and transcription</strong>
                      </td>
                      <td>Audio, video, transcripts</td>
                      <td>Fathom, Granola</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>AI model providers</strong>
                      </td>
                      <td>Content submitted for processing</td>
                      <td>Anthropic</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Cloud storage and productivity</strong>
                      </td>
                      <td>Documents, deliverables, engagement files</td>
                      <td>Box, Google Workspace</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Analytics and advertising</strong>
                      </td>
                      <td>Usage data, device data, IP address</td>
                      <td>
                        Google Analytics 4, Meta, LinkedIn, RB2B &mdash; see
                        Section 6
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Payments and invoicing</strong>
                      </td>
                      <td>Billing contact, transaction records</td>
                      <td>Stripe</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Providers change. For the current list applicable to your
                engagement, write to{" "}
                <a href="mailto:support@brandmultiplier.ai">
                  support@brandmultiplier.ai
                </a>{" "}
                and we will send it.
              </p>
            </section>

            <hr className="rule" />

            <section id="sharing">
              <h2 className="sec">
                <span className="num">12</span>Sharing and selling
              </h2>
              <div className="card">
                <p>
                  <strong>
                    We do not sell personal information. We have never sold
                    personal information. We do not share personal information
                    for cross-context behavioral advertising by third parties,
                    as those terms are defined under California, Colorado, and
                    comparable state privacy laws.
                  </strong>
                </p>
                <p>
                  <strong>
                    Phone numbers specifically are never sold, rented, shared
                    with lead buyers or affiliates, or passed to any third
                    party for that party&rsquo;s own marketing.
                  </strong>
                </p>
              </div>
              <p>
                We disclose personal information in exactly four situations:
              </p>
              <ul>
                <li>
                  <strong>To the service providers in Section 11</strong>,
                  limited to what each needs and bound by contract.
                </li>
                <li>
                  <strong>To professional advisers</strong> &mdash; lawyers,
                  accountants, insurers &mdash; where genuinely necessary and
                  under a duty of confidence.
                </li>
                <li>
                  <strong>Where the law requires it</strong>, including valid
                  subpoenas, court orders, and lawful government requests. We
                  will notify you unless legally prohibited.
                </li>
                <li>
                  <strong>In a business transaction.</strong> If
                  ChrisRubinCreativ, Inc. is acquired, merged, or reorganized,
                  personal information may transfer as part of the assets. Any
                  acquirer remains bound by this policy until it provides notice
                  of a change, and you will be notified before your information
                  becomes subject to a materially different policy.
                </li>
              </ul>
            </section>

            <hr className="rule" />

            <section id="retention">
              <h2 className="sec">
                <span className="num">13</span>How long we keep it
              </h2>
              <div className="tablewrap">
                <table>
                  <caption>Default retention periods</caption>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "44%" }}>
                        Category
                      </th>
                      <th scope="col">Retention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Marketing contacts and subscribers</td>
                      <td>
                        Until you unsubscribe or request deletion, then a
                        suppression-list entry indefinitely so we do not re-add
                        you.
                      </td>
                    </tr>
                    <tr>
                      <td>Lead-magnet and form submissions</td>
                      <td>
                        36 months from last engagement, then deleted or
                        aggregated.
                      </td>
                    </tr>
                    <tr>
                      <td>Phone numbers and call records</td>
                      <td>
                        Same as the contact record. Submission records showing
                        which form produced the number, and when, are kept for{" "}
                        <strong>5 years</strong>, because they are the evidence
                        that a call was warranted.
                      </td>
                    </tr>
                    <tr>
                      <td>Internal Do Not Call entries</td>
                      <td>
                        Indefinitely. Deleting a Do Not Call record would let
                        us call you again, which defeats the point.
                      </td>
                    </tr>
                    <tr>
                      <td>Prospect records that never converted</td>
                      <td>24 months from last activity.</td>
                    </tr>
                    <tr>
                      <td>Session recordings and transcripts</td>
                      <td>
                        Duration of the engagement plus 12 months, unless you
                        ask us to delete them sooner.
                      </td>
                    </tr>
                    <tr>
                      <td>Client deliverables and engagement files</td>
                      <td>
                        Duration of the engagement plus 7 years, or as your
                        services agreement specifies.
                      </td>
                    </tr>
                    <tr>
                      <td>Analytics and log data</td>
                      <td>Up to 26 months, per platform defaults.</td>
                    </tr>
                    <tr>
                      <td>Financial and tax records</td>
                      <td>7 years, as required by law.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Deletion requests are honored except where we are legally
                required to retain a record, where the information is needed to
                establish or defend a legal claim, or where it exists only in
                an encrypted backup &mdash; in which case it is deleted on the
                normal backup rotation and is not restored to active use in the
                interim.
              </p>
            </section>

            <hr className="rule" />

            <section id="security">
              <h2 className="sec">
                <span className="num">14</span>Security
              </h2>
              <ul>
                <li>
                  All traffic to and from brandmultiplier.ai is encrypted in
                  transit using TLS.
                </li>
                <li>
                  Data at rest in our cloud storage and vendor systems is
                  encrypted using the provider&rsquo;s standard encryption.
                </li>
                <li>
                  Multi-factor authentication is required on every account with
                  access to client or personal data.
                </li>
                <li>
                  Access is granted on a least-privilege basis and reviewed
                  when team composition changes.
                </li>
                <li>
                  Contractors and team members are bound by written
                  confidentiality obligations.
                </li>
                <li>
                  We select vendors that maintain recognized security programs
                  and we review their posture before granting them data.
                </li>
              </ul>
              <p>
                No system is perfectly secure, and any company claiming
                otherwise is selling something. If we discover a breach
                affecting your personal information, we will notify you and the
                relevant authorities within the timeframes the law requires,
                and we will tell you what happened rather than what sounds best.
              </p>
            </section>

            <hr className="rule" />

            <section id="transfers">
              <h2 className="sec">
                <span className="num">15</span>International transfers
              </h2>
              <p>
                We are based in Colorado, and our infrastructure is primarily
                in the United States. If you are outside the US, using our site
                or engaging us means your information is transferred to and
                processed in the United States, whose data-protection laws
                differ from those in your country.
              </p>
              <p>
                For transfers of personal information out of the UK, EEA, or
                Switzerland, we rely on the European Commission&rsquo;s
                Standard Contractual Clauses and the UK Addendum, incorporated
                into our agreements with the relevant providers, together with
                supplementary technical and organizational measures. A copy of
                the relevant transfer mechanism is available on request.
              </p>
            </section>

            <hr className="rule" />

            <section id="rights">
              <h2 className="sec">
                <span className="num">16</span>Your rights
              </h2>
              <div className="note">
                <span className="label">Our position on thresholds</span>
                <p>
                  Most US state privacy laws &mdash; including the Colorado
                  Privacy Act and the California Consumer Privacy Act &mdash;
                  apply only above volume thresholds that a firm of our size
                  does not meet. We are not going to hide behind that.{" "}
                  <strong>
                    We extend the rights below to every individual who asks,
                    regardless of where they live or whether a statute obliges
                    us.
                  </strong>{" "}
                  Where a law does apply to us, its provisions govern and this
                  section is the floor, not the ceiling.
                </p>
              </div>
              <h3>What you can ask for</h3>
              <ul>
                <li>
                  <strong>Know and access.</strong> A copy of the personal
                  information we hold about you, the categories, the sources,
                  the purposes, and the categories of recipient.
                </li>
                <li>
                  <strong>Correct.</strong> Fix anything inaccurate or
                  incomplete.
                </li>
                <li>
                  <strong>Delete.</strong> Erase your personal information,
                  subject to the exceptions in Section 13.
                </li>
                <li>
                  <strong>Port.</strong> Receive your information in a
                  portable, machine-readable format.
                </li>
                <li>
                  <strong>Opt out.</strong> Of marketing email, of marketing
                  calls and texts, of targeted advertising, of profiling, and
                  of any sale or sharing &mdash; noting that we do not sell or
                  share in the first place. Opting out of one channel does not
                  require you to opt out of the others, and you can ask us to
                  stop all of them at once.
                </li>
                <li>
                  <strong>Object and restrict.</strong> Object to processing
                  based on legitimate interests, or ask us to restrict
                  processing while a dispute is resolved.
                </li>
                <li>
                  <strong>Withdraw consent.</strong> At any time, for anything
                  based on consent.
                </li>
                <li>
                  <strong>Appeal.</strong> If we refuse a request, you may
                  appeal by replying to our decision. We will respond to the
                  appeal within 45 days with a written explanation.
                </li>
                <li>
                  <strong>Be treated the same.</strong> We will not
                  discriminate against you, degrade your service, or change
                  your pricing for exercising any of these rights.
                </li>
              </ul>
              <h3>How to exercise them</h3>
              <p>
                Email{" "}
                <a href="mailto:support@brandmultiplier.ai">
                  support@brandmultiplier.ai
                </a>{" "}
                with the request and the email address or other identifier
                associated with your information. We will acknowledge within 10
                business days and substantively respond within{" "}
                <strong>30 days</strong>, extendable once by a further 45 days
                where a request is complex, in which case we will tell you why
                before the first period expires.
              </p>
              <p>
                We may need to verify your identity before acting, particularly
                on deletion and access requests. Verification is proportionate
                to the sensitivity of the request; we will not demand a
                passport scan to remove you from a newsletter. An authorized
                agent may submit a request on your behalf with written
                authorization.
              </p>
              <h3>Complaints</h3>
              <p>
                Tell us first &mdash; we would rather fix it. If we do not
                resolve it, you may complain to the{" "}
                <strong>Colorado Attorney General</strong>, to your own state
                attorney general, or, in the UK and EEA, to your national
                supervisory authority or the UK Information Commissioner&rsquo;s
                Office.
              </p>
            </section>

            <hr className="rule" />

            <section id="children">
              <h2 className="sec">
                <span className="num">17</span>Children
              </h2>
              <p>
                Our services are built for businesses and are not directed to
                anyone under 18. We do not knowingly collect personal
                information from minors. If you believe a child has given us
                information, write to{" "}
                <a href="mailto:support@brandmultiplier.ai">
                  support@brandmultiplier.ai
                </a>{" "}
                and we will delete it.
              </p>
            </section>

            <hr className="rule" />

            <section id="changes">
              <h2 className="sec">
                <span className="num">18</span>Changes
              </h2>
              <p>
                We update this policy when our practices change. The effective
                date at the top always reflects the current version, and we
                maintain prior versions on request. For material changes
                &mdash; a new category of data, a new purpose, a new class of
                recipient &mdash; we will provide notice by email to
                subscribers and clients at least <strong>14 days</strong>{" "}
                before the change takes effect. Continuing to use the site
                after a change means you accept the updated policy.
              </p>
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
                  <dt>Privacy requests</dt>
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
                  <dt>Response time</dt>
                  <dd>
                    Acknowledgement within 10 business days; substantive
                    response within 30 days
                  </dd>
                </dl>
                <p style={{ marginTop: 32 }}>
                  <a className="btn" href="/terms">
                    Read the Terms of Use
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
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
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
.skip{position:absolute;left:-9999px;top:0;background:var(--purple);color:#fff;padding:12px 20px;border:0;z-index:99;}
.skip:focus{left:16px;top:16px;}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 24px;}
.masthead{position:sticky;top:0;z-index:80;border-bottom:1px solid var(--line);padding:18px 0;background:rgba(10,10,10,0.92);backdrop-filter:blur(8px);}
.masthead .wrap{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;}
.wordmark{border:0;text-decoration:none;display:inline-flex;align-items:center;}
.wordmark-logo{height:22px;width:auto;display:block;}
.mast-nav{display:flex;gap:28px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;font-weight:500;}
.mast-nav a{color:var(--text-2);border:0;text-decoration:none;}
.mast-nav a:hover{color:#fff;}
.mast-nav a[aria-current="page"]{color:#fff;}
.hero{padding:88px 0 56px;border-bottom:1px solid var(--line);}
.kicker{font-size:12px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--orange);margin:0 0 22px;}
h1{font-size:clamp(40px,6.2vw,69px);font-weight:500;line-height:1.06;letter-spacing:-.02em;margin:0 0 26px;color:var(--text);}
.standfirst{font-size:clamp(18px,2.2vw,22px);font-weight:300;color:var(--text-2);max-width:60ch;margin:0 0 34px;line-height:1.6;}
.meta{display:flex;flex-wrap:wrap;gap:10px 32px;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-3);font-weight:500;}
.meta strong{color:var(--text-2);font-weight:500;}
.layout{display:grid;grid-template-columns:1fr 260px;gap:72px;padding:64px 0 0;align-items:start;}
@media (max-width:900px){.layout{grid-template-columns:1fr;gap:0;padding-top:40px;}}
.content{grid-column:1;}
.toc{grid-column:2;position:sticky;top:96px;min-width:0;}
@media (max-width:900px){
  .toc{grid-column:auto;position:static;background:var(--surface);border:1px solid var(--line);border-radius:2px;padding:28px;margin-bottom:48px;}
}
.toc h2{font-size:11px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:var(--text-3);margin:0 0 18px;}
.toc ol{list-style:none;margin:0;padding:0;counter-reset:toc;}
.toc li{counter-increment:toc;margin:0 0 11px;font-size:14px;line-height:1.45;}
.toc a{color:var(--text-2);border:0;display:block;padding-left:30px;position:relative;text-decoration:none;}
.toc a::before{content:counter(toc,decimal-leading-zero);position:absolute;left:0;color:var(--text-3);font-variant-numeric:tabular-nums;font-weight:500;}
.toc a:hover{color:#fff;}
.toc a:hover::before{color:var(--purple-lift);}
.content{max-width:74ch;min-width:0;padding-bottom:40px;}
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
