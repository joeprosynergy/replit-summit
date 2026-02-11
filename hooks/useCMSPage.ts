"use client";

import { useState, useEffect } from 'react';
import { CMSFallbackManager } from '@/lib/cmsFallback';

/**
 * Hook to use CMS page data with sections.
 */

interface PageData {
  id: string;
  slug: string;
  heading?: string;
  subheading?: string;
  tagline?: string;
  meta_title?: string;
  meta_description?: string;
  cta_heading?: string;
  cta_description?: string;
  cta_button?: string;
  layout_config?: Record<string, unknown>;
  is_canonical?: boolean;
  template_type?: string;
  status?: string;
  seo_config?: Record<string, unknown>;
}

interface SectionData {
  id: string;
  page_id: string;
  page_slug: string;
  section_name: string;
  section_type?: string;
  order_index: number;
  content: Record<string, unknown>;
  layout_config?: Record<string, unknown>;
  is_visible?: boolean;
}

export function useCMSPage(slug: string) {
  const [page, setPage] = useState<PageData | null>(null);
  const [sections, setSections] = useState<SectionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPage() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await CMSFallbackManager.getContent(slug);
        if (result.data) {
          const data = result.data as { _page?: PageData; _sections?: SectionData[] };
          setPage(data._page || null);
          setSections(data._sections || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch page');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPage();
  }, [slug]);

  return { page, sections, isLoading, error };
}
