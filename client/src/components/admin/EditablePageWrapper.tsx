import React, { useCallback, ReactNode } from 'react';
import { EditModeProvider } from '@/contexts/EditModeContext';
import { AdminEditMode } from './AdminEditMode';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { useSectionContent, SectionContent } from '@/hooks/useSectionContent';
import { logAdminActivity } from '@/lib/adminActivityLog';

interface EditablePageWrapperProps<T extends SectionContent> {
  children: ReactNode | ((props: { 
    content: T; 
    isEditMode: boolean; 
    updateField: <K extends keyof T>(field: K, value: T[K]) => void;
  }) => ReactNode);
  slug: string;
  defaultContent: T;
  sectionName?: string;
}

export function EditablePageWrapper<T extends SectionContent>({
  children,
  slug,
  defaultContent,
  sectionName = 'main',
}: EditablePageWrapperProps<T>) {
  const { isAdmin, isRevalidating } = useAdminAuthContext();
  const {
    content,
    isLoading,
    isSaving,
    hasChanges,
    updateField,
    save: saveContent,
    reset,
  } = useSectionContent<T>(slug, sectionName, defaultContent);

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
      />
      
      {/* Content always renders immediately */}
      {typeof children === 'function' 
        ? children({ 
            content, 
            isEditMode, 
            updateField,
          })
        : children
      }
    </EditModeProvider>
  );
}
