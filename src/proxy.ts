import { NextRequest, NextResponse } from "next/server";
import { getTrackingDecision } from "@/lib/tracking-gate";

export function proxy(request: NextRequest) {
  const hostname = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const pathname = request.nextUrl.pathname;

  const isWSF =
    hostname === "weservefounders.com" || hostname === "www.weservefounders.com";
  const isBM =
    hostname === "brandmultiplier.ai" || hostname === "www.brandmultiplier.ai";

  if (isWSF && pathname === "/") {
    return NextResponse.rewrite(new URL("/servingfounders", request.url));
  }

  if (isBM && pathname.startsWith("/connectors")) {
    return NextResponse.redirect(
      new URL(pathname, "https://weservefounders.com"),
      308,
    );
  }

  if (isBM && pathname.startsWith("/servingfounders")) {
    return NextResponse.redirect(new URL("/", "https://weservefounders.com"), 308);
  }

  if (hostname === "brandmultiplier.ai") {
    const url = request.nextUrl.clone();
    url.hostname = "www.brandmultiplier.ai";
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-bm-pathname", pathname);
  const response = NextResponse.next({ request: { headers: requestHeaders } });

  const decision = getTrackingDecision(request.headers, pathname);
  if (!decision.rb2bAllowed) {
    response.headers.set("x-bm-rb2b", "blocked");
  }

  return response;
}

export const config = {
  matcher: "/:path*",
};
