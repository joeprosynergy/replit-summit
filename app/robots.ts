import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://summitbuildings.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/auth/*",
          "/signup",
          "/signup/*",
          "/cms/*",
          "/api/*",
          "/block-chart",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
