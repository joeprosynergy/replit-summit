import { NextRequest, NextResponse } from "next/server";
import { isValidSlug } from "@/lib/api-auth";

// In-memory storage (mirrors the original Express MemStorage)
// Note: In serverless environments, this resets between cold starts.
// CMS content is primarily served from Supabase; this is a fallback layer.
const pageContents = new Map<string, any>();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!isValidSlug(slug)) {
    return NextResponse.json({ error: "Invalid slug format" }, { status: 400 });
  }

  const content = pageContents.get(slug);
  if (!content) {
    return NextResponse.json(
      { error: "Page content not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(content);
}

// Export the map so the POST handler can write to it
export { pageContents };
