import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Server-side Supabase client for Server Components and Route Handlers.
 * Uses the anon key for public reads (respects RLS).
 * For admin operations, use the service role key.
 */
export function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Server-side Supabase admin client.
 * Uses the service role key to bypass RLS.
 * Only use for admin operations in Route Handlers.
 */
export function createServerSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error(
      "[Supabase Server] Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL"
    );
    return null;
  }

  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Check if a string value is a valid image path for Next.js.
 * Rejects Vite-era /src/assets/ paths and bare filenames.
 */
function isValidImagePathServer(value: string): boolean {
  // Cloudinary / external URLs are always valid
  if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('//')) return true;
  // Data URIs
  if (value.startsWith('data:')) return true;
  // REJECT: Vite-style /src/assets/ paths - Next.js serves from /public/
  if (value.startsWith('/src/') || value.startsWith('src/')) return false;
  // REJECT: Vite production hashed paths (e.g. /assets/image-aBcDeFg.jpg)
  if (value.startsWith('/assets/') && /-[A-Za-z0-9_]{6,}\.(jpg|jpeg|png|gif|webp|svg)$/i.test(value)) return false;
  // Valid: /assets/filename.jpg or other absolute paths
  if (value.startsWith('/')) return true;
  // REJECT: bare filenames (e.g., "greenhouse.jpg")
  return false;
}

/** Check if a key name represents an image field */
function isImageFieldServer(key: string): boolean {
  const lower = key.toLowerCase();
  if (lower.endsWith('alt')) return false; // alt text, not URLs
  return /image|img|photo|picture|thumbnail|avatar|logo|banner|src$/.test(lower);
}

/**
 * Fix a single image path: convert Vite-era paths to Next.js paths.
 * /src/assets/foo.jpg → /assets/foo.jpg
 * Hashed paths are stripped (return null to signal "use default").
 */
function fixImagePath(value: string): string | null {
  // Already valid
  if (isValidImagePathServer(value)) return value;
  // Vite source path: /src/assets/foo.jpg → /assets/foo.jpg
  if (value.startsWith('/src/assets/')) return value.replace('/src/assets/', '/assets/');
  if (value.startsWith('src/assets/')) return '/' + value.replace('src/assets/', 'assets/');
  // Hashed or other invalid paths can't be fixed
  return null;
}

/**
 * Recursively fix image paths in CMS data.
 * Converts Vite-era /src/assets/ paths to Next.js /assets/ paths.
 * Removes paths that can't be fixed (hashed paths, bare filenames).
 */
function sanitizeCmsContent(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeCmsContent(item));
  }
  const result: Record<string, any> = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (isImageFieldServer(key) && typeof value === 'string') {
      const fixed = fixImagePath(value);
      if (fixed !== null) {
        result[key] = fixed;
      }
      // else: omit this field so the default from the spread will be used
    } else if (value && typeof value === 'object') {
      result[key] = sanitizeCmsContent(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Fetch CMS content for a page by slug.
 * Used in Server Components to SSR page content.
 */
export async function fetchPageContent(slug: string) {
  const supabase = createServerSupabaseClient();
  if (!supabase) return null;

  try {
    const [pageResult, sectionsResult] = await Promise.all([
      supabase.from("page_content").select("*").eq("slug", slug).maybeSingle(),
      supabase
        .from("section_content")
        .select("*")
        .eq("page_slug", slug)
        .order("created_at", { ascending: false }),
    ]);

    if (pageResult.error || !pageResult.data) {
      return null;
    }

    // Find the 'main' section content (used by useCMSContent pattern)
    const mainSection = sectionsResult.data?.find(
      (s: any) => s.section_name === "main"
    );

    // Sanitize CMS content to strip invalid Vite-era image paths
    const rawContent = mainSection?.content || null;
    const cleanContent = rawContent ? sanitizeCmsContent(rawContent) : null;

    return {
      page: pageResult.data,
      sections: sectionsResult.data || [],
      mainContent: cleanContent,
    };
  } catch (error) {
    console.error(`[SSR] Failed to fetch page content for ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch navigation config (header + footer) server-side.
 * Returns pre-fetched configs so Header/Footer render instantly without client-side loading.
 */
export async function fetchNavigationConfig() {
  const supabase = createServerSupabaseClient();
  if (!supabase) return null;

  try {
    const [headerResult, footerResult] = await Promise.all([
      supabase
        .from('section_content')
        .select('content')
        .eq('page_slug', 'global-navigation')
        .eq('section_name', 'header')
        .maybeSingle(),
      supabase
        .from('section_content')
        .select('content')
        .eq('page_slug', 'global-navigation')
        .eq('section_name', 'footer')
        .maybeSingle(),
    ]);

    return {
      headerConfig: headerResult.data?.content || null,
      footerConfig: footerResult.data?.content || null,
    };
  } catch (error) {
    console.error('[SSR] Failed to fetch navigation config:', error);
    return null;
  }
}

/**
 * Fetch section content for a specific page and section.
 * Used for pages with multiple named sections (e.g., homepage).
 */
export async function fetchSectionContent(
  pageSlug: string,
  sectionName: string
) {
  const supabase = createServerSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("section_content")
      .select("*")
      .eq("page_slug", pageSlug)
      .eq("section_name", sectionName)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    return data.content;
  } catch (error) {
    console.error(
      `[SSR] Failed to fetch section ${sectionName} for ${pageSlug}:`,
      error
    );
    return null;
  }
}
