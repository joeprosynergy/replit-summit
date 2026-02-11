import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminAuth, isAuthError, isValidSlug } from "@/lib/api-auth";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Verify admin auth
  const authResult = await verifyAdminAuth(req);
  if (isAuthError(authResult)) {
    return authResult;
  }

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
    // Fetch page_content
    const { data: pageData, error: pageError } = await supabase
      .from("page_content")
      .select("id, layout_config")
      .eq("slug", slug)
      .maybeSingle();

    if (pageError || !pageData) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    const pageId = pageData.id;

    // Default layout config for page_content
    const defaultLayoutConfig = {
      heroBackground: null,
      heroLayout: "full-width",
      backgroundColor: "#f8f9fa",
      theme: "default",
    };

    // Update page_content.layout_config
    const { error: updatePageError } = await supabase
      .from("page_content")
      .update({ layout_config: defaultLayoutConfig })
      .eq("id", pageId);

    if (updatePageError) {
      console.error(
        "[populate-layout] Failed to update page_content:",
        updatePageError
      );
      return NextResponse.json(
        { error: "Failed to update page layout_config" },
        { status: 500 }
      );
    }

    // Default layout values for sections
    const heroLayoutDefaults: Record<string, string> = {
      backgroundColor: "hsl(var(--primary) / 0.1)",
      paddingTop: "4rem",
      paddingBottom: "4rem",
      textAlignment: "center",
      layoutVariant: "full-width",
    };

    const ctaLayoutDefaults: Record<string, string> = {
      backgroundColor: "hsl(var(--primary) / 0.1)",
      paddingTop: "4rem",
      paddingBottom: "4rem",
      textAlignment: "center",
      layoutVariant: "default",
      buttonTarget: "_self",
    };

    // Fetch sections
    const { data: sections, error: sectionsError } = await supabase
      .from("section_content")
      .select("id, section_name, content")
      .eq("page_id", pageId)
      .in("section_name", ["hero", "cta"]);

    if (sectionsError) {
      console.error(
        "[populate-layout] Failed to fetch sections:",
        sectionsError
      );
      return NextResponse.json(
        { error: "Failed to fetch sections" },
        { status: 500 }
      );
    }

    const updates: { sectionName: string; fieldsAdded: string[] }[] = [];

    for (const section of sections || []) {
      const currentContent = (section.content as Record<string, any>) || {};
      let layoutDefaults: Record<string, string>;

      if (section.section_name === "hero") {
        layoutDefaults = heroLayoutDefaults;
      } else if (section.section_name === "cta") {
        layoutDefaults = ctaLayoutDefaults;
      } else {
        continue;
      }

      // Merge layout defaults into content (only add missing fields)
      const updatedContent = { ...currentContent };
      const fieldsAdded: string[] = [];

      for (const [key, value] of Object.entries(layoutDefaults)) {
        if (
          updatedContent[key] === undefined ||
          updatedContent[key] === null
        ) {
          updatedContent[key] = value;
          fieldsAdded.push(key);
        }
      }

      if (fieldsAdded.length > 0) {
        const { error: updateError } = await supabase
          .from("section_content")
          .update({ content: updatedContent })
          .eq("id", section.id);

        if (updateError) {
          console.error(
            `[populate-layout] Failed to update section ${section.section_name}:`,
            updateError
          );
          return NextResponse.json(
            {
              error: `Failed to update section ${section.section_name}`,
            },
            { status: 500 }
          );
        }

        updates.push({ sectionName: section.section_name, fieldsAdded });
      }
    }

    console.log(`[populate-layout] Updated ${slug}:`, {
      layoutConfig: defaultLayoutConfig,
      sections: updates,
    });

    return NextResponse.json({
      success: true,
      slug,
      layoutConfig: defaultLayoutConfig,
      sectionsUpdated: updates,
    });
  } catch (err) {
    console.error("[populate-layout] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
