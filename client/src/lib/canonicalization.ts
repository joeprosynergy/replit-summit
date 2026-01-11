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

  if (existingSection && existingSection.content && Object.keys(existingSection.content).length > 0) {
    console.log(`[canonicalization] Page ${slug} already canonical in database`);
    return {
      slug,
      sectionName: 'main',
      content: existingSection.content,
      isCanonical: true,
    };
  }

  const staticContent = await getStaticDefaultContent(slug);
  
  if (staticContent && Object.keys(staticContent).length > 0) {
    console.log(`[canonicalization] Hydrating static page ${slug} to database`);
    
    if (existingSection) {
      const { error } = await (client as any)
        .from('section_content')
        .update({ content: staticContent })
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
          content: staticContent,
        });
      
      if (error) {
        console.error(`[canonicalization] Failed to insert section_content for ${slug}:`, error);
        return null;
      }
    }

    const pagePayload = {
      slug,
      heading: staticContent.title || staticContent.heading || slug,
      tagline: staticContent.subtitle || staticContent.tagline || '',
      subheading: staticContent.description || staticContent.subheading || '',
      meta_title: staticContent.metaTitle || `${slug} | Summit Portable Buildings`,
      meta_description: staticContent.metaDescription || '',
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

    return {
      slug,
      sectionName: 'main',
      content: staticContent,
      isCanonical: true,
    };
  }

  if (existingSection && existingSection.content) {
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

  console.log(`[canonicalization] Duplicating canonical page ${sourceSlug} to ${targetSlug}`);

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

  return { success: true, message: `Successfully duplicated ${sourceSlug} to ${targetSlug}` };
}
