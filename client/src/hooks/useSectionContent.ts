import { useState, useEffect, useCallback } from 'react';
import { getBackendClient, isBackendAvailable } from '@/lib/backendClient';
import { toast } from 'sonner';

export interface SectionContent {
  [key: string]: string | number | boolean | string[] | Record<string, unknown>;
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

      // Fetch latest row deterministically (handles duplicates gracefully)
      const { data, error } = await (client as any)
        .from('section_content')
        .select('id, content')
        .eq('page_slug', pageSlug)
        .eq('section_name', sectionName)
        .order('updated_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false, nullsFirst: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('[useSectionContent] Fetch error:', error);
      }

      console.log(`[useSectionContent] Fetch result for ${pageSlug}/${sectionName}:`, {
        hasData: !!data,
        hasError: !!error,
        hasContent: !!(data?.content),
        contentFieldCount: data?.content ? Object.keys(data.content).length : 0,
        defaultContentFieldCount: Object.keys(defaultContent).length,
      });

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
      // Check if row exists - get latest row deterministically
      const { data: existing, error: existingError } = await (client as any)
        .from('section_content')
        .select('id')
        .eq('page_slug', pageSlug)
        .eq('section_name', sectionName)
        .order('updated_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false, nullsFirst: false })
        .limit(1)
        .maybeSingle();

      if (existingError) {
        toast.error(`Save failed: ${existingError.message || 'Query error'}`);
        console.error('[useSectionContent] Existing check error:', existingError);
        setIsSaving(false);
        return false;
      }

      const payload = {
        page_slug: pageSlug,
        section_name: sectionName,
        content: editedContent as unknown as Record<string, unknown>,
      };

      let error;
      let writeResult;
      if (existing?.id) {
        // Update existing row
        writeResult = await (client as any)
          .from('section_content')
          .update({ content: payload.content })
          .eq('id', existing.id)
          .select('id');
        error = writeResult.error;
      } else {
        // Insert new row
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
  }, [pageSlug, sectionName, editedContent]);

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
  };
}
