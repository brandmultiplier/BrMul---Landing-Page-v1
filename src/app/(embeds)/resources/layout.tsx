import Script from "next/script";

// Session-scoped UTM pass-through for the Calendly CTAs.
// Visitors landing with UTMs (email, social, paid) keep their original
// acquisition params on the booking link. T4 placement stays in utm_content
// unless inbound UTMs override source/medium/campaign/content.
// hide_gdpr_banner and bm_lead_id (utm_term) are never clobbered.
const UTM_PASSTHROUGH = `
(function () {
  try {
    var KEYS = ['utm_source','utm_medium','utm_campaign','utm_content'];
    var params = new URLSearchParams(location.search);
    if (params.get('utm_source')) {
      var inbound = {};
      KEYS.forEach(function (k) { var v = params.get(k); if (v) inbound[k] = v; });
      sessionStorage.setItem('bm_utm', JSON.stringify(inbound));
    }
    var stored = null;
    try { stored = JSON.parse(sessionStorage.getItem('bm_utm') || 'null'); } catch (e) {}
    var leadId = null;
    try {
      var match = document.cookie.match(/(?:^|; )bm_lead_id=([^;]*)/);
      if (match) leadId = decodeURIComponent(match[1]);
    } catch (e) {}
    document.querySelectorAll('a[href*="calendly.com/book-crc"]').forEach(function (a) {
      try {
        var url = new URL(a.getAttribute('href'), location.origin);
        if (stored && stored.utm_source) {
          KEYS.forEach(function (k) { if (stored[k]) url.searchParams.set(k, stored[k]); });
        }
        url.searchParams.set('hide_gdpr_banner', '1');
        if (leadId) url.searchParams.set('utm_term', leadId);
        a.setAttribute('href', url.toString());
      } catch (e) {}
    });
  } catch (e) {}
})();
`;

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script id="resources-utm-passthrough" strategy="afterInteractive">
        {UTM_PASSTHROUGH}
      </Script>
    </>
  );
}
