import React, { useCallback, ReactNode } from 'react';
import { EditModeProvider } from '@/contexts/EditModeContext';
import { AdminEditMode } from './AdminEditMode';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { useSectionContent, SectionContent } from '@/hooks/useSectionContent';
import { logAdminActivity } from '@/lib/adminActivityLog';
import { usePageManagement } from '@/hooks/usePageManagement';

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
  const { isAdmin, isRevalidating } = useAdminAuthContext();
  const {
    content,
    isLoading,
    isSaving,
    hasChanges,
    updateField,
    updateDynamicField,
    save: saveContent,
    reset,
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

  const [isEditMode, setIsEditMode] = React.useState(false);

  const handleSave = useCallback(async () => {
    const success = await saveContent();
    if (success) {
      // Log activity (fire-and-forget)
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

  // Content renders immediately (non-blocking)
  // Admin controls appear asynchronously after auth check
  return (
    <EditModeProvider
      initialContent={content as Record<string, unknown>}
      onSave={async () => {
        await handleSave();
      }}
    >
      {/* Admin controls - only show after auth resolves */}
      <AdminEditMode
        isAdmin={isAdmin}
        isRevalidating={isRevalidating}
        isEditMode={isEditMode}
        hasChanges={hasChanges}
        isSaving={isSaving}
        onToggleEdit={handleStartEditing}
        onSave={handleSave}
        onCancel={handleCancel}
        pageSlug={effectivePageSlug}
        showDuplicateDialog={showDuplicateDialog}
        showDeleteDialog={showDeleteDialog}
        newSlug={newSlug}
        isDuplicating={isDuplicating}
        isDeleting={isDeleting}
        onSetNewSlug={setNewSlug}
        onSetShowDuplicateDialog={setShowDuplicateDialog}
        onSetShowDeleteDialog={setShowDeleteDialog}
        onDuplicatePage={duplicatePage}
        onDeletePage={deletePage}
      />
      
      {/* Content always renders immediately */}
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
