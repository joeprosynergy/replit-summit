import { useState, useEffect, useCallback } from 'react';
import { getBackendClient, isBackendAvailable } from '@/lib/backendClient';
import { toast } from 'sonner';

export interface SectionContent {
  [key: string]: string | number | boolean | string[] | Record<string, unknown>;
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
      }

      if (data && !error && data.content) {
        const merged = { ...defaultContent, ...(data.content as T) };
        console.log(`[useSectionContent] Merged content has ${Object.keys(merged).length} fields`);
        setContent(merged);
        setEditedContent(merged);
      } else {
        console.log(`[useSectionContent] No DB content, using defaultContent with ${Object.keys(defaultContent).length} fields`);
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
