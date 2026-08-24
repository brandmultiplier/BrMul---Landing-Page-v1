import { headers } from "next/headers";
import { getTrackingDecision } from "@/lib/tracking-gate";
import GtmPageViewTracker from "@/components/analytics/GtmPageViewTracker";

export default async function AnalyticsRuntime() {
  const headerStore = await headers();
  const pathname = headerStore.get("x-bm-pathname") || "/";
  const { loadGtm } = getTrackingDecision(headerStore, pathname);
  if (!loadGtm) return null;
  return (
    <>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KS2JZD8Z"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <GtmPageViewTracker />
    </>
  );
}
