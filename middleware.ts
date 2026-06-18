import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const pathname = request.nextUrl.pathname;

  if (
    (hostname === "weservefounders.com" || hostname === "www.weservefounders.com") &&
    pathname === "/"
  ) {
    return NextResponse.rewrite(new URL("/servingfounders", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
