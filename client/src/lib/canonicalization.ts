import { getBackendClient } from '@/lib/backendClient';

const PAGE_CONTENT_LOADERS: Record<string, () => Promise<Record<string, any>>> = {
  'economy-shed': async () => (await import('@/pages/EconomyShed')).defaultContent,
  'budget-pro-utility': async () => (await import('@/pages/BudgetProUtility')).defaultContent,
  'budget-pro-lofted-barn': async () => (await import('@/pages/BudgetProLoftedBarn')).defaultContent,
  'utility-shed': async () => (await import('@/pages/UtilityShed')).defaultContent,
  'pro-lofted-barn': async () => (await import('@/pages/ProLoftedBarn')).defaultContent,
  'cabin': async () => (await import('@/pages/Cabin')).defaultContent,
  'barn-cabin': async () => (await import('@/pages/BarnCabin')).defaultContent,
  'modern-shed': async () => (await import('@/pages/ModernShed')).defaultContent,
  'garage': async () => (await import('@/pages/Garage')).defaultContent,
  'carports': async () => (await import('@/pages/Carports')).defaultContent,
  'greenhouse': async () => (await import('@/pages/Greenhouse')).defaultContent,
  'animal-shelters': async () => (await import('@/pages/AnimalShelters')).defaultContent,
  'home': async () => (await import('@/pages/Index')).defaultContent,
  'about-us': async () => (await import('@/pages/AboutUs')).defaultContent,
  'buyers-guide': async () => (await import('@/pages/BuyersGuide')).defaultContent,
  'gallery': async () => (await import('@/pages/Gallery')).defaultContent,
  'financing': async () => (await import('@/pages/Financing')).defaultContent,
  'privacy-policy': async () => (await import('@/pages/PrivacyPolicy')).defaultContent,
  'styles': async () => (await import('@/pages/Styles')).defaultContent,
  'styles-utility': async () => (await import('@/pages/StylesUtility')).defaultContent,
  'styles-barn': async () => (await import('@/pages/StylesBarn')).defaultContent,
  'styles-modern': async () => (await import('@/pages/StylesModern')).defaultContent,
  'types': async () => (await import('@/pages/OurModels')).defaultContent,
  'basic-storage': async () => (await import('@/pages/BasicStorage')).defaultContent,
  'deluxe-storage-cabins': async () => (await import('@/pages/DeluxeStorageCabins')).defaultContent,
  'garages-carports': async () => (await import('@/pages/GaragesCarports')).defaultContent,
};

export interface CanonicalPageData {
  slug: string;
  pageId: string | null;
  sectionName: string;
  content: Record<string, any>;
  layoutConfig: Record<string, any> | null;
  isCanonical: boolean;
}

export function isStaticPage(slug: string): boolean {
  return slug in PAGE_CONTENT_LOADERS;
}

export async function getStaticDefaultContent(slug: string): Promise<Record<string, any> | null> {
  const loader = PAGE_CONTENT_LOADERS[slug];
  if (!loader) {
    return null;
  }
  try {
    return await loader();
  } catch (err) {
    console.error(`[canonicalization] Failed to load default content for ${slug}:`, err);
    return null;
  }
}

function deepMerge(defaults: Record<string, any>, overrides: Record<string, any>): Record<string, any> {
  const result = { ...defaults };
  
  for (const key of Object.keys(overrides)) {
    const overrideValue = overrides[key];
    const defaultValue = defaults[key];
    
    if (overrideValue === null || overrideValue === undefined) {
      continue;
    }
    
    if (
      typeof overrideValue === 'object' && 
      !Array.isArray(overrideValue) &&
      typeof defaultValue === 'object' && 
      !Array.isArray(defaultValue) &&
      defaultValue !== null
    ) {
      result[key] = deepMerge(defaultValue, overrideValue);
    } else {
      result[key] = overrideValue;
    }
  }
  
  return result;
}

export async function ensureCanonicalPage(slug: string): Promise<CanonicalPageData | null> {
  const client = getBackendClient();
  if (!client) {
    console.error('[canonicalization] No database client available');
    return null;
  }

  const { data: existingPage } = await (client as any)
    .from('page_content')
    .select('id, layout_config, is_canonical')
    .eq('slug', slug)
    .maybeSingle();

  const pageId = existingPage?.id || null;
  const layoutConfig = existingPage?.layout_config || null;
  const isAlreadyCanonical = existingPage?.is_canonical || false;

  let existingSection = null;
  
  if (pageId) {
    const { data } = await (client as any)
      .from('section_content')
      .select('*')
      .eq('page_id', pageId)
      .eq('section_name', 'main')
      .maybeSingle();
    existingSection = data;
  }
  
  if (!existingSection) {
    const { data } = await (client as any)
      .from('section_content')
      .select('*')
      .eq('page_slug', slug)
      .eq('section_name', 'main')
      .maybeSingle();
    existingSection = data;
  }

  const staticDefaults = await getStaticDefaultContent(slug);
  const dbContent = existingSection?.content || {};

  let canonicalContent: Record<string, any>;

  if (staticDefaults && Object.keys(staticDefaults).length > 0) {
    canonicalContent = deepMerge(staticDefaults, dbContent);
    
    const staticKeyCount = Object.keys(staticDefaults).length;
    const dbKeyCount = Object.keys(dbContent).length;
    const mergedKeyCount = Object.keys(canonicalContent).length;
    
    console.log(`[canonicalization] Page ${slug}: static=${staticKeyCount} keys, db=${dbKeyCount} keys, merged=${mergedKeyCount} keys`);
    
    const needsUpdate = !existingSection || mergedKeyCount > dbKeyCount || JSON.stringify(dbContent) !== JSON.stringify(canonicalContent);
    
    let finalPageId = pageId;
    let finalLayoutConfig = layoutConfig;
    
    if (needsUpdate || !isAlreadyCanonical) {
      console.log(`[canonicalization] Persisting canonical content for ${slug}`);

      const pagePayload: Record<string, any> = {
        slug,
        heading: canonicalContent.title || canonicalContent.heading || slug,
        tagline: canonicalContent.subtitle || canonicalContent.tagline || '',
        subheading: canonicalContent.description || canonicalContent.subheading || '',
        meta_title: canonicalContent.metaTitle || `${slug} | Summit Portable Buildings`,
        meta_description: canonicalContent.metaDescription || '',
        is_canonical: true,
      };

      if (!layoutConfig && canonicalContent) {
        pagePayload.layout_config = {
          heroBackground: canonicalContent.heroBackground || null,
          heroLayout: canonicalContent.heroLayout || null,
          backgroundColor: canonicalContent.backgroundColor || null,
          theme: canonicalContent.theme || null,
        };
        finalLayoutConfig = pagePayload.layout_config;
      }

      if (!existingPage) {
        const { data: insertedPage, error: pageInsertError } = await (client as any)
          .from('page_content')
          .insert(pagePayload)
          .select('id')
          .single();
        
        if (pageInsertError) {
          console.error(`[canonicalization] Failed to insert page_content for ${slug}:`, pageInsertError);
        } else {
          finalPageId = insertedPage?.id || null;
        }
      } else {
        await (client as any)
          .from('page_content')
          .update({ ...pagePayload, layout_config: pagePayload.layout_config || layoutConfig })
          .eq('id', pageId);
        finalPageId = pageId;
      }

      const sectionPayload: Record<string, any> = {
        page_slug: slug,
        section_name: 'main',
        content: canonicalContent,
      };
      
      if (finalPageId) {
        sectionPayload.page_id = finalPageId;
      }
      
      if (existingSection) {
        const { error } = await (client as any)
          .from('section_content')
          .update({ content: canonicalContent, page_id: finalPageId })
          .eq('id', existingSection.id);
        
        if (error) {
          console.error(`[canonicalization] Failed to update section_content for ${slug}:`, error);
          return null;
        }
      } else {
        const { error } = await (client as any)
          .from('section_content')
          .insert(sectionPayload);
        
        if (error) {
          console.error(`[canonicalization] Failed to insert section_content for ${slug}:`, error);
          return null;
        }
      }
    } else {
      console.log(`[canonicalization] Page ${slug} already fully canonical`);
    }

    return {
      slug,
      pageId: finalPageId,
      sectionName: 'main',
      content: canonicalContent,
      layoutConfig: finalLayoutConfig,
      isCanonical: true,
    };
  }

  if (existingSection && existingSection.content && Object.keys(existingSection.content).length > 0) {
    console.log(`[canonicalization] Page ${slug} is dynamic (no static defaults), using DB content`);
    return {
      slug,
      pageId,
      sectionName: 'main',
      content: existingSection.content,
      layoutConfig,
      isCanonical: true,
    };
  }

  console.warn(`[canonicalization] No content found for ${slug} (not static, not in DB)`);
  return null;
}

export async function duplicateCanonicalPage(
  sourceSlug: string,
  targetSlug: string,
  providedContent?: Record<string, any>,
  providedLayoutConfig?: Record<string, any> | null
): Promise<{ success: boolean; message: string }> {
  const client = getBackendClient();
  if (!client) {
    return { success: false, message: 'Database client not available' };
  }

  const { data: existingPageTarget } = await (client as any)
    .from('page_content')
    .select('id')
    .eq('slug', targetSlug)
    .maybeSingle();

  if (existingPageTarget) {
    return { success: false, message: 'A page with this slug already exists' };
  }

  let contentToClone: Record<string, any>;
  let layoutConfigToClone: Record<string, any> | null = providedLayoutConfig || null;

  if (providedContent && Object.keys(providedContent).length > 0) {
    console.log(`[canonicalization] Using provided content (${Object.keys(providedContent).length} fields) for duplication`);
    contentToClone = providedContent;
  } else {
    const canonical = await ensureCanonicalPage(sourceSlug);
    
    if (!canonical) {
      return { success: false, message: `Could not canonicalize source page: ${sourceSlug}` };
    }

    if (!canonical.content || Object.keys(canonical.content).length === 0) {
      return { success: false, message: `Source page ${sourceSlug} has no content to duplicate` };
    }
    
    contentToClone = canonical.content;
    layoutConfigToClone = layoutConfigToClone || canonical.layoutConfig;
  }

  console.log(`[canonicalization] Duplicating page ${sourceSlug} (${Object.keys(contentToClone).length} fields) to ${targetSlug}`);

  const deepClonedContent = JSON.parse(JSON.stringify(contentToClone));
  const deepClonedLayoutConfig = layoutConfigToClone ? JSON.parse(JSON.stringify(layoutConfigToClone)) : null;

  const pagePayload: Record<string, any> = {
    slug: targetSlug,
    heading: deepClonedContent.title || deepClonedContent.heading || targetSlug,
    tagline: deepClonedContent.subtitle || deepClonedContent.tagline || '',
    subheading: deepClonedContent.description || deepClonedContent.subheading || '',
    cta_heading: deepClonedContent.ctaHeading || deepClonedContent.cta_heading || '',
    cta_description: deepClonedContent.ctaDescription || deepClonedContent.cta_description || '',
    cta_button: deepClonedContent.ctaPrimaryButton || deepClonedContent.cta_button || '',
    meta_title: deepClonedContent.metaTitle || `${targetSlug} | Summit Portable Buildings`,
    meta_description: deepClonedContent.metaDescription || '',
    is_canonical: true,
    layout_config: deepClonedLayoutConfig || {
      heroBackground: deepClonedContent.heroBackground || null,
      heroLayout: deepClonedContent.heroLayout || null,
      backgroundColor: deepClonedContent.backgroundColor || null,
      theme: deepClonedContent.theme || null,
    },
  };

  const { data: insertedPage, error: pageError } = await (client as any)
    .from('page_content')
    .insert(pagePayload)
    .select('id')
    .single();

  if (pageError) {
    console.error(`[canonicalization] Failed to insert page_content for ${targetSlug}:`, pageError);
    return { success: false, message: `Failed to create page: ${pageError.message}` };
  }

  const newPageId = insertedPage?.id;
  console.log(`[canonicalization] Created page_content for ${targetSlug} with id: ${newPageId}`);

  console.log(`[canonicalization] Inserting section_content for ${targetSlug}:`, {
    page_slug: targetSlug,
    page_id: newPageId,
    section_name: 'main',
    contentFieldCount: Object.keys(deepClonedContent).length,
  });

  const { data: insertedSection, error: sectionError } = await (client as any)
    .from('section_content')
    .insert({
      page_slug: targetSlug,
      page_id: newPageId,
      section_name: 'main',
      content: deepClonedContent,
    })
    .select('id, page_slug, page_id, section_name');

  if (sectionError) {
    console.error(`[canonicalization] Failed to insert section_content for ${targetSlug}:`, sectionError);
    await (client as any).from('page_content').delete().eq('id', newPageId);
    return { success: false, message: `Failed to duplicate section content: ${sectionError.message}` };
  }

  console.log(`[canonicalization] Successfully inserted section_content:`, insertedSection);

  return { success: true, message: `Successfully duplicated ${sourceSlug} to ${targetSlug} (${Object.keys(deepClonedContent).length} fields)` };
}
