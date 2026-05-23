import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ─── Admin auth ──────────────────────────────────────────────
const ADMIN_COOKIE_NAME = "sb-admin-auth";

const PUBLIC_ADMIN_PATHS = new Set([
  "/admin/login",
  "/admin/auth/callback",
]);

// ─── Homepage A/B test (V1 = live design, V2 = new design) ────
const AB_COOKIE_NAME = "summit_homepage_variant";
const AB_COOKIE_MAX_AGE = 60 * 60 * 24 * 60; // 60 days
const V2_SHARE = 0.5;

// Match the most common bots/crawlers/social previewers so Googlebot
// & friends always see V1 (the indexed page) and don't accidentally
// "consume" V2 slots that should go to real visitors.
const BOT_REGEX =
  /bot|crawler|spider|crawling|facebookexternalhit|slackbot|twitterbot|whatsapp|telegram|linkedinbot|pinterest|googlebot|bingbot|baiduspider|yandexbot|duckduckbot|applebot|petalbot|semrush|ahrefs|mj12bot|dotbot|seekport|gptbot|chatgpt|claudebot|anthropic|perplexitybot|amazonbot|headless/i;

type Variant = "v1" | "v2";

function isValidVariant(v: string | undefined | null): v is Variant {
  return v === "v1" || v === "v2";
}

function pickVariant(): Variant {
  return Math.random() < V2_SHARE ? "v2" : "v1";
}

function setVariantCookie(res: NextResponse, variant: Variant) {
  res.cookies.set(AB_COOKIE_NAME, variant, {
    path: "/",
    maxAge: AB_COOKIE_MAX_AGE,
    sameSite: "lax",
  });
}

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // ─── Admin auth (unchanged behavior) ───────────────────────
  if (pathname.startsWith("/admin")) {
    if (PUBLIC_ADMIN_PATHS.has(pathname)) {
      const response = NextResponse.next();
      if (pathname === "/admin/login" && req.cookies.get(ADMIN_COOKIE_NAME)) {
        response.cookies.set(ADMIN_COOKIE_NAME, "", { path: "/", maxAge: 0 });
      }
      return response;
    }
    const hasSession = req.cookies.get(ADMIN_COOKIE_NAME);
    if (!hasSession) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl, { status: 302 });
    }
    return NextResponse.next();
  }

  const ua = req.headers.get("user-agent") || "";
  const isBot = BOT_REGEX.test(ua);

  // ─── Homepage A/B split ─────────────────────────────────────
  if (pathname === "/") {
    const forced = searchParams.get("ab");           // ?ab=v1 | ?ab=v2 for QA
    const existing = req.cookies.get(AB_COOKIE_NAME)?.value;

    let variant: Variant;
    if (isValidVariant(forced)) {
      variant = forced;
    } else if (isBot) {
      variant = "v1";
    } else if (isValidVariant(existing)) {
      variant = existing;
    } else {
      variant = pickVariant();
    }

    let response: NextResponse;
    if (variant === "v2") {
      const rewriteUrl = req.nextUrl.clone();
      rewriteUrl.pathname = "/v2";
      response = NextResponse.rewrite(rewriteUrl);
    } else {
      response = NextResponse.next();
    }

    // Don't pin bots into a variant via cookies.
    if (!isBot) setVariantCookie(response, variant);
    return response;
  }

  // ─── Direct /v2 visits → sticky cookie ─────────────────────
  if (pathname === "/v2") {
    const response = NextResponse.next();
    if (!isBot) setVariantCookie(response, "v2");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/v2", "/admin", "/admin/:path*"],
};
