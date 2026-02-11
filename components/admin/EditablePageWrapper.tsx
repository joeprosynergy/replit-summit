"use client";

import React, { useCallback, ReactNode, useMemo, useState } from 'react';
import { EditModeProvider } from '@/contexts/EditModeContext';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useSectionContent, SectionContent } from '@/hooks/useSectionContent';
import { logAdminActivity } from '@/lib/adminActivityLog';
import { usePageManagement } from '@/hooks/usePageManagement';
import { useRegisterEditState } from '@/contexts/globalEditRegistry';

interface EditablePageWrapperProps<T extends SectionContent> {
  children: ReactNode | ((props: { 
    content: T; 
    isEditMode: boolean; 
    updateField: <K extends keyof T>(field: K, value: T[K]) => void;
    updateDynamicField: (field: string, value: string | number | boolean) => void;
  }) => ReactNode);
  slug: string;
  defaultContent: T;
  sectionName?: string;
  pageSlug?: string;
}

export function EditablePageWrapper<T extends SectionContent>({
  children,
  slug,
  defaultContent,
  sectionName = 'main',
  pageSlug,
}: EditablePageWrapperProps<T>) {
  const { isAdmin, isRevalidating } = useOptionalAdminAuth();
  const {
    content,
    isLoading,
    isSaving,
    hasChanges,
    updateField,
    updateDynamicField,
    save: saveContent,
    reset,
    pageMetadata,
  } = useSectionContent<T>(slug, sectionName, defaultContent);

  const effectivePageSlug = pageSlug || slug;
  const {
    showDuplicateDialog,
    showDeleteDialog,
    newSlug,
    isDuplicating,
    isDeleting,
    setNewSlug,
    setShowDuplicateDialog,
    setShowDeleteDialog,
    duplicatePage,
    deletePage,
  } = usePageManagement(effectivePageSlug);

  const [isEditMode, setIsEditMode] = useState(false);

  const handleDuplicatePage = useCallback(async (targetSlug: string) => {
    return duplicatePage(targetSlug, content as Record<string, any>, pageMetadata.layoutConfig);
  }, [duplicatePage, content, pageMetadata.layoutConfig]);

  const handleSave = useCallback(async () => {
    const success = await saveContent();
    if (success) {
      logAdminActivity({
        pageSlug: slug,
        action: 'update',
        fieldPath: sectionName,
      });
      setIsEditMode(false);
    }
  }, [saveContent, slug, sectionName]);

  const handleCancel = useCallback(() => {
    reset();
    setIsEditMode(false);
  }, [reset]);

  const handleStartEditing = useCallback(() => {
    setIsEditMode(true);
  }, []);

  const pageManagement = useMemo(() => ({
    pageSlug: effectivePageSlug,
    isRevalidating,
    showDuplicateDialog,
    showDeleteDialog,
    newSlug,
    isDuplicating,
    isDeleting,
    setNewSlug,
    setShowDuplicateDialog,
    setShowDeleteDialog,
    duplicatePage: handleDuplicatePage,
    deletePage,
  }), [
    effectivePageSlug,
    isRevalidating,
    showDuplicateDialog,
    showDeleteDialog,
    newSlug,
    isDuplicating,
    isDeleting,
    setNewSlug,
    setShowDuplicateDialog,
    setShowDeleteDialog,
    handleDuplicatePage,
    deletePage,
  ]);

  const editState = useMemo(() => ({
    isEditMode,
    hasChanges,
    isSaving,
    startEditing: handleStartEditing,
    save: handleSave,
    cancel: handleCancel,
    pageManagement,
  }), [isEditMode, hasChanges, isSaving, handleStartEditing, handleSave, handleCancel, pageManagement]);

  useRegisterEditState(editState);

  return (
    <EditModeProvider
      initialContent={content as Record<string, unknown>}
      onSave={handleSave}
      pageManagement={pageManagement}
    >
      {typeof children === 'function' 
        ? children({ 
            content, 
            isEditMode,
            updateField,
            updateDynamicField,
          })
        : children
      }
    </EditModeProvider>
  );
}
