'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import './nos-architecture.css';

const BOOKING_URL =
  'https://calendly.com/book-crc/storyline/?utm_source=brandmultiplier&utm_medium=internal&utm_campaign=nos-architecture';

interface TourStep {
  selectors: string[];
  step: string;
  html: string;
  cta?: boolean;
}

const TOUR_STEPS: TourStep[] = [
  {
    selectors: ['[data-tour="l04"]', '[data-tour="l03"]', '[data-tour="l02"]', '[data-tour="l01"]', '[data-tour="operate"]'],
    step: 'The system',
    html: 'Meet <b>NOS</b>\u2014a narrative operating system we\u2019ve been building since 2023. Not one or two layers: the whole system, grounded in cognitive science and built for founder-led B2B, not the Fortune 500.',
  },
  {
    selectors: ['[data-tour="l01"]'],
    step: 'The foundation',
    html: 'Start at the bottom. We <b>extract</b> your story\u2014founder conviction, customer reality, the movement you lead\u2014and encode it so people and agents work from one source of truth. The brand code is just the part the agents read.',
  },
  {
    selectors: ['[data-tour="l04"]', '[data-tour="l03"]', '[data-tour="l02"]'],
    step: 'The working layers',
    html: 'Above it, a <b>coordinated team of agents</b> produces the work, an orchestration layer runs the methodology and gates quality, and the interface is where your team steers\u2014inside tools you already use.',
  },
  {
    selectors: ['[data-tour="conn"]'],
    step: 'Always tuning',
    html: 'These layers never sit still. They <b>iterate and optimize across one another, continuously</b>\u2014the system is always tuning itself, in both directions.',
  },
  {
    selectors: ['[data-tour="timeline"]'],
    step: 'How it\u2019s delivered',
    html: 'Delivery is two phases. <b>Installation</b> runs 75 days, services and system concurrent\u2014by Day 75 it\u2019s producing. Then <b>Operate</b>, ongoing. The team that builds it is the team that runs it.',
  },
  {
    selectors: ['[data-tour="operate"]'],
    step: 'Who runs it',
    cta: true,
    html: 'Which leaves the question every founder asks: <b>who runs this after install?</b> That\u2019s Operate\u2014DIY, DWY, or DFY. Step up or down as your team changes. This is the part an internal hire can\u2019t simply pick up.',
  },
];

export default function NosArchitectureClient() {
  const [openLayers, setOpenLayers] = useState<Set<string>>(new Set());
  const [openTiers, setOpenTiers] = useState<Set<number>>(new Set());
  const [hbrOpen, setHbrOpen] = useState(false);
  const [touring, setTouring] = useState(false);
  const [tourIdx, setTourIdx] = useState(0);
  const [showReplay, setShowReplay] = useState(false);
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [stepDefText, setStepDefText] = useState('Tap a phase to see what happens inside it.');
  const [operateFlash, setOperateFlash] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const operateRef = useRef<HTMLElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLElement>(null);

  const layerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const connRefs = useRef<HTMLButtonElement[]>([]);

  const toggleLayer = (id: string) => {
    setOpenLayers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleTier = (idx: number) => {
    setOpenTiers(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const handleDeeplink = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenTiers(new Set([0, 1, 2]));
    operateRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setOperateFlash(true);
  };

  const handleStepClick = (def: string, name: string) => {
    setActiveStep(name);
    setStepDefText(def);
  };

  // Tour logic
  const startTour = useCallback(() => {
    setTouring(true);
    setTourIdx(0);
    setShowReplay(false);
  }, []);

  const endTour = useCallback(() => {
    setTouring(false);
    setShowReplay(true);
  }, []);

  const nextStep = useCallback(() => {
    if (tourIdx < TOUR_STEPS.length - 1) {
      setTourIdx(prev => prev + 1);
    } else {
      endTour();
    }
  }, [tourIdx, endTour]);

  const prevStep = useCallback(() => {
    if (tourIdx > 0) setTourIdx(prev => prev - 1);
  }, [tourIdx]);

  // Scroll to the first highlighted element when tour step changes
  useEffect(() => {
    if (!touring) return;

    const step = TOUR_STEPS[tourIdx];
    const firstSelector = step.selectors[0];
    const el = wrapRef.current?.querySelector(firstSelector) as HTMLElement | null;
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    }
  }, [touring, tourIdx]);

  // Keyboard navigation for tour
  useEffect(() => {
    if (!touring) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') endTour();
      else if (e.key === 'ArrowRight') nextStep();
      else if (e.key === 'ArrowLeft') prevStep();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [touring, nextStep, prevStep, endTour]);

  const isSpotlit = (tourAttr: string): boolean => {
    if (!touring) return false;
    const step = TOUR_STEPS[tourIdx];
    return step.selectors.some(s => s === `[data-tour="${tourAttr}"]`);
  };

  const currentStep = TOUR_STEPS[tourIdx];

  return (
    <div className={`nos-page${touring ? ' touring' : ''}`} ref={wrapRef}>
      {/* Scrim overlay */}
      <div className="scrim" />

      <div className="nos-wrap">
        {/* HERO */}
        <header>
          <div className="eyebrow">NOS Architecture &nbsp;·&nbsp; Founder-led B2B, $3–50M ARR</div>
          <h1>The Narrative Operating System</h1>
          <p className="deck">A narrative operating system for founder-led B2B—grounded in cognitive science, in development since 2023.</p>
          <p className="caption">
            We&apos;ve been building NOS—and quietly defining its category—since 2023: a system grounded in cognitive science and built for the way B2B deals actually work—many stakeholders, many arcs, one story. When <i>Harvard Business Review</i> named the agentic-marketing category in May 2026, it described the <b>middle</b> of what we&apos;d already built. It doesn&apos;t name the foundation beneath it, or the <span className="o">Operate layer</span> that runs and tunes the whole system. That part is ours.
          </p>
          <div className="controls">
            <button className="btn btn-primary" onClick={startTour}>▶&nbsp; Take the guided tour</button>
            <button className="btn btn-ghost" onClick={() => {
              if (touring) endTour();
              systemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}>Explore freely</button>
          </div>
        </header>

        {/* WHY NOW */}
        <section className="whynow">
          <div className="wn-h">Why now — the Post-Code Economy</div>
          <div className="wn-thesis">As AI commoditizes execution, <em>story becomes the last defensible advantage.</em></div>
          <div className="stats">
            <div className="stat">
              <div className="fig">30%+</div>
              <div className="lab">of new code is now AI-written</div>
              <div className="src">GitHub, 2024</div>
            </div>
            <div className="stat">
              <div className="fig">300M</div>
              <div className="lab">jobs projected to be disrupted by AI</div>
              <div className="src">Goldman Sachs</div>
            </div>
            <div className="stat">
              <div className="fig">−27.5%</div>
              <div className="lab">decline in programming job postings</div>
              <div className="src">Indeed</div>
            </div>
          </div>
          <div className="wn-foot">And creative thinking now outranks technical AI skill in employer demand—World Economic Forum, Future of Jobs 2025. When the work gets automated, the story is what&apos;s left to compete on.</div>
        </section>

        {/* GROUNDWORK */}
        <section className="ground">
          <div className="section-h">The Groundwork · Building Since 2023</div>
          <p className="g-lead">NOS didn&apos;t start with the category. We&apos;ve been building it since 2023—on three things the agentic-marketing conversation still skips:</p>
          <div className="cols">
            <div className="col">
              <div className="c-h">Grounded in cognitive science</div>
              <div className="c-b">A five-phase model of how attention, memory and decision actually work—backed by 38+ peer-reviewed studies, not a content calendar.</div>
            </div>
            <div className="col">
              <div className="c-h">Built for B2B&apos;s real complexity</div>
              <div className="c-b">Every deal has many stakeholders, each needing their own arc. NOS treats the buying committee as first-class, not an afterthought.</div>
            </div>
            <div className="col">
              <div className="c-h">A methodology, not a template</div>
              <div className="c-b">We extract your story through a proprietary process. Most tools hand you a blank form. We don&apos;t.</div>
            </div>
          </div>
        </section>

        {/* SYSTEM */}
        <div className="system" ref={systemRef}>
          <div className="legend">
            <svg width="14" height="22" viewBox="0 0 16 34"><line x1="8" y1="6" x2="8" y2="28" stroke="currentColor" strokeWidth="2" /><path d="M8 0 L3 7 H13 Z" fill="currentColor" /><path d="M8 34 L3 27 H13 Z" fill="currentColor" /></svg>
            Layers continuously iterate &amp; optimize across one another. Tap any layer to open it.
          </div>

          <div className="grid">
            {/* LAYERS */}
            <div className="layers">
              {/* Layer 04 - Interface */}
              <div
                data-tour="l04"
                ref={el => { layerRefs.current['l04'] = el; }}
                className={`layer l04${openLayers.has('l04') ? ' open' : ''}${isSpotlit('l04') ? ' spot' : ''}`}
                onClick={() => toggleLayer('l04')}
              >
                <div className="layer-head">
                  <div className="lnum">04</div>
                  <div className="lmeta">
                    <div className="lidx">Control</div>
                    <div className="ltitle">Interface</div>
                    <div className="lsub">Where your team directs the system—inside the tools you already use.</div>
                  </div>
                  <div className="chev">▾</div>
                </div>
                <div className="detail">
                  <p>The surface where humans steer the machine — embedded in the stack you already live in. No new dashboard to adopt, no new habit to build.</p>
                  <div className="chips">
                    <span className="chip">Slack</span>
                    <span className="chip">Notion</span>
                    <span className="chip">Email</span>
                    <span className="chip">CRM</span>
                  </div>
                  <button type="button" className="deeplink" onClick={handleDeeplink}>
                    Who operates it depends on your Operate tier → see the Operate options. The real answer to &quot;we&apos;ll just hire someone internal.&quot;
                  </button>
                </div>
              </div>

              {/* Connector */}
              <button
                data-tour="conn"
                ref={el => { if (el) connRefs.current[0] = el; }}
                className={`conn${isSpotlit('conn') ? ' spot' : ''}`}
                aria-label="The layers continuously iterate and optimize across one another"
              >
                <span className="tip">Continuous iteration &amp; optimization</span>
                <svg width="16" height="34" viewBox="0 0 16 34"><line x1="8" y1="6" x2="8" y2="28" stroke="currentColor" strokeWidth="2.4" /><path d="M8 0 L3 7 H13 Z" fill="currentColor" /><path d="M8 34 L3 27 H13 Z" fill="currentColor" /></svg>
              </button>

              {/* Layer 03 - Orchestration */}
              <div
                data-tour="l03"
                ref={el => { layerRefs.current['l03'] = el; }}
                className={`layer l03${openLayers.has('l03') ? ' open' : ''}${isSpotlit('l03') ? ' spot' : ''}`}
                onClick={() => toggleLayer('l03')}
              >
                <div className="layer-head">
                  <div className="lnum">03</div>
                  <div className="lmeta">
                    <div className="lidx">Coordination</div>
                    <div className="ltitle">Orchestration</div>
                    <div className="lsub">Runs the methodology, routes the agents, and gates quality before anything ships.</div>
                  </div>
                  <div className="chev">▾</div>
                </div>
                <div className="detail">
                  <p>The orchestration layer runs our build-and-operate methodology end to end—routing work across the agent team, enforcing your business rules, escalating to a human the moment judgment is required, and holding every piece to a quality bar before it leaves the building.</p>
                  <div className="chips">
                    <span className="chip">Routing</span>
                    <span className="chip">Governance</span>
                    <span className="chip">Escalation</span>
                    <span className="chip">Quality gates</span>
                  </div>
                </div>
              </div>

              {/* Connector */}
              <button
                data-tour="conn"
                ref={el => { if (el) connRefs.current[1] = el; }}
                className={`conn${isSpotlit('conn') ? ' spot' : ''}`}
                aria-label="The layers continuously iterate and optimize across one another"
              >
                <span className="tip">Continuous iteration &amp; optimization</span>
                <svg width="16" height="34" viewBox="0 0 16 34"><line x1="8" y1="6" x2="8" y2="28" stroke="currentColor" strokeWidth="2.4" /><path d="M8 0 L3 7 H13 Z" fill="currentColor" /><path d="M8 34 L3 27 H13 Z" fill="currentColor" /></svg>
              </button>

              {/* Layer 02 - Execution */}
              <div
                data-tour="l02"
                ref={el => { layerRefs.current['l02'] = el; }}
                className={`layer l02${openLayers.has('l02') ? ' open' : ''}${isSpotlit('l02') ? ' spot' : ''}`}
                onClick={() => toggleLayer('l02')}
              >
                <div className="layer-head">
                  <div className="lnum">02</div>
                  <div className="lmeta">
                    <div className="lidx">Production</div>
                    <div className="ltitle">Execution</div>
                    <div className="lsub">A coordinated team of specialized agents—on-brand from the first draft.</div>
                  </div>
                  <div className="chev">▾</div>
                </div>
                <div className="detail">
                  <p>Not one general-purpose model doing everything. A team of purpose-built agents, each owning a workstream and drawing from your encoded story, coordinated by the orchestrator above. They produce on-brief before a human ever touches the work.</p>
                  <div className="chips">
                    <span className="chip">Intelligence &amp; Ideation</span>
                    <span className="chip">Content Creation</span>
                    <span className="chip">Research &amp; Testing</span>
                    <span className="chip">Distribution</span>
                    <span className="chip">Performance &amp; Reporting</span>
                  </div>
                  <span className="note">A coordinated agent team under one orchestrator—a team, not a tool.</span>
                </div>
              </div>

              {/* Connector */}
              <button
                data-tour="conn"
                ref={el => { if (el) connRefs.current[2] = el; }}
                className={`conn${isSpotlit('conn') ? ' spot' : ''}`}
                aria-label="The layers continuously iterate and optimize across one another"
              >
                <span className="tip">Continuous iteration &amp; optimization</span>
                <svg width="16" height="34" viewBox="0 0 16 34"><line x1="8" y1="6" x2="8" y2="28" stroke="currentColor" strokeWidth="2.4" /><path d="M8 0 L3 7 H13 Z" fill="currentColor" /><path d="M8 34 L3 27 H13 Z" fill="currentColor" /></svg>
              </button>

              {/* Layer 01 - Encoded Brand Code */}
              <div
                data-tour="l01"
                ref={el => { layerRefs.current['l01'] = el; }}
                className={`layer l01${openLayers.has('l01') ? ' open' : ''}${isSpotlit('l01') ? ' spot' : ''}`}
                onClick={() => toggleLayer('l01')}
              >
                <div className="layer-head">
                  <div className="lnum">01</div>
                  <div className="lmeta">
                    <div className="lidx">Foundation</div>
                    <div className="ltitle">Encoded Brand Code</div>
                    <div className="lsub">The machine-readable story everything else runs on—the output of a deep extraction, not a template.</div>
                  </div>
                  <div className="chev">▾</div>
                </div>
                <div className="detail">
                  <p>We extract the founder&apos;s conviction, the customer&apos;s reality, and the movement the company is leading, then encode it so people and agents act from one source of truth. The same extraction produces your sales narrative, your team&apos;s enablement, and a closed measurement loop that scores every piece before it ships and tracks how far your story travels in the market—the brand code is just the part the agents read.</p>
                  <div className="tagline">One of several outputs of the Storyline method—our extraction process, not a fill-in-the-blanks form.</div>
                </div>
              </div>
            </div>

            {/* OPERATE */}
            <aside
              data-tour="operate"
              ref={operateRef}
              className={`operate${isSpotlit('operate') ? ' spot' : ''}${operateFlash ? ' flash' : ''}`}
              onAnimationEnd={() => setOperateFlash(false)}
            >
              <div className="op-h">OPERATE</div>
              <div className="op-sub">The post-install meta-layer</div>
              <div className="op-runs">Runs &amp; tunes every layer · 04 03 02 01</div>
              <div className="op-rule" />

              {[
                { name: 'DIY', line: 'You operate. We run quarterly tune-ups & audits.', detail: 'Your team holds the day-to-day; we keep the system sharp on a quarterly cadence and refresh the methodology.', fit: 'Best fit: teams with in-house capacity.' },
                { name: 'DWY', line: 'Shared. We run the agents; you steer.', detail: 'We operate the multi-agent layer and continuous production; you keep strategic direction. Quarterly recalibration built in.', fit: 'Best fit: execution muscle, no AI infrastructure.' },
                { name: 'DFY', line: 'We run it all. You close deals.', detail: 'Full operation — content engine, signal scanning, outcome tuning, voice production. The system runs; you don\u2019t.', fit: 'Best fit: founders who want the system, not the maintenance.' },
              ].map((t, i) => (
                <div
                  key={t.name}
                  className={`tier${openTiers.has(i) ? ' open' : ''}`}
                  onClick={() => toggleTier(i)}
                >
                  <div className="tier-top">
                    <span className="tier-name">{t.name}</span>
                  </div>
                  <div className="tier-line">{t.line}</div>
                  <div className="tier-more">
                    <p>{t.detail}</p>
                    <div className="fit">{t.fit}</div>
                  </div>
                </div>
              ))}

              <div className="op-rule" />
              <div className="op-foot">Step up or down at quarter boundaries.</div>
            </aside>
          </div>
        </div>

        {/* TIMELINE */}
        <section className={`timeline${isSpotlit('timeline') ? ' spot' : ''}`} data-tour="timeline" ref={timelineRef}>
          <div className="section-h">
            Engagement Model—The Storyline Method <span className="muted">· our extraction methodology, grounded in cognitive science (38+ peer-reviewed studies)</span>
          </div>
          <div className="track">
            <div className="phase p1">
              <div className="phase-name">PHASE 1 — INSTALLATION</div>
              <div className="phase-sub">75 days · services + system run concurrently</div>
              <div className="steps">
                {[
                  { name: 'UNLOCK', def: 'Discovery, qualification, and the free diagnostic.' },
                  { name: 'RUMBLE', def: 'The 3-hour design-thinking workshop with founders in the room—the extraction event.' },
                  { name: 'ARCHITECT', def: 'Distillation and codification of what the Rumble surfaced.' },
                  { name: 'INSTALL', def: 'Encoding the codified story into the systems, agents, and interfaces.' },
                ].map((s, i) => (
                  <span key={s.name} style={{ display: 'contents' }}>
                    {i > 0 && <span className="arrow">→</span>}
                    <button
                      className={`step${activeStep === s.name ? ' active' : ''}`}
                      onClick={() => handleStepClick(s.def, s.name)}
                    >
                      {s.name}
                    </button>
                  </span>
                ))}
              </div>
              <div className="step-def">{stepDefText}</div>
            </div>
            <div className="day75">
              <div className="d75-line" />
              <div className="d75-tag">DAY 75 · PRODUCING</div>
            </div>
            <div className="phase p2">
              <div className="phase-name">PHASE 2 — OPERATE</div>
              <div className="phase-sub">ongoing</div>
              <div className="steps">
                <button
                  className={`step tune${activeStep === 'TUNE' ? ' active' : ''}`}
                  onClick={() => handleStepClick('Post-install operation and optimization—monthly runs, quarterly recalibration. We measure both the quality of every piece before it ships and how far your story travels in the market.', 'TUNE')}
                >
                  TUNE
                </button>
              </div>
              <div className="p2-line">The team that builds it is the team that runs it.</div>
            </div>
          </div>
        </section>

        {/* META */}
        <section className="meta">
          <div>
            <div className="section-h">Deployment Patterns</div>
            <div className="pattern">
              <span className="pat-tag pat-std">STANDARD</span>
              <span className="pat-name">Brand-narrative NOS</span>
              <div className="pat-desc">Extract the founder &amp; company story; deploy it across the entire business.</div>
            </div>
            <div className="pattern">
              <span className="pat-tag pat-var">VARIANT</span>
              <span className="pat-name">Engagement-narrative NOS</span>
              <div className="pat-desc">Build a system that narrativizes case studies for a defined downstream sales audience.</div>
            </div>
          </div>

          <div>
            <div className="section-h">Before the Category Had a Name</div>
            <button className={`hbr-toggle${hbrOpen ? ' open' : ''}`} onClick={() => setHbrOpen(!hbrOpen)}>
              <span>Where NOS and HBR&apos;s agentic model (May 2026) line up—and where they don&apos;t</span>
              <span className="chev">▾</span>
            </button>
            <div className="hbr-body">
              <p className="map-intro">A category isn&apos;t named into existence—it&apos;s <b>built</b> into existence. HBR named the agentic-marketing category in 2026; we&apos;d been building it, narrative-first and for founder-led B2B, since 2023. The middle three layers line up because we were solving this before the market had words for it—the foundation beneath and the Operate layer above are the parts the words still don&apos;t reach.</p>
              <div className="map-row"><span className="map-nos">04 Interface</span><span className="map-eq">↔</span><span className="map-hbr">Interface layer <i>(NOS adds operator-by-tier)</i></span></div>
              <div className="map-row"><span className="map-nos">03 Orchestration</span><span className="map-eq">↔</span><span className="map-hbr">Orchestration layer</span></div>
              <div className="map-row"><span className="map-nos">02 Execution</span><span className="map-eq">↔</span><span className="map-hbr">Execution · five workstreams</span></div>
              <div className="map-row"><span className="map-nos">01 Encoded Brand Code</span><span className="map-eq">↔</span><span className="map-hbr">Brand code <i>(HBR&apos;s deliverable; for us, one encoded output of a deeper methodology)</i></span></div>
              <div className="map-diff"><b>What the category doesn&apos;t describe:</b> the cognitive-science foundation and extraction methodology beneath the stack, the Operate layer that runs and tunes the whole system, and a closed measurement loop—scoring quality before anything ships, tracking how far the story travels after—that most stacks never build. HBR describes an agentic marketing <i>organization</i> built for the enterprise. NOS is the <i>machine</i> for founder-led B2B—and it predates the article.</div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <div className="foot-l">© 2026 BrandMultiplier · The Narrative Operating System—in development since 2023, built for founder-led B2B.</div>
          <div className="foot-r">
            BRANDMULTIPLIER &nbsp;{' '}
            <a href="https://brandmultiplier.ai" target="_blank" rel="noopener noreferrer">brandmultiplier.ai</a>
          </div>
        </footer>
      </div>

      {/* TOUR CARD */}
      <div className="tourcard">
        <button className="tc-exit" onClick={endTour} aria-label="Exit tour">✕</button>
        <div className="tc-step">Step {tourIdx + 1} of {TOUR_STEPS.length}</div>
        <div className="tc-text" dangerouslySetInnerHTML={{ __html: currentStep.html }} />
        <div className={`tc-cta${currentStep.cta ? ' visible' : ''}`}>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a walkthrough →
          </a>
        </div>
        <div className="tc-bottom">
          <div className="dots">
            {TOUR_STEPS.map((_, i) => (
              <div key={i} className={`dot${i === tourIdx ? ' on' : ''}`} />
            ))}
          </div>
          <div className="tc-btns">
            <button
              className="tcb tcb-back"
              onClick={prevStep}
              style={{ visibility: tourIdx === 0 ? 'hidden' : 'visible' }}
            >
              Back
            </button>
            <button className="tcb tcb-next" onClick={nextStep}>
              {tourIdx === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>

      {/* Replay button */}
      <button className={`replay-btn${showReplay ? ' visible' : ''}`} onClick={startTour}>
        ↻ Replay tour
      </button>

      {/* Booking CTA */}
      <a className="book-cta" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
          <line x1="3" y1="9.5" x2="21" y2="9.5" />
          <line x1="8" y1="2.5" x2="8" y2="6" />
          <line x1="16" y1="2.5" x2="16" y2="6" />
        </svg>
        Book a walkthrough
      </a>
    </div>
  );
}
