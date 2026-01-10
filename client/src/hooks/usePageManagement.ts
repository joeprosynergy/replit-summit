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

  const duplicatePage = useCallback(async (targetSlug: string) => {
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

      const { data: sourceContent, error: fetchError } = await (client as any)
        .from('page_content')
        .select('*')
        .eq('slug', currentSlug)
        .order('updated_at', { ascending: false, nullsFirst: false })
        .limit(1)
        .maybeSingle();

      if (fetchError) {
        toast.error('Failed to fetch page content');
        setIsDuplicating(false);
        return false;
      }

      const pagePayload = sourceContent ? {
        slug: targetSlug,
        heading: sourceContent.heading,
        tagline: sourceContent.tagline,
        subheading: sourceContent.subheading,
        cta_heading: sourceContent.cta_heading,
        cta_description: sourceContent.cta_description,
        cta_button: sourceContent.cta_button,
        meta_title: sourceContent.meta_title ? sourceContent.meta_title.replace(currentSlug, targetSlug) : null,
        meta_description: sourceContent.meta_description,
      } : {
        slug: targetSlug,
        heading: 'New Page',
        tagline: '',
        subheading: '',
        cta_heading: '',
        cta_description: '',
        cta_button: '',
        meta_title: `${targetSlug} | Summit Portable Buildings`,
        meta_description: '',
      };

      const { error: insertError } = await (client as any)
        .from('page_content')
        .insert(pagePayload);

      if (insertError) {
        toast.error('Failed to duplicate page content');
        setIsDuplicating(false);
        return false;
      }

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

      toast.success(`Page duplicated to /${targetSlug}`);
      setShowDuplicateDialog(false);
      setNewSlug('');
      setIsDuplicating(false);
      return true;
    } catch (err: any) {
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
