export const RB2B_SCRIPT_HOSTS = [
  "cdn.reb2b.com",
  "b2bjs.com",
  "b2bjsstore.s3.us-west-2.amazonaws.com",
  "ddwl4m2hdecbj.cloudfront.net",
] as const;

export type TrackingDecision = {
  gpc: boolean;
  loadGtm: boolean;
  rb2bAllowed: boolean;
  visitorCountry: string | null;
};

function isLegalPath(pathname: string): boolean {
  return (
    pathname === "/privacy" ||
    pathname === "/terms" ||
    pathname.startsWith("/privacy/") ||
    pathname.startsWith("/terms/")
  );
}

export function getTrackingDecision(
  headerStore: Headers,
  pathname: string,
): TrackingDecision {
  const gpc =
    headerStore.get("sec-gpc") === "1" || headerStore.get("Sec-GPC") === "1";
  const legal = isLegalPath(pathname);
  const rawCountry = (
    headerStore.get("cf-ipcountry") ||
    headerStore.get("x-vercel-ip-country") ||
    ""
  ).toUpperCase();
  const visitorCountry = rawCountry && rawCountry !== "XX" ? rawCountry : null;

  // Privacy §6: GPC is processed server-side — do not load GTM at all.
  // RB2B also must not fire on /privacy or /terms.
  const loadGtm = !gpc && !legal;
  // Fail closed: missing country is treated as non-US for RB2B only.
  const rb2bAllowed = loadGtm && visitorCountry === "US";

  return { gpc, loadGtm, rb2bAllowed, visitorCountry };
}
