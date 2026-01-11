import { useState, useCallback } from 'react';
import { isBackendAvailable, getBackendClient } from '@/lib/backendClient';
import { toast } from 'sonner';
import { useLocation } from 'wouter';
import { duplicateCanonicalPage } from '@/lib/canonicalization';

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

    if (!isBackendAvailable()) {
      toast.error('Database not available');
      return false;
    }

    setIsDuplicating(true);

    try {
      console.log(`[usePageManagement] Duplicating ${currentSlug} to ${targetSlug} with ${currentContent ? Object.keys(currentContent).length : 0} content fields`);
      
      const result = await duplicateCanonicalPage(currentSlug, targetSlug.trim(), currentContent);

      if (!result.success) {
        toast.error(result.message);
        setIsDuplicating(false);
        return false;
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
