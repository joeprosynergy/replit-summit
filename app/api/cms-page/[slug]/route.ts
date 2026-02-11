import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isValidSlug } from "@/lib/api-auth";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug || !isValidSlug(slug)) {
    return NextResponse.json({ error: "Invalid slug format" }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 500 }
    );
  }

  try {
    // Fetch page_content by slug (select only public fields)
    const { data: pageData, error: pageError } = await supabase
      .from("page_content")
      .select("id, slug, title, content, layout_config, is_canonical, created_at, updated_at")
      .eq("slug", slug)
      .maybeSingle();

    if (pageError) {
      console.error("[cms-page] Error fetching page_content:", pageError);
      return NextResponse.json(
        { error: "Failed to fetch page content" },
        { status: 500 }
      );
    }

    if (!pageData) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    const pageId = pageData.id;

    // Fetch section_content by page_id (select only public fields)
    const { data: sectionsData, error: sectionsError } = await supabase
      .from("section_content")
      .select("id, section_name, content, order_index, page_id, page_slug, created_at, updated_at")
      .eq("page_id", pageId)
      .order("order_index", { ascending: true });

    if (sectionsError) {
      console.error("[cms-page] Error fetching section_content:", sectionsError);
      return NextResponse.json(
        { error: "Failed to fetch sections" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      page: pageData,
      sections: sectionsData || [],
    });
  } catch (err) {
    console.error("[cms-page] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
