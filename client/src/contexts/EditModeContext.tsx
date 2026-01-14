import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface PageManagement {
  pageSlug: string;
  isRevalidating: boolean;
  showDuplicateDialog: boolean;
  showDeleteDialog: boolean;
  newSlug: string;
  isDuplicating: boolean;
  isDeleting: boolean;
  setNewSlug: (slug: string) => void;
  setShowDuplicateDialog: (show: boolean) => void;
  setShowDeleteDialog: (show: boolean) => void;
  duplicatePage: (targetSlug: string) => Promise<boolean>;
  deletePage: () => Promise<boolean>;
}

interface EditModeContextValue {
  isEditMode: boolean;
  hasChanges: boolean;
  isSaving: boolean;
  content: Record<string, unknown>;
  updateField: (field: string, value: unknown) => void;
  startEditing: () => void;
  save: () => Promise<void>;
  cancel: () => void;
  pageManagement: PageManagement | null;
}

const EditModeContext = createContext<EditModeContextValue | null>(null);

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
};

export const useEditModeOptional = () => {
  return useContext(EditModeContext);
};

interface EditModeProviderProps {
  children: ReactNode;
  initialContent: Record<string, unknown>;
  onSave: (content: Record<string, unknown>) => Promise<void>;
  pageManagement?: PageManagement;
}

export const EditModeProvider: React.FC<EditModeProviderProps> = ({
  children,
  initialContent,
  onSave,
  pageManagement,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState<Record<string, unknown>>(initialContent);
  const [originalContent, setOriginalContent] = useState<Record<string, unknown>>(initialContent);

  const hasChanges = JSON.stringify(content) !== JSON.stringify(originalContent);

  const updateField = useCallback((field: string, value: unknown) => {
    setContent(prev => ({ ...prev, [field]: value }));
  }, []);

  const startEditing = useCallback(() => {
    setIsEditMode(true);
  }, []);

  const save = useCallback(async () => {
    setIsSaving(true);
    try {
      await onSave(content);
      setOriginalContent(content);
      setIsEditMode(false);
    } finally {
      setIsSaving(false);
    }
  }, [content, onSave]);

  const cancel = useCallback(() => {
    setContent(originalContent);
    setIsEditMode(false);
  }, [originalContent]);

  // Update internal state when initialContent changes (e.g., after fetch)
  React.useEffect(() => {
    setContent(initialContent);
    setOriginalContent(initialContent);
  }, [initialContent]);

  return (
    <EditModeContext.Provider
      value={{
        isEditMode,
        hasChanges,
        isSaving,
        content,
        updateField,
        startEditing,
        save,
        cancel,
        pageManagement: pageManagement ?? null,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
};
