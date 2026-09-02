import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import {
  RESOURCE_CSS,
  RESOURCE_LOGO,
  RESOURCE_NEW_TAB,
} from "../(embeds)/resources/_shared";
import VslToolStrip from "../(embeds)/resources/VslToolStrip";
import { VSL_CSS, VSL_STRIP_CSS, buildVslVideoLd } from "@/lib/vsl";
import VslBlock from "@/components/vsl/VslBlock";
import LibraryForm from "./LibraryForm";
import LegalLinks from "@/components/legal/LegalLinks";
import {
  VSL_TRANSCRIPT,
  VSL_TRANSCRIPT_TEXT,
} from "../(embeds)/resources/vsl-transcript";

export const metadata: Metadata = {
  title: "Access the Library — BrandMultiplier",
  description:
    "One quick form to unlock the BrandMultiplier resource library: narrative infrastructure diagnostics for founder-led B2B companies.",
  robots: {
    index: false,
    follow: true,
  },
};

const LIBRARY_CSS = `
.library-wrap{max-width:960px;margin:0 auto;padding:calc(var(--site-head-h) + 8px) 24px 60px}
.library-lead{font-size:19px;color:#33333a;margin:0 0 22px;max-width:640px}
.library-panel{background:#fff;border:1px solid var(--line);border-radius:16px;padding:26px 26px 28px;box-shadow:0 8px 26px rgba(73,64,198,.06)}
.library-panel .bm-strip{margin:0;padding:0}
.library-panel .bm-strip__head{font-size:22px}
.library-panel .bm-tools{margin-bottom:16px}
.library-panel .bm-diag{margin:0}
.library-panel a.bm-diag__btn{background:#fff;color:var(--purple);border:2px solid var(--purple);box-shadow:none;padding:13px 24px}
.library-panel a.bm-diag__btn:hover{background:var(--lav);color:var(--purple);box-shadow:none;transform:none}
.library-gate{max-width:560px;margin:28px auto 0;padding-top:28px;border-top:1px solid var(--line)}
.library-gate__k{font-size:11px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase;color:var(--purple);margin:0 0 8px}
.library-gate__title{font-size:22px;font-weight:800;letter-spacing:-0.2px;line-height:1.2;color:var(--ink);margin:0 0 6px}
.library-gate__hint{font-size:15px;line-height:1.5;color:var(--gray);margin:0 0 22px}
.lf-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.lf-field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
.lf-field label{font-size:13px;font-weight:700;color:var(--ink)}
.lf-field input[type="text"],.lf-field input[type="email"],.lf-field select{
  font-family:inherit;font-size:16px;padding:11px 13px;border:1px solid var(--line);border-radius:9px;
  background:#fff;color:var(--ink);width:100%;transition:border-color .15s;
}
.lf-field input[type="text"]:focus,.lf-field input[type="email"]:focus,.lf-field select:focus{
  outline:none;border-color:var(--purple);
}
.lf-field.lf-error input,.lf-field.lf-error select,.lf-phone.lf-error .PhoneInputInput{
  border-color:var(--red);
}
.lf-error-text{color:var(--red);font-size:13px;margin:0}
.field-help{color:var(--gray);font-size:12.5px;line-height:1.45;margin:6px 0 0}
.lf-phone .PhoneInputInput{
  font-family:inherit;font-size:16px;padding:11px 13px;border:1px solid var(--line);border-radius:9px;
  background:#fff;color:var(--ink);width:100%;box-sizing:border-box;
}
.lf-phone .PhoneInputInput:focus{outline:none;border-color:var(--purple)}
.lf-phone{display:flex;align-items:center;gap:8px;border:1px solid transparent;border-radius:9px}
.lf-consent{display:flex;gap:10px;align-items:flex-start;margin:20px 0 22px}
.lf-consent input[type="checkbox"]{margin-top:3px;width:18px;height:18px;flex:none;accent-color:var(--purple)}
.lf-consent-text{font-size:13.5px;line-height:1.5;color:#333}
.lf-consent-text label{font-weight:400;display:inline}
.lf-consent-text a{color:var(--purple);text-decoration:underline;text-underline-offset:2px}
.lf-submit{width:100%;display:block;text-align:center;background:var(--orange);color:#fff;border:0;font-weight:700;
  padding:15px 26px;border-radius:10px;font-size:17px;box-shadow:0 6px 18px rgba(243,105,1,.24);cursor:pointer;
  font-family:inherit;transition:filter .15s;
}
.lf-submit:hover{filter:brightness(1.05)}
.lf-submit:disabled{opacity:.6;cursor:not-allowed}
.lf-honeypot{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);clip-path:inset(50%);border:0;white-space:nowrap}
.lf-network-error{color:var(--red);font-size:13.5px;text-align:center;margin:0 0 14px}
@media (max-width:860px){.library-wrap{padding:calc(var(--site-head-h) + 8px) 16px 48px}.library-panel{padding:20px 16px 22px}}
@media (max-width:520px){.lf-row{grid-template-columns:1fr}.library-lead{font-size:16px}.library-gate{margin-top:22px;padding-top:22px}}
`;

export default async function LibraryPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("bm_library")?.value === "1") {
    redirect("/resources");
  }

  const videoLd = buildVslVideoLd(VSL_TRANSCRIPT_TEXT);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: RESOURCE_CSS + LIBRARY_CSS + VSL_CSS + VSL_STRIP_CSS }} />
      <div className="site-head-bar">
        <header className="site-head">
          <Link className="logo" href="/" {...RESOURCE_NEW_TAB}>
            {/* eslint-disable-next-line @next/next/no-img-element -- matches homepage/resources logo lockup */}
            <img src={RESOURCE_LOGO} alt="BrandMultiplier" />
            <span className="logo-text">BrandMultiplier</span>
          </Link>
        </header>
      </div>
      <main className="library-wrap">
        <div className="eyebrow">Resource Library</div>
        <h1>Get access to the library</h1>
        <p className="library-lead">
          One quick form and you&apos;re in — diagnostics on narrative
          infrastructure, StoryLock, and the structural reasons founder-led
          B2B companies stall between $3M and $50M ARR.
        </p>
        <VslBlock
          location="library"
          transcript={VSL_TRANSCRIPT}
          hideTranscriptUi
        />
        <div className="library-panel">
          <VslToolStrip ctaSlug="library" embedded gated />
          <div className="library-gate">
            <p className="library-gate__k">Resource library</p>
            <h2 className="library-gate__title">Get access</h2>
            <p className="library-gate__hint">
              One form. Then the rest of the library is on this browser.
            </p>
            <LibraryForm />
          </div>
        </div>
      </main>
      <footer className="site-foot">
        <p>
          <strong>BrandMultiplier</strong> - B2B Narrative Infrastructure for
          Founder-Led Companies.{" "}
          <a href="https://www.brandmultiplier.ai" {...RESOURCE_NEW_TAB}>
            brandmultiplier.ai
          </a>
        </p>
        <p>
          <LegalLinks />
        </p>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }}
      />
    </>
  );
}
