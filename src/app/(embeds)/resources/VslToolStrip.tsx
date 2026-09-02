import { CTA_LABEL, calendlyHref } from "@/lib/cta";

const ARROW = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 7h9M7.5 3.5 11 7l-3.5 3.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TOOLS = [
  {
    // Always the library-gated twin: the tool page gates itself on the
    // bm_library cookie, so it never sends a known lead through a second ask.
    href: "/storylock-tax-tool",
    gatedHref: "/storylock-tax-tool",
    num: "01",
    eyebrow: "Calculator",
    title: "The StoryLock Tax",
    body: "Put a number on what the gap between your story and your team's costs you over a year.",
    go: "Run the numbers",
  },
  {
    href: "/extraction-instrument",
    gatedHref: "/extraction-instrument?gate=1",
    num: "02",
    eyebrow: "Instrument",
    title: "The Uncopyable-Asset Instrument",
    body: "Four prompts. A first pass at the thing competitors can't copy, and an honest read on whether your team could carry it without you.",
    go: "Answer four prompts",
  },
  {
    href: "/protagonist-map",
    gatedHref: "/protagonist-map",
    num: "03",
    eyebrow: "Map",
    title: "The Multi-Protagonist Map",
    body: "Eight to thirteen people have to say yes. Work out what each of them actually needs to hear.",
    go: "Build your map",
  },
] as const;

export default function VslToolStrip({
  ctaSlug = "resources-index",
  embedded = false,
  gated = false,
}: {
  ctaSlug?: string;
  embedded?: boolean;
  gated?: boolean;
} = {}) {
  const diagnosticHref = calendlyHref({
    slug: ctaSlug,
    placement: "vsl_strip",
  });

  return (
    <section className="bm-strip" aria-labelledby="bm-strip-head">
      <p className="bm-strip__eyebrow">The three instruments</p>
      <h2 className="bm-strip__head" id="bm-strip-head">
        Run one on your own company.
      </h2>
      <p className="bm-strip__sub">
        Each takes a few minutes and gives you something you keep — whether or
        not we ever speak.
      </p>

      <div className="bm-tools">
        {TOOLS.map((tool) => (
          <a key={tool.href} className="bm-tool" href={gated ? tool.gatedHref : tool.href}>
            <p className="bm-tool__eyebrow">
              <span className="bm-tool__num">{tool.num}</span> {tool.eyebrow}
            </p>
            <h3 className="bm-tool__title">{tool.title}</h3>
            <p className="bm-tool__body">{tool.body}</p>
            <span className="bm-tool__go">
              {tool.go}
              {ARROW}
            </span>
          </a>
        ))}
      </div>

      <div className="bm-diag">
        <div className="bm-diag__copy">
          <p className="bm-diag__label">The Diagnostic</p>
          <h3 className="bm-diag__title">Or have me run it with you.</h3>
          <p className="bm-diag__body">
            Thirty minutes. I run the instrument on your real content before we
            speak, you see the read live, and you keep it either way.
          </p>
        </div>
        <a
          className="bm-diag__btn"
          href={diagnosticHref}
          data-cta="vsl_strip"
        >
          {CTA_LABEL}
        </a>
      </div>

      {embedded ? null : <hr className="bm-strip__rule" />}
    </section>
  );
}
