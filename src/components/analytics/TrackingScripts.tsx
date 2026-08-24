import { headers } from "next/headers";
import {
  getTrackingDecision,
  RB2B_SCRIPT_HOSTS,
} from "@/lib/tracking-gate";

const GTM_ID = "GTM-KS2JZD8Z";

const GTM_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

export default async function TrackingScripts() {
  const headerStore = await headers();
  const pathname = headerStore.get("x-bm-pathname") || "/";
  const decision = getTrackingDecision(headerStore, pathname);

  const bootstrap = `window.dataLayer=window.dataLayer||[];window.dataLayer.push({
    gpc:${decision.gpc ? "true" : "false"},
    visitor_country:${JSON.stringify(decision.visitorCountry)},
    rb2b_allowed:${decision.rb2bAllowed ? "true" : "false"}
  });`;

  const rb2bBlock = decision.rb2bAllowed
    ? ""
    : `(function(){
  var blocked=${JSON.stringify(RB2B_SCRIPT_HOSTS)};
  function isBlocked(src){
    if(!src) return false;
    try {
      var host=new URL(src, location.origin).hostname;
      return blocked.some(function(h){ return host===h || host.endsWith('.'+h); });
    } catch(e){ return false; }
  }
  var append=Element.prototype.appendChild;
  Element.prototype.appendChild=function(node){
    if(node && node.tagName==='SCRIPT' && isBlocked(node.src)) return node;
    return append.call(this, node);
  };
  var insert=Element.prototype.insertBefore;
  Element.prototype.insertBefore=function(node, ref){
    if(node && node.tagName==='SCRIPT' && isBlocked(node.src)) return node;
    return insert.call(this, node, ref);
  };
})();`;

  if (!decision.loadGtm) {
    return (
      <script dangerouslySetInnerHTML={{ __html: bootstrap + rb2bBlock }} />
    );
  }

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootstrap + rb2bBlock }} />
      <script dangerouslySetInnerHTML={{ __html: GTM_SCRIPT }} />
    </>
  );
}
