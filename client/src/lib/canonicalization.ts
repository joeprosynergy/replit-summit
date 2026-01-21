import { getBackendClient } from './backendClient';
import { toast } from 'sonner';

/**
 * Canonicalization Service
 * Extracts default content from code-based pages and persists to CMS database
 * to create fully hydrated canonical pages.
 */

export interface PageDefaults {
  slug: string;
  templateType?: string;
  heading?: string;
  subheading?: string;
  tagline?: string;
  metaTitle?: string;
  metaDescription?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  ctaButton?: string;
  layoutConfig?: Record<string, any>;
  seoConfig?: Record<string, any>;
}

export interface SectionDefaults {
  sectionName: string;
  sectionType?: string;
  orderIndex: number;
  content: Record<string, any>;
  layoutConfig?: Record<string, any>;
  isVisible?: boolean;
}

export interface CanonicalPageData {
  page: PageDefaults;
  sections: SectionDefaults[];
}

export interface CanonicalizeResult {
  success: boolean;
  pageId?: string;
  error?: string;
  message: string;
}

/**
 * Canonicalize a page by extracting its defaults and persisting to CMS.
 * This creates a fully hydrated page in the database that can be rendered
 * without any code-based defaults.
 */
export async function canonicalizePage(
  slug: string,
  pageData: CanonicalPageData,
  options: { overwrite?: boolean } = {}
): Promise<CanonicalizeResult> {
  const client = getBackendClient();
  if (!client) {
    return {
      success: false,
      error: 'Backend not available',
      message: 'Cannot canonicalize: database not configured',
    };
  }

  try {
    // Check if page already exists
    const { data: existingPage, error: checkError } = await (client as any)
      .from('page_content')
      .select('id, is_canonical')
      .eq('slug', slug)
      .maybeSingle();

    if (checkError) {
      console.error('[Canonicalization] Error checking existing page:', checkError);
      return {
        success: false,
        error: checkError.message,
        message: `Failed to check existing page: ${checkError.message}`,
      };
    }

    // If page exists and is canonical, skip unless overwrite is true
    if (existingPage && existingPage.is_canonical && !options.overwrite) {
      return {
        success: true,
        pageId: existingPage.id,
        message: `Page ${slug} is already canonical`,
      };
    }

    let pageId = existingPage?.id;

    // Prepare page data
    const pagePayload = {
      slug: pageData.page.slug,
      heading: pageData.page.heading,
      subheading: pageData.page.subheading,
      tagline: pageData.page.tagline,
      meta_title: pageData.page.metaTitle,
      meta_description: pageData.page.metaDescription,
      cta_heading: pageData.page.ctaHeading,
      cta_description: pageData.page.ctaDescription,
      cta_button: pageData.page.ctaButton,
      layout_config: pageData.page.layoutConfig || {},
      is_canonical: true,
      template_type: pageData.page.templateType || 'default',
      status: 'published',
      seo_config: pageData.page.seoConfig || {},
      updated_at: new Date().toISOString(),
    };

    if (existingPage) {
      // Update existing page
      const { error: updateError } = await (client as any)
        .from('page_content')
        .update(pagePayload)
        .eq('id', existingPage.id);

      if (updateError) {
        console.error('[Canonicalization] Error updating page:', updateError);
        return {
          success: false,
          error: updateError.message,
          message: `Failed to update page: ${updateError.message}`,
        };
      }
    } else {
      // Insert new page
      const { data: insertedPage, error: insertError } = await (client as any)
        .from('page_content')
        .insert(pagePayload)
        .select('id')
        .single();

      if (insertError) {
        console.error('[Canonicalization] Error inserting page:', insertError);
        return {
          success: false,
          error: insertError.message,
          message: `Failed to insert page: ${insertError.message}`,
        };
      }

      pageId = insertedPage.id;
    }

    // Delete existing sections if overwriting
    if (options.overwrite && pageId) {
      const { error: deleteError } = await (client as any)
        .from('section_content')
        .delete()
        .eq('page_id', pageId);

      if (deleteError) {
        console.warn('[Canonicalization] Error deleting old sections:', deleteError);
      }
    }

    // Insert sections
    const sectionInserts = pageData.sections.map((section) => ({
      page_id: pageId,
      page_slug: slug,
      section_name: section.sectionName,
      section_type: section.sectionType || section.sectionName,
      order_index: section.orderIndex,
      content: section.content,
      layout_config: section.layoutConfig || {},
      is_visible: section.isVisible !== false,
    }));

    if (sectionInserts.length > 0) {
      const { error: sectionsError } = await (client as any)
        .from('section_content')
        .insert(sectionInserts);

      if (sectionsError) {
        console.error('[Canonicalization] Error inserting sections:', sectionsError);
        return {
          success: false,
          error: sectionsError.message,
          message: `Page created but sections failed: ${sectionsError.message}`,
          pageId,
        };
      }
    }

    console.log(`[Canonicalization] Successfully canonicalized ${slug}`, {
      pageId,
      sectionCount: sectionInserts.length,
    });

    return {
      success: true,
      pageId,
      message: `Successfully canonicalized ${slug} with ${sectionInserts.length} sections`,
    };
  } catch (err: any) {
    console.error('[Canonicalization] Unexpected error:', err);
    return {
      success: false,
      error: err.message || 'Unknown error',
      message: `Canonicalization failed: ${err.message || 'Unknown error'}`,
    };
  }
}

/**
 * Validate that a canonical page renders correctly by comparing
 * CMS data with expected defaults.
 */
export async function validateCanonicalPage(
  slug: string,
  expectedDefaults: CanonicalPageData
): Promise<{ valid: boolean; missingFields: string[]; errors: string[] }> {
  const client = getBackendClient();
  if (!client) {
    return {
      valid: false,
      missingFields: [],
      errors: ['Backend not available'],
    };
  }

  const missingFields: string[] = [];
  const errors: string[] = [];

  try {
    // Fetch page from CMS
    const { data: page, error: pageError } = await (client as any)
      .from('page_content')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (pageError || !page) {
      errors.push(`Page not found in CMS: ${pageError?.message || 'Not found'}`);
      return { valid: false, missingFields, errors };
    }

    if (!page.is_canonical) {
      errors.push('Page is not marked as canonical');
    }

    // Fetch sections
    const { data: sections, error: sectionsError } = await (client as any)
      .from('section_content')
      .select('*')
      .eq('page_id', page.id)
      .order('order_index', { ascending: true });

    if (sectionsError) {
      errors.push(`Failed to fetch sections: ${sectionsError.message}`);
      return { valid: false, missingFields, errors };
    }

    // Validate sections match expected
    const expectedSectionNames = expectedDefaults.sections.map((s) => s.sectionName);
    const actualSectionNames = (sections || []).map((s: any) => s.section_name);

    const missingSections = expectedSectionNames.filter(
      (name) => !actualSectionNames.includes(name)
    );
    if (missingSections.length > 0) {
      errors.push(`Missing sections: ${missingSections.join(', ')}`);
    }

    // Validate each section has content
    for (const section of sections || []) {
      const expectedSection = expectedDefaults.sections.find(
        (s) => s.sectionName === section.section_name
      );
      if (!expectedSection) continue;

      const expectedKeys = Object.keys(expectedSection.content);
      const actualKeys = Object.keys(section.content || {});

      const missingKeys = expectedKeys.filter((key) => !actualKeys.includes(key));
      if (missingKeys.length > 0) {
        missingFields.push(
          ...missingKeys.map((key) => `${section.section_name}.${key}`)
        );
      }
    }

    const valid = errors.length === 0 && missingFields.length === 0;

    if (valid) {
      console.log(`[Validation] ✅ ${slug} is fully canonical`);
    } else {
      console.warn(`[Validation] ⚠️ ${slug} has issues:`, { missingFields, errors });
    }

    return { valid, missingFields, errors };
  } catch (err: any) {
    errors.push(`Validation error: ${err.message || 'Unknown error'}`);
    return { valid: false, missingFields, errors };
  }
}

/**
 * Duplicate a canonical page with a new slug.
 * Copies page content and all sections from source to target.
 */
export async function duplicateCanonicalPage(
  sourceSlug: string,
  targetSlug: string,
  contentOverrides?: Record<string, any>,
  layoutConfigOverride?: Record<string, any> | null
): Promise<CanonicalizeResult> {
  const client = getBackendClient();
  if (!client) {
    return {
      success: false,
      error: 'Backend not available',
      message: 'Cannot duplicate: database not configured',
    };
  }

  try {
    // Fetch source page
    const { data: sourcePage, error: sourceError } = await (client as any)
      .from('page_content')
      .select('*')
      .eq('slug', sourceSlug)
      .maybeSingle();

    if (sourceError || !sourcePage) {
      return {
        success: false,
        error: 'Source page not found',
        message: `Cannot find page ${sourceSlug}`,
      };
    }

    // Check if target slug already exists
    const { data: existingTarget, error: checkError } = await (client as any)
      .from('page_content')
      .select('id')
      .eq('slug', targetSlug)
      .maybeSingle();

    if (existingTarget) {
      return {
        success: false,
        error: 'Target slug exists',
        message: `Page with slug ${targetSlug} already exists`,
      };
    }

    // Create new page with target slug
    const newPagePayload = {
      slug: targetSlug,
      heading: contentOverrides?.heading || sourcePage.heading,
      subheading: contentOverrides?.subheading || sourcePage.subheading,
      tagline: contentOverrides?.tagline || sourcePage.tagline,
      meta_title: contentOverrides?.meta_title || sourcePage.meta_title,
      meta_description: contentOverrides?.meta_description || sourcePage.meta_description,
      cta_heading: contentOverrides?.cta_heading || sourcePage.cta_heading,
      cta_description: contentOverrides?.cta_description || sourcePage.cta_description,
      cta_button: contentOverrides?.cta_button || sourcePage.cta_button,
      layout_config: layoutConfigOverride !== undefined ? layoutConfigOverride : sourcePage.layout_config,
      is_canonical: sourcePage.is_canonical,
      template_type: sourcePage.template_type,
      status: sourcePage.status,
      seo_config: sourcePage.seo_config,
      updated_at: new Date().toISOString(),
    };

    const { data: newPage, error: insertError } = await (client as any)
      .from('page_content')
      .insert(newPagePayload)
      .select('id')
      .single();

    if (insertError || !newPage) {
      return {
        success: false,
        error: insertError?.message || 'Insert failed',
        message: `Failed to create new page: ${insertError?.message}`,
      };
    }

    // Fetch source sections
    const { data: sourceSections, error: sectionsError } = await (client as any)
      .from('section_content')
      .select('*')
      .eq('page_id', sourcePage.id)
      .order('order_index', { ascending: true });

    if (sectionsError) {
      return {
        success: false,
        error: sectionsError.message,
        message: `Page created but sections fetch failed: ${sectionsError.message}`,
        pageId: newPage.id,
      };
    }

    // Copy sections to new page
    if (sourceSections && sourceSections.length > 0) {
      const newSections = sourceSections.map((section: any) => ({
        page_id: newPage.id,
        page_slug: targetSlug,
        section_name: section.section_name,
        section_type: section.section_type,
        order_index: section.order_index,
        content: section.content,
        layout_config: section.layout_config,
        is_visible: section.is_visible,
      }));

      const { error: insertSectionsError } = await (client as any)
        .from('section_content')
        .insert(newSections);

      if (insertSectionsError) {
        return {
          success: false,
          error: insertSectionsError.message,
          message: `Page created but sections copy failed: ${insertSectionsError.message}`,
          pageId: newPage.id,
        };
      }
    }

    console.log(`[Duplication] Successfully duplicated ${sourceSlug} to ${targetSlug}`, {
      pageId: newPage.id,
      sectionCount: sourceSections?.length || 0,
    });

    return {
      success: true,
      pageId: newPage.id,
      message: `Successfully duplicated page to ${targetSlug}`,
    };
  } catch (err: any) {
    console.error('[Duplication] Unexpected error:', err);
    return {
      success: false,
      error: err.message || 'Unknown error',
      message: `Duplication failed: ${err.message || 'Unknown error'}`,
    };
  }
}

/**
 * Batch canonicalize multiple pages.
 */
export async function canonicalizePages(
  pages: Array<{ slug: string; data: CanonicalPageData }>,
  onProgress?: (current: number, total: number, slug: string) => void
): Promise<{ results: CanonicalizeResult[]; successCount: number; failureCount: number }> {
  const results: CanonicalizeResult[] = [];
  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < pages.length; i++) {
    const { slug, data } = pages[i];

    if (onProgress) {
      onProgress(i + 1, pages.length, slug);
    }

    const result = await canonicalizePage(slug, data, { overwrite: false });
    results.push(result);

    if (result.success) {
      successCount++;
    } else {
      failureCount++;
    }

    // Small delay to avoid overwhelming database
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return { results, successCount, failureCount };
}
