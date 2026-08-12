import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const pathname = request.nextUrl.pathname;

  const isWSF =
    hostname === "weservefounders.com" || hostname === "www.weservefounders.com";
  const isBM =
    hostname === "brandmultiplier.ai" || hostname === "www.brandmultiplier.ai";

  // RULE 1 — weservefounders.com/ → transparent rewrite to /servingfounders
  // URL bar stays showing weservefounders.com
  if (isWSF && pathname === "/") {
    const res = NextResponse.rewrite(new URL("/servingfounders", request.url));
    res.headers.set("x-pathname", pathname);
    return res;
  }

  // RULE 2 — brandmultiplier.ai/connectors* → 308 to weservefounders.com/connectors*
  if (isBM && pathname.startsWith("/connectors")) {
    return NextResponse.redirect(
      new URL(pathname, "https://weservefounders.com"),
      308
    );
  }

  // RULE 3 — brandmultiplier.ai/servingfounders* → 308 to weservefounders.com/
  if (isBM && pathname.startsWith("/servingfounders")) {
    return NextResponse.redirect(new URL("/", "https://weservefounders.com"), 308);
  }

  // RULE 4 — everything else passes through, but always stamp x-pathname so
  // the root layout can read the request path server-side (used for GPC/tracking suppression).
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  // Run on all paths so every rule is evaluated on every request
  matcher: "/:path*",
};
