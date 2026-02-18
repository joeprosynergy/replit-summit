import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "sb-admin-auth";

const PUBLIC_ADMIN_PATHS = new Set([
  "/admin/login",
  "/admin/auth/callback",
]);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (PUBLIC_ADMIN_PATHS.has(pathname)) {
    const response = NextResponse.next();
    // If the user is on the login page, clear the session cookie server-side.
    // This ensures logout is effective even if client-side clearing had a race condition.
    if (pathname === "/admin/login" && req.cookies.get(COOKIE_NAME)) {
      response.cookies.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
    }
    return response;
  }

  const hasSession = req.cookies.get(COOKIE_NAME);

  if (!hasSession) {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl, { status: 302 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
