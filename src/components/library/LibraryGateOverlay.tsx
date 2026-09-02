import { cookies } from "next/headers";
import LibraryForm from "@/app/library/LibraryForm";
import LegalLinks from "@/components/legal/LegalLinks";
import type { LibraryIntent, LibraryNextPath } from "@/lib/library-next";

const OVERLAY_CSS = `
.lgo{position:fixed;inset:0;z-index:400;display:flex;align-items:flex-start;justify-content:center;padding:calc(24px + env(safe-area-inset-top)) 16px 32px;overflow:auto;background:rgba(17,17,20,.62);box-sizing:border-box}
.lgo *{box-sizing:border-box}
.lgo__panel{width:100%;max-width:560px;margin:48px auto;background:#fff;color:#111114;border:1px solid #E8E6E1;border-radius:16px;padding:28px 26px;box-shadow:0 16px 48px rgba(17,17,20,.28);font-family:var(--font-inter,'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif)}
.lgo__k{font-size:11px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase;color:#4940C6;margin:0 0 8px}
.lgo__title{font-size:22px;font-weight:800;letter-spacing:-0.2px;line-height:1.2;color:#111114;margin:0 0 6px}
.lgo__hint{font-size:15px;line-height:1.5;color:#666;margin:0 0 22px}
.lgo .lf-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.lgo .lf-field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
.lgo .lf-field label{font-size:13px;font-weight:700;color:#111114}
.lgo .lf-field input[type="text"],.lgo .lf-field input[type="email"],.lgo .lf-field select{
  font-family:inherit;font-size:16px;padding:11px 13px;border:1px solid #E8E6E1;border-radius:9px;
  background:#fff;color:#111114;width:100%;transition:border-color .15s;
}
.lgo .lf-field input[type="text"]:focus,.lgo .lf-field input[type="email"]:focus,.lgo .lf-field select:focus{
  outline:none;border-color:#4940C6;
}
.lgo .lf-field.lf-error input,.lgo .lf-field.lf-error select,.lgo .lf-phone.lf-error .PhoneInputInput{border-color:#C0392B}
.lgo .lf-error-text{color:#C0392B;font-size:13px;margin:0}
.lgo .field-help{color:#666;font-size:12.5px;line-height:1.45;margin:6px 0 0}
.lgo .lf-phone .PhoneInputInput{
  font-family:inherit;font-size:16px;padding:11px 13px;border:1px solid #E8E6E1;border-radius:9px;
  background:#fff;color:#111114;width:100%;box-sizing:border-box;
}
.lgo .lf-phone .PhoneInputInput:focus{outline:none;border-color:#4940C6}
.lgo .lf-phone{display:flex;align-items:center;gap:8px;border:1px solid transparent;border-radius:9px}
.lgo .lf-consent{display:flex;gap:10px;align-items:flex-start;margin:20px 0 22px}
.lgo .lf-consent input[type="checkbox"]{margin-top:3px;width:18px;height:18px;flex:none;accent-color:#4940C6}
.lgo .lf-consent-text{font-size:13.5px;line-height:1.5;color:#333}
.lgo .lf-consent-text label{font-weight:400;display:inline}
.lgo .lf-consent-text a{color:#4940C6;text-decoration:underline;text-underline-offset:2px}
.lgo__legal{margin:18px 0 0;font-size:12.5px;line-height:1.5;color:#666;text-align:center}
.lgo__legal a{color:#666;text-decoration:underline;text-underline-offset:2px}
.lgo .lf-submit{width:100%;display:block;text-align:center;background:#f36901;color:#fff;border:0;font-weight:700;
  padding:15px 26px;border-radius:10px;font-size:17px;box-shadow:0 6px 18px rgba(243,105,1,.24);cursor:pointer;
  font-family:inherit;transition:filter .15s;
}
.lgo .lf-submit:hover{filter:brightness(1.05)}
.lgo .lf-submit:disabled{opacity:.6;cursor:not-allowed}
.lgo .lf-honeypot{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);clip-path:inset(50%);border:0;white-space:nowrap}
.lgo .lf-network-error{color:#C0392B;font-size:13.5px;text-align:center;margin:0 0 14px}
@media (max-width:520px){
  .lgo__panel{margin:16px auto;padding:20px 16px}
  .lgo .lf-row{grid-template-columns:1fr}
}
`;

type Props = {
  title: string;
  redirectTo: LibraryNextPath;
  intent: LibraryIntent;
  show: boolean;
};

export default async function LibraryGateOverlay({
  title,
  redirectTo,
  intent,
  show,
}: Props) {
  if (!show) return null;
  const cookieStore = await cookies();

  // Both are required: bm_library says they passed the gate, bm_lead carries the
  // identity the instrument webhooks replay. A browser that has the first but
  // not the second predates identity capture, so ask once more rather than
  // sending a report with nobody attached to it.
  const passedGate = cookieStore.get("bm_library")?.value === "1";
  const hasIdentity = Boolean(cookieStore.get("bm_lead")?.value);
  if (passedGate && hasIdentity) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: OVERLAY_CSS }} />
      <div className="lgo" role="dialog" aria-modal="true" aria-labelledby="lgo-title">
        <div className="lgo__panel">
          <p className="lgo__k">Resource library</p>
          <h2 className="lgo__title" id="lgo-title">
            Get access to {title}
          </h2>
          <p className="lgo__hint">
            One form. Then this instrument opens on this browser — no second
            wall.
          </p>
          <LibraryForm redirectTo={redirectTo} intent={intent} />
          <p className="lgo__legal">
            <LegalLinks />
          </p>
        </div>
      </div>
    </>
  );
}
