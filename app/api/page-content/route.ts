import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth, isAuthError } from "@/lib/api-auth";
import { insertPageContentSchema } from "@shared/schema";

// In-memory storage (shared with the GET [slug] handler)
// In Next.js, module-level state persists within the same server instance
const pageContents = new Map<string, any>();

export async function POST(req: NextRequest) {
  // Verify admin auth
  const authResult = await verifyAdminAuth(req);
  if (isAuthError(authResult)) {
    return authResult;
  }

  try {
    const body = await req.json();
    const result = insertPageContentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues },
        { status: 400 }
      );
    }

    const data = result.data;
    const existing = pageContents.get(data.slug);
    const now = new Date();

    const content = {
      id: existing?.id || crypto.randomUUID(),
      slug: data.slug,
      heading: data.heading ?? null,
      subheading: data.subheading ?? null,
      tagline: data.tagline ?? null,
      metaTitle: data.metaTitle ?? null,
      metaDescription: data.metaDescription ?? null,
      ctaHeading: data.ctaHeading ?? null,
      ctaDescription: data.ctaDescription ?? null,
      ctaButton: data.ctaButton ?? null,
      layoutConfig: data.layoutConfig ?? null,
      isCanonical: data.isCanonical ?? false,
      templateType: data.templateType ?? null,
      status: data.status ?? "published",
      seoConfig: data.seoConfig ?? null,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };

    pageContents.set(data.slug, content);

    return NextResponse.json(content);
  } catch (error) {
    console.error("[page-content POST] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
