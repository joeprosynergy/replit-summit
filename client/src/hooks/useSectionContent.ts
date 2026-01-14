import { useState, useEffect, useCallback, useRef } from 'react';
import { getBackendClient, isBackendAvailable } from '@/lib/backendClient';
import { toast } from 'sonner';

export interface SectionContent {
  [key: string]: string | number | boolean | string[] | Record<string, unknown>;
}

/**
 * Checks if a value is a valid image URL (not a bare filename).
 * 
 * The problem: CMS may store bare filenames like "greenhouse-1.jpg" which,
 * when rendered on /styles/greenhouse, resolve to /styles/greenhouse/greenhouse-1.jpg
 * and return 404s.
 * 
 * Valid (has path context):
 * - Full URLs: https://cdn.example.com/image.jpg
 * - Data URIs: data:image/png;base64,...
 * - Absolute paths: /images/foo.jpg, /cms/uploads/bar.png
 * 
 * Invalid (bare filenames - no path context):
 * - greenhouse.jpg
 * - my-image.png  
 * - image_123.webp
 */
function isValidImageUrl(value: unknown): boolean {
  if (typeof value !== 'string' || !value.trim()) {
    return false;
  }
  
  const trimmed = value.trim();
  
  // Full URLs - always valid
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return true;
  }
  
  // Data URIs - always valid
  if (trimmed.startsWith('data:')) {
    return true;
  }
  
  // Absolute paths (start with /) - valid (has path context)
  if (trimmed.startsWith('/')) {
    return true;
  }
  
  // Everything else is a bare filename or relative path without context - invalid
  // Examples: "greenhouse.jpg", "images/foo.jpg", "../bar.png"
  return false;
}

/**
 * Checks if a field key represents an image URL field.
 * Matches common image field naming patterns but EXCLUDES alt text fields.
 */
function isImageField(key: string): boolean {
  const lowerKey = key.toLowerCase();
  
  // EXCLUDE alt text fields - these contain descriptions, not URLs
  if (lowerKey.endsWith('alt')) {
    return false;
  }
  
  return lowerKey === 'image' ||
         lowerKey === 'src' ||
         lowerKey === 'url' ||
         lowerKey.endsWith('image') ||
         lowerKey.endsWith('images') ||
         lowerKey.endsWith('img') ||
         lowerKey.endsWith('src') ||
         lowerKey.endsWith('url') ||
         lowerKey.endsWith('photo') ||
         lowerKey.endsWith('picture') ||
         lowerKey.endsWith('background') ||
         lowerKey.endsWith('thumbnail') ||
         lowerKey.endsWith('avatar') ||
         lowerKey.endsWith('logo') ||
         lowerKey.endsWith('icon') ||
         (lowerKey.includes('image') && !lowerKey.includes('alt')) ||
         (lowerKey.includes('photo') && !lowerKey.includes('alt'));
}

/**
 * CMS-safe merge: Only override defaults when CMS provides a meaningful (non-empty) value.
 * Treats "", null, undefined as "unset" - these do NOT override defaults.
 * For image fields: Treats relative filenames as invalid and falls back to defaults.
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
    
    // IMAGE URL NORMALIZATION: For image fields, validate that URL is absolute
    // Relative filenames (e.g., "greenhouse-1.jpg") are treated as invalid
    // because they resolve to broken paths like /styles/greenhouse/greenhouse-1.jpg
    if (isImageField(key) && typeof cmsValue === 'string') {
      if (!isValidImageUrl(cmsValue)) {
        // Invalid relative filename - fall back to default
        console.warn(`[CMS] Rejecting invalid image URL for ${key}: "${cmsValue}"`);
        continue;
      }
    }
    
    // Handle arrays: merge items recursively if they're objects
    if (Array.isArray(cmsValue) && Array.isArray(defaultValue)) {
      const isImageArray = isImageField(key);
      const merged = cmsValue.map((cmsItem, index) => {
        const defaultItem = defaultValue[index];
        if (cmsItem && typeof cmsItem === 'object' && !Array.isArray(cmsItem) &&
            defaultItem && typeof defaultItem === 'object' && !Array.isArray(defaultItem)) {
          return deepMergeWithDefaults(defaultItem, cmsItem);
        }
        // For primitive arrays or non-matching types, check if item is empty
        if (cmsItem === null || cmsItem === undefined || cmsItem === '') {
          return defaultItem;
        }
        // For image arrays (e.g., galleryImages), validate each string entry
        if (isImageArray && typeof cmsItem === 'string') {
          if (!isValidImageUrl(cmsItem)) {
            // Invalid relative filename - fall back to default item (may be undefined)
            return defaultItem;
          }
        }
        return cmsItem;
      });
      // Filter out undefined entries (from CMS arrays longer than defaults with invalid URLs)
      result[key] = merged.filter((item) => item !== undefined);
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
  // Lifecycle guard: ensures merged content is set exactly once per section lifecycle
  const hasResolvedRef = useRef(false);
  // Stable baseline content ref - holds the resolved content without causing re-renders
  const baselineContentRef = useRef<T>(defaultContent);
  // Track current section identity to reset on navigation
  const sectionIdentityRef = useRef(`${pageSlug}/${sectionName}`);

  const [editedContent, setEditedContent] = useState<T>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [pageMetadata, setPageMetadata] = useState<PageMetadata>({
    pageId: null,
    layoutConfig: null,
    isCanonical: false,
  });
  // Version counter to force hasChanges recalculation after save
  const [baselineVersion, setBaselineVersion] = useState(0);

  // Reset lifecycle state when section identity changes (navigation)
  const currentIdentity = `${pageSlug}/${sectionName}`;
  if (sectionIdentityRef.current !== currentIdentity) {
    sectionIdentityRef.current = currentIdentity;
    hasResolvedRef.current = false;
    baselineContentRef.current = defaultContent;
  }

  useEffect(() => {
    const fetchContent = async () => {
      // LIFECYCLE GUARD: If already resolved, do not re-fetch or re-merge
      if (hasResolvedRef.current) {
        return;
      }

      if (!isBackendAvailable()) {
        // Mark resolved with defaults
        hasResolvedRef.current = true;
        baselineContentRef.current = defaultContent;
        setIsLoading(false);
        return;
      }

      const client = getBackendClient();
      if (!client) {
        // Mark resolved with defaults
        hasResolvedRef.current = true;
        baselineContentRef.current = defaultContent;
        setIsLoading(false);
        return;
      }

      let pageData = null;
      let pageError = null;
      let pageStatus = 0;
      
      try {
        const pageResult = await (client as any)
          .from('page_content')
          .select('id, layout_config, is_canonical')
          .eq('slug', pageSlug)
          .maybeSingle();
        pageData = pageResult.data;
        pageError = pageResult.error;
        pageStatus = pageResult.status || 0;
      } catch (e: any) {
        console.log(`[useSectionContent] CMS exception for ${pageSlug}/${sectionName}: ${e.message}`);
        hasResolvedRef.current = true;
        baselineContentRef.current = defaultContent;
        setEditedContent(defaultContent);
        setIsLoading(false);
        return;
      }

      // CMS FETCH FAILURE: Supabase returns { data: null, error: null, status: 401 }
      // We must check BOTH error object AND status code
      // Treat any non-success status (>=400) as failure and short-circuit to defaults
      const isHttpError = pageStatus >= 400;
      if (pageError || isHttpError) {
        console.log(`[useSectionContent] CMS unavailable for ${pageSlug}/${sectionName}: status=${pageStatus}, using defaults`);
        hasResolvedRef.current = true;
        baselineContentRef.current = defaultContent;
        setEditedContent(defaultContent);
        setIsLoading(false);
        return;
      }

      const pageId = pageData?.id || null;
      const layoutConfig = pageData?.layout_config || null;
      const isCanonical = pageData?.is_canonical || false;

      setPageMetadata({ pageId, layoutConfig, isCanonical });

      let data = null;
      let error = null;
      let sectionStatus = 0;

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
        sectionStatus = result.status || 0;
      }

      // If first query returned HTTP error, short-circuit immediately
      if (sectionStatus >= 400) {
        console.log(`[useSectionContent] CMS section unavailable for ${pageSlug}/${sectionName}: status=${sectionStatus}`);
        hasResolvedRef.current = true;
        baselineContentRef.current = defaultContent;
        setEditedContent(defaultContent);
        setIsLoading(false);
        return;
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
        sectionStatus = result.status || 0;
      }

      // CMS FETCH FAILURE: Check both error object AND status code
      const isSectionHttpError = sectionStatus >= 400;
      if (error || isSectionHttpError) {
        console.log(`[useSectionContent] CMS section unavailable for ${pageSlug}/${sectionName}: status=${sectionStatus}, error=${error?.code || error?.message || 'none'}`);
        hasResolvedRef.current = true;
        baselineContentRef.current = defaultContent;
        setEditedContent(defaultContent);
        setIsLoading(false);
        return;
      }

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

      // SINGLE RESOLUTION: Set content exactly once
      if (data && !error && data.content) {
        const cmsRaw = data.content as Partial<T>;
        
        // CMS-safe merge: Empty CMS values ("", null, undefined) do NOT override defaults
        const merged = deepMergeWithDefaults(defaultContent, cmsRaw);
        
        console.log(`[useSectionContent] Resolved ${pageSlug}/${sectionName}: ${Object.keys(merged).length} fields`);
        
        // Set baseline ref (stable reference) and edited state
        baselineContentRef.current = merged;
        setEditedContent(merged);
      } else {
        // No database content found - use defaults
        console.log(`[useSectionContent] Resolved ${pageSlug}/${sectionName}: using defaults (${Object.keys(defaultContent).length} fields)`);
        baselineContentRef.current = defaultContent;
        // editedContent already initialized with defaultContent
      }
      
      // Mark as resolved - no further state updates for this section lifecycle
      hasResolvedRef.current = true;
      setIsLoading(false);
    };

    fetchContent();
  }, [pageSlug, sectionName]);

  // Compare against stable baseline ref (baselineVersion forces recalc after save)
  const hasChanges = JSON.stringify(baselineContentRef.current) !== JSON.stringify(editedContent);

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
      // Update baseline ref (stable, no re-render) and bump version to recalc hasChanges
      baselineContentRef.current = JSON.parse(JSON.stringify(editedContent));
      setBaselineVersion(v => v + 1);
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
    setEditedContent(baselineContentRef.current);
  }, []);

  const updateField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setEditedContent(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateDynamicField = useCallback((field: string, value: string | number | boolean) => {
    setEditedContent(prev => ({ ...prev, [field]: value } as T));
  }, []);

  // Include baselineVersion in the return to ensure React re-renders when it changes
  void baselineVersion;

  return {
    content: editedContent,
    originalContent: baselineContentRef.current,
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
