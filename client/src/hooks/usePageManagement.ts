import { useState, useCallback } from 'react';
import { isBackendAvailable, getBackendClient } from '@/lib/backendClient';
import { toast } from 'sonner';
import { useLocation } from 'wouter';

export function usePageManagement(currentSlug: string) {
  const [isDuplicating, setIsDuplicating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newSlug, setNewSlug] = useState('');
  const [, setLocation] = useLocation();

  const duplicatePage = useCallback(async (targetSlug: string, currentContent?: Record<string, any>) => {
    if (!targetSlug.trim()) {
      toast.error('Please enter a valid page slug');
      return false;
    }

    const client = getBackendClient();
    if (!client || !isBackendAvailable()) {
      toast.error('Database not available');
      return false;
    }

    setIsDuplicating(true);

    try {
      const { data: existingTarget } = await (client as any)
        .from('page_content')
        .select('id')
        .eq('slug', targetSlug)
        .maybeSingle();

      if (existingTarget) {
        toast.error('A page with this slug already exists');
        setIsDuplicating(false);
        return false;
      }

      const { data: existingSectionTarget } = await (client as any)
        .from('section_content')
        .select('id')
        .eq('page_slug', targetSlug)
        .limit(1);

      if (existingSectionTarget && existingSectionTarget.length > 0) {
        toast.error('A page with this slug already exists');
        setIsDuplicating(false);
        return false;
      }

      const contentToSave = currentContent || {};

      const pagePayload = {
        slug: targetSlug,
        heading: contentToSave.title || contentToSave.heading || 'New Page',
        tagline: contentToSave.subtitle || contentToSave.tagline || '',
        subheading: contentToSave.description || contentToSave.subheading || '',
        cta_heading: contentToSave.ctaHeading || contentToSave.cta_heading || '',
        cta_description: contentToSave.ctaDescription || contentToSave.cta_description || '',
        cta_button: contentToSave.ctaPrimaryButton || contentToSave.cta_button || '',
        meta_title: contentToSave.metaTitle || `${targetSlug} | Summit Portable Buildings`,
        meta_description: contentToSave.metaDescription || '',
      };

      const { error: insertError } = await (client as any)
        .from('page_content')
        .insert(pagePayload);

      if (insertError) {
        console.error('[usePageManagement] page_content insert error:', insertError);
      }

      if (currentContent && Object.keys(currentContent).length > 0) {
        const sectionPayload = {
          page_slug: targetSlug,
          section_name: 'main',
          content: currentContent,
        };

        const { error: sectionInsertError } = await (client as any)
          .from('section_content')
          .insert(sectionPayload);

        if (sectionInsertError) {
          console.error('[usePageManagement] section_content insert error:', sectionInsertError);
          toast.error('Failed to save page content');
          setIsDuplicating(false);
          return false;
        }
      } else {
        const { data: sectionData } = await (client as any)
          .from('section_content')
          .select('*')
          .eq('page_slug', currentSlug);

        if (sectionData && sectionData.length > 0) {
          const sectionPayloads = sectionData.map((section: any) => {
            const contentToCopy = section.content || section.content_json;
            return {
              page_slug: targetSlug,
              section_name: section.section_name,
              content: contentToCopy ? JSON.parse(JSON.stringify(contentToCopy)) : null,
            };
          });

          const { error: sectionInsertError } = await (client as any)
            .from('section_content')
            .insert(sectionPayloads);

          if (sectionInsertError) {
            console.error('[usePageManagement] Section insert error:', sectionInsertError);
          }
        }
      }

      toast.success(`Page duplicated to /${targetSlug}`);
      setShowDuplicateDialog(false);
      setNewSlug('');
      setIsDuplicating(false);
      return true;
    } catch (err: any) {
      console.error('[usePageManagement] Duplication error:', err);
      toast.error(`Duplication failed: ${err.message || 'Unknown error'}`);
      setIsDuplicating(false);
      return false;
    }
  }, [currentSlug]);

  const deletePage = useCallback(async () => {
    const client = getBackendClient();
    if (!client || !isBackendAvailable()) {
      toast.error('Database not available');
      return false;
    }

    setIsDeleting(true);

    try {
      const { error: sectionError } = await (client as any)
        .from('section_content')
        .delete()
        .eq('page_slug', currentSlug);

      if (sectionError) {
        console.error('Failed to delete section content:', sectionError);
      }

      const { error: pageError } = await (client as any)
        .from('page_content')
        .delete()
        .eq('slug', currentSlug);

      if (pageError) {
        toast.error('Failed to delete page content');
        setIsDeleting(false);
        return false;
      }

      toast.success('Page content deleted');
      setShowDeleteDialog(false);
      setIsDeleting(false);
      setLocation('/');
      return true;
    } catch (err: any) {
      toast.error(`Deletion failed: ${err.message || 'Unknown error'}`);
      setIsDeleting(false);
      return false;
    }
  }, [currentSlug, setLocation]);

  return {
    isDuplicating,
    isDeleting,
    showDuplicateDialog,
    showDeleteDialog,
    newSlug,
    setNewSlug,
    setShowDuplicateDialog,
    setShowDeleteDialog,
    duplicatePage,
    deletePage,
  };
}
