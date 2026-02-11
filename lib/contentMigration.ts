"use client";

import { getBackendClient } from '@/lib/backendClient';

export interface MigrationResult {
  slug: string;
  success: boolean;
  message: string;
}

export interface MigrationProgress {
  current: number;
  total: number;
  results: MigrationResult[];
}

const PAGE_CONFIGS: Array<{
  slug: string;
  sectionName: string;
  contentLoader: () => Promise<Record<string, any>>;
}> = [
  { slug: 'economy-shed', sectionName: 'main', contentLoader: async () => (await import('@/pages/EconomyShed')).defaultContent },
  { slug: 'budget-pro-utility', sectionName: 'main', contentLoader: async () => (await import('@/pages/BudgetProUtility')).defaultContent },
  { slug: 'budget-pro-lofted-barn', sectionName: 'main', contentLoader: async () => (await import('@/pages/BudgetProLoftedBarn')).defaultContent },
  { slug: 'utility-shed', sectionName: 'main', contentLoader: async () => (await import('@/pages/UtilityShed')).defaultContent },
  { slug: 'pro-lofted-barn', sectionName: 'main', contentLoader: async () => (await import('@/pages/ProLoftedBarn')).defaultContent },
  { slug: 'cabin', sectionName: 'main', contentLoader: async () => (await import('@/pages/Cabin')).defaultContent },
  { slug: 'barn-cabin', sectionName: 'main', contentLoader: async () => (await import('@/pages/BarnCabin')).defaultContent },
  { slug: 'modern-shed', sectionName: 'main', contentLoader: async () => (await import('@/pages/ModernShed')).defaultContent },
  { slug: 'garage', sectionName: 'main', contentLoader: async () => (await import('@/pages/Garage')).defaultContent },
  { slug: 'carports', sectionName: 'main', contentLoader: async () => (await import('@/pages/Carports')).defaultContent },
  { slug: 'greenhouse', sectionName: 'main', contentLoader: async () => (await import('@/pages/Greenhouse')).defaultContent },
  { slug: 'animal-shelters', sectionName: 'main', contentLoader: async () => (await import('@/pages/AnimalShelters')).defaultContent },
  { slug: 'home', sectionName: 'main', contentLoader: async () => (await import('@/pages/Index')).defaultContent },
  { slug: 'about-us', sectionName: 'main', contentLoader: async () => (await import('@/pages/AboutUs')).defaultContent },
  { slug: 'buyers-guide', sectionName: 'main', contentLoader: async () => (await import('@/pages/BuyersGuide')).defaultContent },
  { slug: 'gallery', sectionName: 'main', contentLoader: async () => (await import('@/pages/Gallery')).defaultContent },
  { slug: 'financing', sectionName: 'main', contentLoader: async () => (await import('@/pages/Financing')).defaultContent },
  { slug: 'privacy-policy', sectionName: 'main', contentLoader: async () => (await import('@/pages/PrivacyPolicy')).defaultContent },
  { slug: 'styles', sectionName: 'main', contentLoader: async () => (await import('@/pages/Styles')).defaultContent },
  { slug: 'styles-utility', sectionName: 'main', contentLoader: async () => (await import('@/pages/StylesUtility')).defaultContent },
  { slug: 'styles-barn', sectionName: 'main', contentLoader: async () => (await import('@/pages/StylesBarn')).defaultContent },
  { slug: 'styles-modern', sectionName: 'main', contentLoader: async () => (await import('@/pages/StylesModern')).defaultContent },
  { slug: 'types', sectionName: 'main', contentLoader: async () => (await import('@/pages/OurModels')).defaultContent },
  { slug: 'basic-storage', sectionName: 'main', contentLoader: async () => (await import('@/pages/BasicStorage')).defaultContent },
  { slug: 'deluxe-storage-cabins', sectionName: 'main', contentLoader: async () => (await import('@/pages/DeluxeStorageCabins')).defaultContent },
  { slug: 'garages-carports', sectionName: 'main', contentLoader: async () => (await import('@/pages/GaragesCarports')).defaultContent },
];

export async function migrateAllContent(
  onProgress?: (progress: MigrationProgress) => void
): Promise<MigrationResult[]> {
  const client = getBackendClient();
  if (!client) {
    throw new Error('Database client not available');
  }

  const results: MigrationResult[] = [];
  const total = PAGE_CONFIGS.length;

  for (let i = 0; i < PAGE_CONFIGS.length; i++) {
    const config = PAGE_CONFIGS[i];
    
    try {
      const content = await config.contentLoader();
      
      if (!content || Object.keys(content).length === 0) {
        results.push({
          slug: config.slug,
          success: false,
          message: 'No content found',
        });
        onProgress?.({ current: i + 1, total, results: [...results] });
        continue;
      }

      const { data: existing } = await (client as any)
        .from('section_content')
        .select('id')
        .eq('page_slug', config.slug)
        .eq('section_name', config.sectionName)
        .limit(1)
        .maybeSingle();

      if (existing) {
        const { error } = await (client as any)
          .from('section_content')
          .update({ content })
          .eq('id', existing.id);

        if (error) {
          results.push({
            slug: config.slug,
            success: false,
            message: `Update failed: ${error.message}`,
          });
        } else {
          results.push({
            slug: config.slug,
            success: true,
            message: 'Updated existing content',
          });
        }
      } else {
        const { error } = await (client as any)
          .from('section_content')
          .insert({
            page_slug: config.slug,
            section_name: config.sectionName,
            content,
          });

        if (error) {
          results.push({
            slug: config.slug,
            success: false,
            message: `Insert failed: ${error.message}`,
          });
        } else {
          results.push({
            slug: config.slug,
            success: true,
            message: 'Inserted new content',
          });
        }
      }

      const pagePayload = {
        slug: config.slug,
        heading: content.title || content.heading || config.slug,
        tagline: content.subtitle || content.tagline || '',
        subheading: content.description || content.subheading || '',
        meta_title: content.metaTitle || `${config.slug} | Summit Portable Buildings`,
        meta_description: content.metaDescription || '',
      };

      const { data: existingPage } = await (client as any)
        .from('page_content')
        .select('id')
        .eq('slug', config.slug)
        .limit(1)
        .maybeSingle();

      if (!existingPage) {
        await (client as any)
          .from('page_content')
          .insert(pagePayload);
      }

    } catch (err: any) {
      results.push({
        slug: config.slug,
        success: false,
        message: `Error: ${err.message || 'Unknown error'}`,
      });
    }

    onProgress?.({ current: i + 1, total, results: [...results] });
  }

  return results;
}
