import { useState, useEffect, useCallback } from 'react';
import { getBackendClient, isBackendAvailable } from '@/lib/backendClient';
import { toast } from 'sonner';

export interface SectionContent {
  [key: string]: string | number | boolean | string[] | Record<string, unknown>;
}

/**
 * CMS-safe merge: Only override defaults when CMS provides a meaningful (non-empty) value.
 * Treats "", null, undefined as "unset" - these do NOT override defaults.
 * Supports nested objects and arrays.
 */
function deepMergeWithDefaults<T>(defaults: T, cmsData: Partial<T>): T {
  if (!cmsData || typeof cmsData !== 'object') {
    return defaults;
  }
  
  const result = { ...defaults } as Record<string, unknown>;
  
  for (const key of Object.keys(cmsData)) {
    const cmsValue = (cmsData as Record<string, unknown>)[key];
    const defaultValue = (defaults as Record<string, unknown>)[key];
    
    // Check if CMS value is "unset" (empty/null/undefined)
    const isUnset = cmsValue === null || 
                    cmsValue === undefined || 
                    cmsValue === '';
    
    if (isUnset) {
      // CMS value is empty - keep default
      continue;
    }
    
    // Handle arrays: merge items recursively if they're objects
    if (Array.isArray(cmsValue) && Array.isArray(defaultValue)) {
      result[key] = cmsValue.map((cmsItem, index) => {
        const defaultItem = defaultValue[index];
        if (cmsItem && typeof cmsItem === 'object' && !Array.isArray(cmsItem) &&
            defaultItem && typeof defaultItem === 'object' && !Array.isArray(defaultItem)) {
          return deepMergeWithDefaults(defaultItem, cmsItem);
        }
        // For primitive arrays or non-matching types, check if item is empty
        if (cmsItem === null || cmsItem === undefined || cmsItem === '') {
          return defaultItem;
        }
        return cmsItem;
      });
      continue;
    }
    
    // Handle nested objects
    if (cmsValue && typeof cmsValue === 'object' && !Array.isArray(cmsValue) &&
        defaultValue && typeof defaultValue === 'object' && !Array.isArray(defaultValue)) {
      result[key] = deepMergeWithDefaults(defaultValue, cmsValue);
      continue;
    }
    
    // CMS has a meaningful value - use it
    result[key] = cmsValue;
  }
  
  return result as T;
}

export interface PageMetadata {
  pageId: string | null;
  layoutConfig: Record<string, any> | null;
  isCanonical: boolean;
}

export function useSectionContent<T extends SectionContent>(
  pageSlug: string,
  sectionName: string,
  defaultContent: T
) {
  const [content, setContent] = useState<T>(defaultContent);
  const [editedContent, setEditedContent] = useState<T>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [pageMetadata, setPageMetadata] = useState<PageMetadata>({
    pageId: null,
    layoutConfig: null,
    isCanonical: false,
  });

  useEffect(() => {
    const fetchContent = async () => {
      if (!isBackendAvailable()) {
        setIsLoading(false);
        return;
      }

      const client = getBackendClient();
      if (!client) {
        setIsLoading(false);
        return;
      }

      const { data: pageData } = await (client as any)
        .from('page_content')
        .select('id, layout_config, is_canonical')
        .eq('slug', pageSlug)
        .maybeSingle();

      const pageId = pageData?.id || null;
      const layoutConfig = pageData?.layout_config || null;
      const isCanonical = pageData?.is_canonical || false;

      setPageMetadata({ pageId, layoutConfig, isCanonical });

      let data = null;
      let error = null;

      if (pageId) {
        const result = await (client as any)
          .from('section_content')
          .select('id, content, page_id')
          .eq('page_id', pageId)
          .eq('section_name', sectionName)
          .order('updated_at', { ascending: false, nullsFirst: false })
          .limit(1)
          .maybeSingle();
        data = result.data;
        error = result.error;
      }

      if (!data && !error) {
        const result = await (client as any)
          .from('section_content')
          .select('id, content, page_id')
          .eq('page_slug', pageSlug)
          .eq('section_name', sectionName)
          .order('updated_at', { ascending: false, nullsFirst: false })
          .order('created_at', { ascending: false, nullsFirst: false })
          .limit(1)
          .maybeSingle();
        data = result.data;
        error = result.error;
      }

      if (error) {
        console.error('[useSectionContent] Fetch error:', error);
      }

      console.log(`[useSectionContent] Fetch result for ${pageSlug}/${sectionName}:`, {
        hasData: !!data,
        hasError: !!error,
        hasContent: !!(data?.content),
        contentFieldCount: data?.content ? Object.keys(data.content).length : 0,
        defaultContentFieldCount: Object.keys(defaultContent).length,
        pageId,
        usedPageId: !!data?.page_id,
      });

      // Diagnostic guards for economy-shed-working-copy ONLY
      if (pageSlug === 'economy-shed-working-copy') {
        const isLayoutConfigMissing = !layoutConfig || 
          (typeof layoutConfig === 'object' && Object.keys(layoutConfig).length === 0);
        
        if (isLayoutConfigMissing) {
          throw new Error('Page is not canonical: layout_config missing');
        }
        
        if (!data || !data.content) {
          throw new Error('Page is not canonical: no sections found');
        }

        // Check section content completeness
        const sectionContent = data.content as Record<string, unknown>;
        const contentKeys = Object.keys(sectionContent);
        
        // Required fields for economy-shed type pages
        const requiredFields = [
          'title',
          'titleHighlight', 
          'description',
          'subtitle',
          'heroImage',
          'heroImageAlt',
        ];
        
        const missingFields = requiredFields.filter(field => {
          const value = sectionContent[field];
          return value === null || value === undefined || value === '';
        });
        
        if (contentKeys.length === 0 || missingFields.length > 0) {
          console.error('[useSectionContent] Incomplete section content for economy-shed-working-copy:', {
            totalFields: contentKeys.length,
            missingFields,
          });
          throw new Error('Page is not canonical: section content incomplete');
        }
      }

      if (data && !error && data.content) {
        // CMS-FIRST GUARD: If section_content exists for this page_id,
        // the page is authoritative and must NOT be merged with defaults
        // Check if this page has CMS-first sections (sections other than 'main')
        let isCmsFirstPage = false;
        if (pageId) {
          const { data: allSections } = await (client as any)
            .from('section_content')
            .select('section_name')
            .eq('page_id', pageId);
          
          if (allSections && allSections.length > 0) {
            isCmsFirstPage = allSections.some((s: { section_name: string }) => s.section_name !== 'main');
          }
        }

        // CMS-safe merge: Empty CMS values ("", null, undefined) do NOT override defaults
        // This works for both CMS-first and legacy pages
        const merged = deepMergeWithDefaults(defaultContent, data.content as Partial<T>);
        console.log(`[useSectionContent] CMS-safe merged content has ${Object.keys(merged).length} fields (CMS-first: ${isCmsFirstPage})`);
        setContent(merged);
        setEditedContent(merged);
      } else {
        // No database content found - use defaults
        // CMS-safe merge with empty object = keep all defaults
        // This ensures consistent behavior: empty/missing CMS values never override defaults
        console.log(`[useSectionContent] No DB content, using defaultContent with ${Object.keys(defaultContent).length} fields`);
        // Content already initialized with defaultContent, no change needed
      }
      setIsLoading(false);
    };

    fetchContent();
  }, [pageSlug, sectionName]);

  const hasChanges = JSON.stringify(content) !== JSON.stringify(editedContent);

  const save = useCallback(async () => {
    const client = getBackendClient();
    if (!client) return false;

    setIsSaving(true);

    try {
      let existingQuery = (client as any)
        .from('section_content')
        .select('id, page_id');

      if (pageMetadata.pageId) {
        existingQuery = existingQuery.eq('page_id', pageMetadata.pageId).eq('section_name', sectionName);
      } else {
        existingQuery = existingQuery.eq('page_slug', pageSlug).eq('section_name', sectionName);
      }

      const { data: existing, error: existingError } = await existingQuery
        .order('updated_at', { ascending: false, nullsFirst: false })
        .limit(1)
        .maybeSingle();

      if (existingError) {
        toast.error(`Save failed: ${existingError.message || 'Query error'}`);
        console.error('[useSectionContent] Existing check error:', existingError);
        setIsSaving(false);
        return false;
      }

      const payload: Record<string, unknown> = {
        page_slug: pageSlug,
        section_name: sectionName,
        content: editedContent as unknown as Record<string, unknown>,
      };

      if (pageMetadata.pageId) {
        payload.page_id = pageMetadata.pageId;
      }

      let error;
      let writeResult;
      if (existing?.id) {
        writeResult = await (client as any)
          .from('section_content')
          .update({ content: payload.content, page_id: pageMetadata.pageId || existing.page_id })
          .eq('id', existing.id)
          .select('id');
        error = writeResult.error;
      } else {
        writeResult = await (client as any)
          .from('section_content')
          .insert(payload)
          .select('id');
        error = writeResult.error;
      }

      const writtenRow = writeResult?.data?.[0];

      if (error) {
        toast.error(`Save failed: ${error.message || 'Unknown error'}`);
        console.error('[useSectionContent] Save error:', error);
        setIsSaving(false);
        return false;
      }

      if (!writtenRow) {
        toast.error('Save failed: No row was written (check RLS policies)');
        console.error('[useSectionContent] No row returned after write');
        setIsSaving(false);
        return false;
      }

      console.log('[useSectionContent] Successfully wrote row:', writtenRow);
      toast.success('Section saved');
      setContent(editedContent);
      setIsSaving(false);
      return true;
    } catch (err: any) {
      toast.error(`Save failed: ${err.message || 'Unknown error'}`);
      console.error('[useSectionContent] Exception:', err);
      setIsSaving(false);
      return false;
    }
  }, [pageSlug, sectionName, editedContent, pageMetadata]);

  const reset = useCallback(() => {
    setEditedContent(content);
  }, [content]);

  const updateField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setEditedContent(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateDynamicField = useCallback((field: string, value: string | number | boolean) => {
    setEditedContent(prev => ({ ...prev, [field]: value } as T));
  }, []);

  return {
    content: editedContent,
    originalContent: content,
    isLoading,
    isSaving,
    hasChanges,
    updateField,
    updateDynamicField,
    save,
    reset,
    pageMetadata,
  };
}
