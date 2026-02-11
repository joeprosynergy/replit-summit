"use client";

import { useState, useEffect, useCallback } from 'react';
import { isBackendAvailable, getBackendClient } from '@/lib/backendClient';
import { toast } from 'sonner';

export interface PageContent {
  heading: string;
  tagline: string;
  subheading: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaButton: string;
  metaTitle: string;
  metaDescription: string;
}

export function useEditablePageContent(slug: string, defaultContent: PageContent) {
  const [content, setContent] = useState<PageContent>(defaultContent);
  const [editedContent, setEditedContent] = useState<PageContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

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
        .from('page_content')
        .select('*')
        .eq('slug', slug)
        .order('updated_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false, nullsFirst: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('[useEditablePageContent] Fetch error:', error);
      }

      if (data && !error) {
        const fetched: PageContent = {
          heading: data.heading ?? defaultContent.heading,
          tagline: data.tagline ?? defaultContent.tagline,
          subheading: data.subheading ?? defaultContent.subheading,
          ctaHeading: data.cta_heading ?? defaultContent.ctaHeading,
          ctaDescription: data.cta_description ?? defaultContent.ctaDescription,
          ctaButton: data.cta_button ?? defaultContent.ctaButton,
          metaTitle: data.meta_title ?? defaultContent.metaTitle,
          metaDescription: data.meta_description ?? defaultContent.metaDescription,
        };
        setContent(fetched);
        setEditedContent(fetched);
      }
      setIsLoading(false);
    };

    fetchContent();
  }, [slug, defaultContent]);

  const hasChanges = JSON.stringify(content) !== JSON.stringify(editedContent);

  const save = useCallback(async () => {
    const client = getBackendClient();
    if (!client) return;

    setIsSaving(true);

    try {
      // Check if row exists first - get latest row deterministically (handles duplicates)
      const { data: existing, error: existingError } = await (client as any)
        .from('page_content')
        .select('id')
        .eq('slug', slug)
        .order('updated_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false, nullsFirst: false })
        .limit(1)
        .maybeSingle();

      if (existingError) {
        toast.error(`Save failed: ${existingError.message || 'Query error'}`);
        console.error('[useEditablePageContent] Existing check error:', existingError);
        setIsSaving(false);
        return;
      }

      const payload = {
        slug,
        heading: editedContent.heading,
        tagline: editedContent.tagline,
        subheading: editedContent.subheading,
        cta_heading: editedContent.ctaHeading,
        cta_description: editedContent.ctaDescription,
        cta_button: editedContent.ctaButton,
        meta_title: editedContent.metaTitle,
        meta_description: editedContent.metaDescription,
      };

      let error;
      let writeResult;
      if (existing?.id) {
        // Update existing row and return the updated row to verify write
        writeResult = await (client as any)
          .from('page_content')
          .update(payload)
          .eq('id', existing.id)
          .select('id, slug, updated_at');
        error = writeResult.error;
      } else {
        // Insert new row and return to verify write
        writeResult = await (client as any)
          .from('page_content')
          .insert(payload)
          .select('id, slug, updated_at');
        error = writeResult.error;
      }

      // Verify the write actually happened
      const writtenRow = writeResult?.data?.[0];

      if (error) {
        toast.error(`Save failed: ${error.message || 'Unknown error'}`);
        console.error('[useEditablePageContent] Save error:', error);
      } else if (!writtenRow) {
        toast.error('Save failed: No row was written (check RLS policies)');
        console.error('[useEditablePageContent] No row returned after write');
      } else {
        console.log('[useEditablePageContent] Successfully wrote row:', writtenRow);
        toast.success('Changes saved');
        setContent(editedContent);
        setIsEditMode(false);
      }
    } catch (err: any) {
      toast.error(`Save failed: ${err.message || 'Unknown error'}`);
      console.error('[useEditablePageContent] Exception:', err);
    }

    setIsSaving(false);
  }, [slug, editedContent]);

  const reset = useCallback(() => {
    setEditedContent(content);
    setIsEditMode(false);
  }, [content]);

  const updateField = useCallback((field: keyof PageContent, value: string) => {
    setEditedContent(prev => ({ ...prev, [field]: value }));
  }, []);

  const startEditing = useCallback(() => {
    setIsEditMode(true);
  }, []);

  return {
    content,
    editedContent,
    isLoading,
    isSaving,
    isEditMode,
    hasChanges,
    updateField,
    save,
    reset,
    startEditing,
  };
}
