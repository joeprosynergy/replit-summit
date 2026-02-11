import { NextRequest, NextResponse } from "next/server";

const ALLOWED_IMAGE_HOSTS = new Set([
  "summitbuildings.com",
  "www.summitbuildings.com",
]);
const ALLOWED_IMAGE_PROTOCOLS = new Set(["http:", "https:"]);
const ALLOWED_IMAGE_PATH_PREFIXES = ["/wp-content/uploads/"];
const MAX_URL_LENGTH = 2048;
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

// Simple in-memory rate limiter (per IP, resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 30; // 30 requests per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function GET(req: NextRequest) {
  // Rate limit by IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  const urlParam = req.nextUrl.searchParams.get("url");

  if (!urlParam || !urlParam.trim()) {
    return NextResponse.json(
      { error: "url query param is required" },
      { status: 400 }
    );
  }

  if (urlParam.length > MAX_URL_LENGTH) {
    return NextResponse.json(
      { error: "URL too long" },
      { status: 400 }
    );
  }

  let parsed: URL;
  try {
    parsed = new URL(urlParam);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  const host = parsed.hostname.toLowerCase();
  const hasAllowedPath = ALLOWED_IMAGE_PATH_PREFIXES.some((prefix) =>
    parsed.pathname.startsWith(prefix)
  );

  if (
    !ALLOWED_IMAGE_PROTOCOLS.has(parsed.protocol) ||
    !ALLOWED_IMAGE_HOSTS.has(host) ||
    !hasAllowedPath
  ) {
    return NextResponse.json(
      { error: "Host or path not allowed" },
      { status: 400 }
    );
  }

  try {
    console.log(`[image-proxy] Fetching ${parsed.toString()}`);
    const upstream = await fetch(parsed.toString(), {
      headers: {
        "User-Agent": "SummitImageProxy/1.0",
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        Referer: "https://summitbuildings.com/",
        Origin: "https://summitbuildings.com",
      },
    });

    if (!upstream.ok) {
      console.warn(
        `[image-proxy] Upstream ${upstream.status} for ${parsed.toString()}`
      );
      return NextResponse.json(
        { error: `Upstream error: ${upstream.status}` },
        { status: 502 }
      );
    }

    const contentType =
      upstream.headers.get("content-type") || "image/jpeg";
    const cacheControl =
      upstream.headers.get("cache-control") || "public, max-age=86400";

    // Check content length before downloading
    const upstreamSize = upstream.headers.get("content-length");
    if (upstreamSize && parseInt(upstreamSize) > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "Image too large" },
        { status: 413 }
      );
    }

    const buffer = Buffer.from(await upstream.arrayBuffer());

    if (buffer.length > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "Image too large" },
        { status: 413 }
      );
    }

    console.log(
      `[image-proxy] Served ${parsed.toString()} (${contentType}, ${buffer.length} bytes)`
    );

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": cacheControl,
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}
