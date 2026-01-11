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
  sectionName: string;
  content: Record<string, any>;
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

  const { data: existingSection } = await (client as any)
    .from('section_content')
    .select('*')
    .eq('page_slug', slug)
    .eq('section_name', 'main')
    .maybeSingle();

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
    
    if (needsUpdate) {
      console.log(`[canonicalization] Persisting canonical content for ${slug}`);
      
      if (existingSection) {
        const { error } = await (client as any)
          .from('section_content')
          .update({ content: canonicalContent })
          .eq('id', existingSection.id);
        
        if (error) {
          console.error(`[canonicalization] Failed to update section_content for ${slug}:`, error);
          return null;
        }
      } else {
        const { error } = await (client as any)
          .from('section_content')
          .insert({
            page_slug: slug,
            section_name: 'main',
            content: canonicalContent,
          });
        
        if (error) {
          console.error(`[canonicalization] Failed to insert section_content for ${slug}:`, error);
          return null;
        }
      }

      const pagePayload = {
        slug,
        heading: canonicalContent.title || canonicalContent.heading || slug,
        tagline: canonicalContent.subtitle || canonicalContent.tagline || '',
        subheading: canonicalContent.description || canonicalContent.subheading || '',
        meta_title: canonicalContent.metaTitle || `${slug} | Summit Portable Buildings`,
        meta_description: canonicalContent.metaDescription || '',
      };

      const { data: existingPage } = await (client as any)
        .from('page_content')
        .select('id')
        .eq('slug', slug)
        .maybeSingle();

      if (!existingPage) {
        await (client as any)
          .from('page_content')
          .insert(pagePayload);
      }
    } else {
      console.log(`[canonicalization] Page ${slug} already fully canonical`);
    }

    return {
      slug,
      sectionName: 'main',
      content: canonicalContent,
      isCanonical: true,
    };
  }

  if (existingSection && existingSection.content && Object.keys(existingSection.content).length > 0) {
    console.log(`[canonicalization] Page ${slug} is dynamic (no static defaults), using DB content`);
    return {
      slug,
      sectionName: 'main',
      content: existingSection.content,
      isCanonical: true,
    };
  }

  console.warn(`[canonicalization] No content found for ${slug} (not static, not in DB)`);
  return null;
}

export async function duplicateCanonicalPage(
  sourceSlug: string,
  targetSlug: string
): Promise<{ success: boolean; message: string }> {
  const client = getBackendClient();
  if (!client) {
    return { success: false, message: 'Database client not available' };
  }

  const { data: existingTarget } = await (client as any)
    .from('section_content')
    .select('id')
    .eq('page_slug', targetSlug)
    .limit(1);

  if (existingTarget && existingTarget.length > 0) {
    return { success: false, message: 'A page with this slug already exists' };
  }

  const { data: existingPageTarget } = await (client as any)
    .from('page_content')
    .select('id')
    .eq('slug', targetSlug)
    .maybeSingle();

  if (existingPageTarget) {
    return { success: false, message: 'A page with this slug already exists' };
  }

  const canonical = await ensureCanonicalPage(sourceSlug);
  
  if (!canonical) {
    return { success: false, message: `Could not canonicalize source page: ${sourceSlug}` };
  }

  if (!canonical.content || Object.keys(canonical.content).length === 0) {
    return { success: false, message: `Source page ${sourceSlug} has no content to duplicate` };
  }

  console.log(`[canonicalization] Duplicating canonical page ${sourceSlug} (${Object.keys(canonical.content).length} fields) to ${targetSlug}`);

  const deepClonedContent = JSON.parse(JSON.stringify(canonical.content));

  const { error: sectionError } = await (client as any)
    .from('section_content')
    .insert({
      page_slug: targetSlug,
      section_name: canonical.sectionName,
      content: deepClonedContent,
    });

  if (sectionError) {
    console.error(`[canonicalization] Failed to insert section_content for ${targetSlug}:`, sectionError);
    return { success: false, message: `Failed to duplicate section content: ${sectionError.message}` };
  }

  const pagePayload = {
    slug: targetSlug,
    heading: deepClonedContent.title || deepClonedContent.heading || targetSlug,
    tagline: deepClonedContent.subtitle || deepClonedContent.tagline || '',
    subheading: deepClonedContent.description || deepClonedContent.subheading || '',
    cta_heading: deepClonedContent.ctaHeading || deepClonedContent.cta_heading || '',
    cta_description: deepClonedContent.ctaDescription || deepClonedContent.cta_description || '',
    cta_button: deepClonedContent.ctaPrimaryButton || deepClonedContent.cta_button || '',
    meta_title: deepClonedContent.metaTitle || `${targetSlug} | Summit Portable Buildings`,
    meta_description: deepClonedContent.metaDescription || '',
  };

  const { error: pageError } = await (client as any)
    .from('page_content')
    .insert(pagePayload);

  if (pageError) {
    console.error(`[canonicalization] Failed to insert page_content for ${targetSlug}:`, pageError);
  }

  return { success: true, message: `Successfully duplicated ${sourceSlug} to ${targetSlug} (${Object.keys(deepClonedContent).length} fields)` };
}
