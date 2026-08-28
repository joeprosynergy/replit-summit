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

// A/B test PAUSED 2026-06-16 — V1 won on engagement (lower bounce in GA4).
// While false: all public traffic gets clean V1, and existing V2 cookies are
// ignored so returning visitors roll back too. V2 is NOT deleted — preview it
// internally via ?ab=v2 or the /v2 route. Flip back to true to resume the 50/50
// test (and consider replacing the leaky V2 <title> with a GA4 custom dimension).
const AB_ENABLED: boolean = false;

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

// V2 is rendered by the /v2 route. Rewrite there (URL stays "/") and flag the
// variant on the request so the layout (server component) can pick it up via
// headers() and apply the light-hero treatment instead of the dark-hero default.
function rewriteToV2(req: NextRequest): NextResponse {
  const rewriteUrl = req.nextUrl.clone();
  rewriteUrl.pathname = "/v2";
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-summit-homepage-variant", "v2");
  return NextResponse.rewrite(rewriteUrl, { request: { headers: requestHeaders } });
}

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // ─── Admin auth (unchanged behavior) ───────────────────────
  if (pathname.startsWith("/admin")) {
    if (PUBLIC_ADMIN_PATHS.has(pathname)) {
      return NextResponse.next();
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

    // ─── A/B test paused: serve clean V1 to everyone ───────────
    // Old V2 cookies are intentionally ignored so returning visitors roll
    // back too. ?ab=v2 still previews V2 internally (no sticky cookie set).
    if (!AB_ENABLED) {
      if (forced === "v2") return rewriteToV2(req); // QA preview, no sticky cookie
      return NextResponse.next(); // clean V1 for all public traffic
    }

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

    const response =
      variant === "v2" ? rewriteToV2(req) : NextResponse.next();

    // Don't pin bots into a variant via cookies.
    if (!isBot) setVariantCookie(response, variant);
    return response;
  }

  // ─── Direct /v2 visits → sticky cookie ─────────────────────
  if (pathname === "/v2") {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-summit-homepage-variant", "v2");
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    if (!isBot) setVariantCookie(response, "v2");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/v2", "/admin", "/admin/:path*"],
};
