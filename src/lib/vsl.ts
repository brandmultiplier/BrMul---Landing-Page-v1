export const VSL_HLS_URL =
  process.env.NEXT_PUBLIC_VSL_HLS_URL ??
  "https://media.brandmultiplier.ai/vsl/master.m3u8";

export const VSL_POSTER = "/vsl/poster.webp";
export const VSL_CAPTIONS = "/vsl/captions.en.vtt";
export const VSL_DURATION_ISO = "PT7M40S";
export const VSL_UPLOAD_DATE = "2026-08-21";
export const VSL_TITLE =
  "What BrandMultiplier installs — and what you'd hold at the end";
export const VSL_DESCRIPTION =
  "An eight-minute walkthrough of the BrandMultiplier system: the three free instruments, the Room Test, StoryLock, and what a founder holds after extract, codify, deploy, and tune.";

const SITE = "https://www.brandmultiplier.ai";

export function buildVslVideoLd(transcript: string) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: VSL_TITLE,
    description: VSL_DESCRIPTION,
    thumbnailUrl: `${SITE}${VSL_POSTER}`,
    uploadDate: VSL_UPLOAD_DATE,
    duration: VSL_DURATION_ISO,
    embedUrl: `${SITE}/resources#vsl`,
    contentUrl: VSL_HLS_URL,
    transcript,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: "BrandMultiplier",
      url: SITE,
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/brandmultiplier-logo.png`,
        width: 512,
        height: 512,
      },
    },
  };
}

export const VSL_CSS = `
.vsl-block{margin:0 0 28px;position:relative}
.vsl-player{position:relative;background:#111114;border:1px solid var(--line);border-radius:14px;overflow:hidden;aspect-ratio:16/9;cursor:pointer;width:100%;max-width:100%}
.vsl-player video{display:block;width:100%;height:100%;object-fit:contain;background:#111114;vertical-align:top}
.vsl-player__ui{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;pointer-events:none}
.vsl-player__center{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none}
.vsl-player__play{pointer-events:auto;width:72px;height:72px;border:0;border-radius:50%;background:var(--orange);color:#fff;cursor:pointer;box-shadow:0 8px 24px rgba(243,105,1,.35);display:flex;align-items:center;justify-content:center;transition:transform .16s ease,filter .16s ease}
.vsl-player__play:hover{transform:scale(1.05);filter:brightness(1.05)}
.vsl-player__play:focus-visible{outline:none;box-shadow:0 0 0 3px rgba(243,105,1,.45)}
.vsl-player__spinner{width:52px;height:52px;border:3px solid rgba(255,255,255,.22);border-top-color:var(--orange);border-radius:50%;animation:vsl-spin .65s linear infinite}
@keyframes vsl-spin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){.vsl-player__spinner{animation:none;opacity:.85}}
.vsl-player__bar{pointer-events:auto;display:flex;flex-wrap:nowrap;align-items:center;gap:8px;padding:10px 12px 12px;background:linear-gradient(180deg,transparent 0%,rgba(17,17,20,.82) 38%,rgba(17,17,20,.94) 100%);opacity:0;transition:opacity .18s ease}
.vsl-player:hover .vsl-player__bar,.vsl-player.is-paused .vsl-player__bar,.vsl-player.is-focused .vsl-player__bar{opacity:1}
.vsl-player__btn{appearance:none;border:0;background:transparent;color:#fff;font:inherit;font-size:13px;font-weight:700;cursor:pointer;padding:6px 8px;border-radius:6px;line-height:1;min-width:32px}
.vsl-player__btn--icon{display:inline-flex;align-items:center;justify-content:center;width:36px;min-width:36px;height:36px;padding:0}
.vsl-player__btn--icon svg{display:block;flex-shrink:0}
.vsl-player__btn:hover,.vsl-player__btn[aria-pressed="true"]{background:rgba(255,255,255,.12)}
.vsl-player__btn:focus-visible{outline:none;box-shadow:0 0 0 2px rgba(73,64,198,.7)}
.vsl-player__time{color:#fff;font-size:12px;font-variant-numeric:tabular-nums;font-weight:600;min-width:92px}
.vsl-player__scrub{flex:1 1 140px;height:6px;accent-color:var(--orange);cursor:pointer}
.vsl-player__menu{position:relative}
.vsl-player__menu-list{position:absolute;right:0;bottom:calc(100% + 6px);background:#1a1a1f;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:6px;min-width:72px;display:flex;flex-direction:column;gap:2px}
.vsl-player__menu-list button{appearance:none;border:0;background:transparent;color:#fff;font:inherit;font-size:13px;font-weight:700;text-align:left;padding:6px 8px;border-radius:5px;cursor:pointer}
.vsl-player__menu-list button[aria-checked="true"],.vsl-player__menu-list button:hover{background:rgba(73,64,198,.55)}
.vsl-player__cues{position:absolute;left:8%;right:8%;bottom:64px;display:flex;justify-content:center;pointer-events:none;z-index:1}
.vsl-player__cue{display:inline-block;max-width:100%;padding:5px 12px;border-radius:6px;background:rgba(17,17,20,.82);color:#fff;font-size:15px;font-weight:600;line-height:1.35;text-align:center;text-wrap:balance}
.vsl-player video::cue{opacity:0}
.vsl-player__error{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;background:#111114;padding:24px;text-align:center;font-size:15px}
.vsl-transcript{margin:14px 0 0;border:1px solid var(--line);border-radius:12px;background:#fff}
.vsl-transcript summary{cursor:pointer;list-style:none;padding:12px 16px;font-size:14px;font-weight:700;color:var(--purple)}
.vsl-transcript summary::-webkit-details-marker{display:none}
.vsl-transcript summary::after{content:" +";font-weight:700}
.vsl-transcript[open] summary::after{content:" –"}
.vsl-transcript__body{padding:0 16px 16px;display:flex;flex-direction:column;gap:10px;max-height:320px;overflow:auto}
.vsl-transcript__line{appearance:none;border:0;background:transparent;text-align:left;padding:8px 10px;border-radius:8px;cursor:pointer;font:inherit;font-size:15px;line-height:1.5;color:var(--ink)}
.vsl-transcript__line:hover,.vsl-transcript__line.is-active{background:var(--lav)}
.vsl-transcript__time{display:inline-block;font-size:12px;font-weight:700;color:var(--purple);margin-right:8px;font-variant-numeric:tabular-nums}
/* Keep cue text in the HTML for crawlers/models. Never paint the UI. */
.vsl-transcript--for-ai{
  position:absolute !important;
  left:-10000px;
  top:auto;
  width:1px;
  height:1px;
  overflow:hidden;
  clip-path:inset(50%);
  white-space:nowrap;
  border:0;
  padding:0;
  margin:0;
}
.vsl-pointer{margin:28px 0 8px;padding:16px 18px;border:1px solid var(--lav2);border-left:4px solid var(--purple);border-radius:10px;background:var(--lav)}
.vsl-pointer__k{font-size:11px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase;color:var(--purple);margin:0 0 6px}
.vsl-pointer p{margin:0;font-size:15px;line-height:1.5;color:#33333a}
.vsl-pointer a{color:var(--purple);font-weight:700;text-decoration:underline;text-underline-offset:2px}
.library-vsl-slot{max-width:960px;margin:0 auto;padding:calc(var(--site-head-h) + 8px) 24px 0}
@media (max-width:720px){
  .library-vsl-slot{padding:calc(var(--site-head-h) + 8px) 16px 0}
  .vsl-player{border-radius:10px}
  .vsl-player__play{width:56px;height:56px}
  .vsl-player__bar{gap:2px;padding:8px 8px 10px}
  .vsl-player__btn{min-width:28px;padding:4px 6px;font-size:12px}
  .vsl-player__btn--icon{width:32px;min-width:32px;height:32px}
  .vsl-player__time{min-width:0;font-size:11px;flex:none}
  .vsl-player__scrub{flex:1 1 0;min-width:40px}
  .vsl-player__cues{bottom:52px;left:4%;right:4%}
  .vsl-player__cue{font-size:13px;padding:4px 9px}
}
@media (max-width:380px){
  .vsl-player__time-dur,.vsl-player__time-sep{display:none}
}
`;

export const VSL_STRIP_CSS = `
.bm-strip{margin:4px 0 28px;padding:8px 0 4px}
.bm-strip__eyebrow{font-size:13px;font-weight:700;letter-spacing:1.82px;text-transform:uppercase;color:var(--purple);margin:0 0 10px}
.bm-strip__head{font-size:26px;font-weight:800;letter-spacing:-0.3px;line-height:1.2;color:var(--ink);margin:0 0 8px}
.bm-strip__sub{font-size:16px;font-weight:400;line-height:1.55;color:var(--gray);margin:0 0 22px;max-width:620px}
.bm-tools{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:20px}
a.bm-tool{display:flex;flex-direction:column;background:#fff;border:1px solid var(--line);border-radius:14px;padding:20px 22px;text-decoration:none;color:var(--ink);transition:border-color .16s ease,transform .16s ease,box-shadow .16s ease;min-height:100%}
a.bm-tool:hover,a.bm-tool:focus-visible{border-color:var(--purple);transform:translateY(-2px);box-shadow:0 6px 18px rgba(73,64,198,.10);outline:none;color:var(--ink);text-decoration:none}
a.bm-tool:focus-visible{box-shadow:0 0 0 3px rgba(73,64,198,.28)}
.bm-tool__eyebrow{font-size:11px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase;color:var(--purple);margin:0 0 8px;display:flex;align-items:center;gap:7px}
.bm-tool__num{font-variant-numeric:tabular-nums;color:#fff;background:var(--purple);border-radius:4px;padding:2px 5px;font-size:10px;letter-spacing:.5px}
.bm-tool__title{font-size:19px;font-weight:700;letter-spacing:-0.2px;line-height:1.25;color:var(--ink);margin:0 0 8px}
.bm-tool__body{font-size:14.5px;font-weight:400;line-height:1.55;color:var(--gray);margin:0 0 16px;flex:1 1 auto}
.bm-tool__go{font-size:14px;font-weight:700;color:var(--purple);display:inline-flex;align-items:center;gap:6px}
.bm-tool__go svg{transition:transform .16s ease}
a.bm-tool:hover .bm-tool__go svg{transform:translateX(3px)}
.bm-diag{display:flex;align-items:center;justify-content:space-between;gap:24px;background:var(--lav);border:1px solid var(--lav2);border-left:4px solid var(--purple);border-radius:14px;padding:22px 26px}
.bm-diag__copy{max-width:600px}
.bm-diag__label{font-size:11px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase;color:var(--purple);margin:0 0 6px}
.bm-diag__title{font-size:19px;font-weight:700;letter-spacing:-0.2px;color:var(--ink);margin:0 0 6px}
.bm-diag__body{font-size:14.5px;line-height:1.55;color:var(--gray);margin:0}
a.bm-diag__btn{flex:0 0 auto;background:var(--orange);color:#fff;font-size:16px;font-weight:700;padding:15px 26px;border-radius:10px;text-decoration:none;white-space:nowrap;box-shadow:0 6px 18px rgba(243,105,1,.24);transition:transform .16s ease,box-shadow .16s ease}
a.bm-diag__btn:hover{transform:translateY(-1px);box-shadow:0 8px 22px rgba(243,105,1,.32);color:#fff;text-decoration:none}
a.bm-diag__btn:focus-visible{outline:none;box-shadow:0 0 0 3px rgba(243,105,1,.35)}
.bm-strip__rule{border:0;border-top:1px solid var(--line);margin:34px 0 0}
@media (max-width:860px){
  .bm-tools{grid-template-columns:1fr}
  .bm-diag{flex-direction:column;align-items:flex-start;padding:18px 18px;gap:16px}
  a.bm-diag__btn{width:100%;text-align:center}
  .bm-strip__head{font-size:22px}
  .bm-strip__sub{font-size:15px;margin-bottom:18px}
}
`;
