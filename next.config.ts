import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    // Pre-existing type issues from the Vite codebase. Safe to enable once
    // all types are gradually tightened up.
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint is run separately via `npm run lint`
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/**",
      },
    ],
  },
  // Preserve trailing slashes to match existing URL structure
  trailingSlash: false,
  // 301s for pre-migration WordPress URLs that are still indexed/bookmarked
  async redirects() {
    return [
      { source: "/our-models/cabin", destination: "/cabin", permanent: true },
      { source: "/our-models/utility-shed", destination: "/utility-shed", permanent: true },
      { source: "/our-models/garage", destination: "/types/garages-carports/garage", permanent: true },
      { source: "/our-models/tiny-homes", destination: "/types/deluxe-storage-cabins#cabins-tiny-home", permanent: true },
      { source: "/our-models/:path*", destination: "/types", permanent: true },
      { source: "/farmington", destination: "/farmington-mo", permanent: true },
      { source: "/home", destination: "/", permanent: true },
    ];
  },
  // Powered-by header is unnecessary and reveals tech stack
  poweredByHeader: false,
  // Security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://app.gohighlevel.com https://*.gohighlevel.com https://*.leadconnectorhq.com https://summit-ai-nextjs.vercel.app",
          },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/admin",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://res.cloudinary.com https://*.supabase.co",
              "connect-src 'self' https://*.supabase.co https://api.cloudinary.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://res.cloudinary.com https://*.supabase.co",
              "connect-src 'self' https://*.supabase.co https://api.cloudinary.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
      {
        // Prevent API responses from being cached by browsers sharing a computer
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
    ];
  },
};

export default nextConfig;
