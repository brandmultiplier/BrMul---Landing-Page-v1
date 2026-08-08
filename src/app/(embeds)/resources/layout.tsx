// Session-scoped UTM pass-through for the Calendly CTAs.
// Visitors landing with UTMs (email, social, paid) keep their original
// acquisition params on the booking link — utm_term carries the page slug.
// Direct/organic visitors fall back to the static internal params in the markup.
const UTM_PASSTHROUGH = `
(function () {
  try {
    var KEYS = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];
    var params = new URLSearchParams(location.search);
    if (params.get('utm_source')) {
      var inbound = {};
      KEYS.forEach(function (k) { var v = params.get(k); if (v) inbound[k] = v; });
      sessionStorage.setItem('bm_utm', JSON.stringify(inbound));
    }
    var stored = null;
    try { stored = JSON.parse(sessionStorage.getItem('bm_utm') || 'null'); } catch (e) {}
    if (!stored || !stored.utm_source) return;
    var slug = location.pathname.split('/').filter(Boolean).pop() || '';
    document.querySelectorAll('a[href*="calendly.com/book-crc"]').forEach(function (a) {
      try {
        var url = new URL(a.getAttribute('href'), location.origin);
        KEYS.forEach(function (k) { if (stored[k]) url.searchParams.set(k, stored[k]); });
        url.searchParams.set('utm_term', slug);
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
      <script dangerouslySetInnerHTML={{ __html: UTM_PASSTHROUGH }} />
    </>
  );
}
