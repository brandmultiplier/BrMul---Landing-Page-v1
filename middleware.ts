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
    return NextResponse.rewrite(new URL("/servingfounders", request.url));
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

  // RULE 4 — everything else passes through unchanged
  return NextResponse.next();
}

export const config = {
  // Run on all paths so every rule is evaluated on every request
  matcher: "/:path*",
};
