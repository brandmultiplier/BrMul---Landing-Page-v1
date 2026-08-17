import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { RESOURCE_CSS, RESOURCE_LOGO } from "../(embeds)/resources/_shared";
import LibraryForm from "./LibraryForm";

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
.library-wrap{max-width:560px;margin:0 auto;padding:calc(var(--site-head-h) + 32px) 24px 60px}
.library-lead{font-size:19px;color:#33333a;margin:0 0 28px;max-width:520px}
.library-card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:28px 26px;box-shadow:0 8px 26px rgba(73,64,198,.06)}
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
.lf-phone .PhoneInputInput{
  font-family:inherit;font-size:16px;padding:11px 13px;border:1px solid var(--line);border-radius:9px;
  background:#fff;color:var(--ink);
}
.lf-phone .PhoneInputInput:focus{outline:none;border-color:var(--purple)}
.lf-phone{display:flex;align-items:center;gap:8px;border:1px solid transparent;border-radius:9px}
.lf-consent{display:flex;gap:10px;align-items:flex-start;margin:20px 0 14px;padding:14px 16px;background:var(--lav);border-radius:10px;border:1px solid var(--lav2)}
.lf-consent input[type="checkbox"]{margin-top:3px;width:18px;height:18px;flex:none;accent-color:var(--purple)}
.lf-consent-text{font-size:13.5px;line-height:1.5;color:#333}
.lf-consent-text a{color:var(--purple);text-decoration:underline;text-underline-offset:2px}
.lf-disclosure{font-size:12.5px;line-height:1.55;color:var(--gray);margin:0 0 22px}
.lf-disclosure a{color:var(--gray);text-decoration:underline;text-underline-offset:2px}
.lf-submit{width:100%;display:block;text-align:center;background:var(--orange);color:#fff;border:0;font-weight:700;
  padding:15px 26px;border-radius:10px;font-size:17px;box-shadow:0 6px 18px rgba(243,105,1,.24);cursor:pointer;
  font-family:inherit;transition:filter .15s;
}
.lf-submit:hover{filter:brightness(1.05)}
.lf-submit:disabled{opacity:.6;cursor:not-allowed}
.lf-honeypot{position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden}
.lf-network-error{color:var(--red);font-size:13.5px;text-align:center;margin:0 0 14px}
@media (max-width:520px){.lf-row{grid-template-columns:1fr}}
`;

export default async function LibraryPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("bm_library")?.value === "1") {
    redirect("/resources");
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: RESOURCE_CSS + LIBRARY_CSS }} />
      <div className="site-head-bar">
        <header className="site-head">
          <Link className="logo" href="/">
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
        <div className="library-card">
          <LibraryForm />
        </div>
      </main>
      <footer className="site-foot">
        <p>
          <strong>BrandMultiplier</strong> - B2B Narrative Infrastructure for
          Founder-Led Companies.{" "}
          <a href="https://www.brandmultiplier.ai">brandmultiplier.ai</a>
        </p>
      </footer>
    </>
  );
}
