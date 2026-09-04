import { NextRequest, NextResponse } from "next/server";

const STUDIO_HOSTS = new Set(["studio.inz.lol", "www.studio.inz.lol"]);

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  if (!STUDIO_HOSTS.has(host)) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/studio") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/studio" : `/studio${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
