import { LEGAL_NEW_TAB } from "@/lib/legal-links";

export default function LegalLinks({
  className,
  privacyLabel = "Privacy Policy",
  termsLabel = "Terms",
}: {
  className?: string;
  privacyLabel?: string;
  termsLabel?: string;
}) {
  return (
    <span className={className}>
      <a href="/privacy" {...LEGAL_NEW_TAB} style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 2 }}>
        {privacyLabel}
      </a>
      {" · "}
      <a href="/terms" {...LEGAL_NEW_TAB} style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 2 }}>
        {termsLabel}
      </a>
    </span>
  );
}
