import { useState, useEffect, useRef, useCallback } from 'react';
import { CMSFallbackManager } from '@/lib/cmsFallback';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { isBackendAvailable, getBackendClient } from '@/lib/backendClient';

/**
 * Simplified CMS Content Hook for Public Pages
 * Lightweight alternative to useSectionContent for public-facing pages.
 * Automatically handles CMS-first loading with fallback to defaults.
 */

export interface UseCMSContentOptions {
  /** Enable browser caching */
  cache?: boolean;
  /** Custom cache duration in milliseconds */
  cacheDuration?: number;
  /** Required fields that must be present */
  requiredFields?: string[];
}

export function useCMSContent<T extends Record<string, unknown> = Record<string, unknown>>(
  slug: string,
  defaults: T,
  options: UseCMSContentOptions = {}
) {
  const { isAdmin } = useOptionalAdminAuth();
  const [content, setContent] = useState<T>(defaults);
  const [originalContent, setOriginalContent] = useState<T>(defaults);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'cms' | 'cache' | 'defaults'>('defaults');
  const hasLoadedRef = useRef(false);
  
  // Track if content has been modified
  const hasChanges = JSON.stringify(content) !== JSON.stringify(originalContent);

  // Helper: Check if a value is a valid image path for the current environment
  const isValidImagePath = (value: unknown): boolean => {
    if (typeof value !== 'string' || !value) return false;
    
    // Cloudinary URLs are always valid
    if (value.includes('cloudinary.com') || value.includes('res.cloudinary')) return true;
    
    // External URLs are valid
    if (value.startsWith('http://') || value.startsWith('https://')) return true;
    
    // Production build paths (contain hash like -CanACH_M) don't work in dev
    // Source paths (/src/assets/) don't work in production build
    const isProductionPath = value.startsWith('/assets/') && /-[A-Za-z0-9_]{6,}\.(jpg|jpeg|png|gif|webp|svg)$/i.test(value);
    const isSourcePath = value.startsWith('/src/assets/');
    
    // In development, source paths work; in production, built paths work
    const isDev = import.meta.env.DEV;
    
    if (isDev && isProductionPath) return false; // Production paths don't work in dev
    if (!isDev && isSourcePath) return false; // Source paths don't work in production
    
    return true;
  };

  // Helper: Check if a key is an image-related field
  const isImageField = (key: string): boolean => {
    const imageFieldPatterns = [
      /image/i, /img/i, /photo/i, /picture/i, /src$/i, /thumbnail/i, /avatar/i, /logo/i, /icon/i, /banner/i
    ];
    return imageFieldPatterns.some(pattern => pattern.test(key));
  };

  // Helper: Deep merge CMS data with defaults (handles nested objects)
  const deepMergeWithDefaults = (cmsData: Partial<T>): T => {
    const result = { ...defaults } as any;
    
    for (const key in cmsData) {
      if (cmsData.hasOwnProperty(key)) {
        const cmsValue = (cmsData as any)[key];
        const defaultValue = (defaults as any)[key];
        
        // Special handling for image fields - validate path works in current environment
        if (isImageField(key) && typeof cmsValue === 'string') {
          if (!isValidImagePath(cmsValue)) {
            continue; // Skip this CMS value, keep default
          }
        }
        
        // Special handling for galleryImages array - validate each image
        if (key === 'galleryImages' && Array.isArray(cmsValue)) {
          const validatedImages = cmsValue.map((img: any, idx: number) => {
            if (img && typeof img.src === 'string' && !isValidImagePath(img.src)) {
              // Use default image for this index if available
              const defaultImg = Array.isArray(defaultValue) ? defaultValue[idx] : null;
              return defaultImg || img;
            }
            return img;
          });
          result[key] = validatedImages;
          continue;
        }
        
        // Special handling for arrays of objects with image fields (e.g., shelters array)
        if (Array.isArray(cmsValue) && Array.isArray(defaultValue) && cmsValue.length > 0 && typeof cmsValue[0] === 'object') {
          const validatedArray = cmsValue.map((item: any, idx: number) => {
            if (!item || typeof item !== 'object') return item;
            
            const defaultItem = defaultValue[idx];
            const validatedItem = { ...item };
            
            // Check each property in the object for image fields
            for (const itemKey in item) {
              if (isImageField(itemKey) && typeof item[itemKey] === 'string') {
                if (!isValidImagePath(item[itemKey])) {
                  // Use default value for this image field if available
                  if (defaultItem && defaultItem[itemKey]) {
                    validatedItem[itemKey] = defaultItem[itemKey];
                  }
                }
              }
            }
            
            return validatedItem;
          });
          result[key] = validatedArray;
          continue;
        }
        
        // If both are objects (not arrays), merge recursively
        if (
          cmsValue !== null &&
          typeof cmsValue === 'object' &&
          !Array.isArray(cmsValue) &&
          defaultValue !== null &&
          typeof defaultValue === 'object' &&
          !Array.isArray(defaultValue)
        ) {
          result[key] = { ...defaultValue, ...cmsValue };
        } else if (cmsValue !== undefined) {
          result[key] = cmsValue;
        }
      }
    }
    
    return result as T;
  };

  useEffect(() => {
    // Prevent double-loading in development (React StrictMode)
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    // Register defaults with fallback manager
    CMSFallbackManager.register(slug, defaults);

    async function loadContent() {
      setIsLoading(true);
      setError(null);

      const startTime = performance.now();
      try {
        const result = await CMSFallbackManager.getContent<T>(slug);
        const loadTime = Math.round(performance.now() - startTime);
        console.log(`[useCMSContent] Loaded ${slug} in ${loadTime}ms from ${result.source}`);

        if (result.data) {
          // Validate required fields if specified
          if (options.requiredFields && options.requiredFields.length > 0) {
            const missingFields = options.requiredFields.filter(
              field => !(result.data as any)?.[field]
            );

            if (missingFields.length > 0) {
              console.warn(
                `[useCMSContent] Missing required fields for ${slug}:`,
                missingFields
              );
              // Fall back to defaults if required fields are missing
              setContent(defaults);
              setSource('defaults');
              setIsLoading(false);
              return;
            }
          }

          // Deep merge CMS data with defaults to ensure nested objects exist
          const mergedContent = deepMergeWithDefaults(result.data as Partial<T>);
          setContent(mergedContent);
          setOriginalContent(mergedContent);
          setSource(result.source);
        } else {
          // No content available, use defaults
          setContent(defaults);
          setOriginalContent(defaults);
          setSource('defaults');
        }
      } catch (err: any) {
        console.error(`[useCMSContent] Error loading ${slug}:`, err);
        setError(err.message || 'Failed to load content');
        setContent(defaults);
        setSource('defaults');
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();

    // Cleanup
    return () => {
      // Optional: unregister defaults when component unmounts
      // CMSFallbackManager.unregister(slug);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Update content (for editing)
  const updateContent = useCallback((newContent: T) => {
    setContent(newContent);
  }, []);

  // Cancel changes (revert to original)
  const cancelChanges = useCallback(() => {
    setContent(originalContent);
  }, [originalContent]);

  // Save content to CMS
  const saveContent = useCallback(async (): Promise<void> => {
    if (!isBackendAvailable()) {
      setError('Backend not available');
      return;
    }

    const client = getBackendClient();
    if (!client) {
      setError('Backend client not available');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      // First, check if page exists
      const { data: existingPage, error: fetchError } = await (client as any)
        .from('page_content')
        .select('id')
        .eq('slug', slug)
        .maybeSingle();

      if (fetchError) {
        throw new Error(`Failed to check page: ${fetchError.message}`);
      }

      let pageId = existingPage?.id;

      if (!pageId) {
        // Create new page
        const { data: newPage, error: createError } = await (client as any)
          .from('page_content')
          .insert({
            slug,
            title: slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            status: 'published',
            cms_first_activated: true,
          })
          .select('id')
          .single();

        if (createError) {
          throw new Error(`Failed to create page: ${createError.message}`);
        }
        pageId = newPage.id;
      }

      // Upsert section content (using 'main' section for simple pages)
      const { error: sectionError } = await (client as any)
        .from('section_content')
        .upsert(
          {
            page_id: pageId,
            page_slug: slug,
            section_name: 'main',
            content: content,
            order_index: 0,
          },
          { onConflict: 'page_id,section_name' }
        );

      if (sectionError) {
        throw new Error(`Failed to save content: ${sectionError.message}`);
      }

      // Update original content to match saved content
      setOriginalContent(content);
      
      // Clear cache to ensure fresh data on next load
      CMSFallbackManager.clearCache(slug);
      
      console.log(`[useCMSContent] Saved ${slug} successfully`);
    } catch (err: any) {
      console.error(`[useCMSContent] Error saving ${slug}:`, err);
      setError(err.message || 'Failed to save content');
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [slug, content]);

  // Refresh content from CMS
  const refresh = useCallback(async () => {
    CMSFallbackManager.clearCache(slug);
    hasLoadedRef.current = false;
    setIsLoading(true);

    try {
      const result = await CMSFallbackManager.getContent<T>(slug);
      if (result.data) {
        const mergedContent = deepMergeWithDefaults(result.data as Partial<T>);
        setContent(mergedContent);
        setOriginalContent(mergedContent);
        setSource(result.source);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to refresh content');
    } finally {
      setIsLoading(false);
    }
  }, [slug, defaults]);

  return {
    content,
    isLoading,
    isSaving,
    error,
    source,
    hasChanges,
    /** Update content locally (for editing) */
    updateContent,
    /** Save content to CMS */
    saveContent,
    /** Cancel changes and revert to original */
    cancelChanges,
    /** Refresh content from CMS */
    refresh,
  };
}

/**
 * Hook to check if CMS is currently available and healthy.
 */
export function useCMSHealth() {
  const [health, setHealth] = useState(CMSFallbackManager.getHealth());

  useEffect(() => {
    // Update health periodically
    const interval = setInterval(() => {
      setHealth(CMSFallbackManager.getHealth());
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    ...health,
    resetHealth: () => {
      CMSFallbackManager.resetHealth();
      setHealth(CMSFallbackManager.getHealth());
    },
  };
}

/**
 * Hook to get cache statistics.
 */
export function useCMSCache() {
  const [stats, setStats] = useState(CMSFallbackManager.getCacheStats());

  const refresh = () => {
    setStats(CMSFallbackManager.getCacheStats());
  };

  const clearAll = () => {
    CMSFallbackManager.clearCache();
    refresh();
  };

  const clearPage = (slug: string) => {
    CMSFallbackManager.clearCache(slug);
    refresh();
  };

  return {
    stats,
    refresh,
    clearAll,
    clearPage,
  };
}
