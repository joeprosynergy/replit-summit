import { useEffect, useSyncExternalStore } from 'react';

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

interface EditState {
  isEditMode: boolean;
  hasChanges: boolean;
  isSaving: boolean;
  startEditing: () => void;
  save: () => Promise<void>;
  cancel: () => void;
  pageManagement: PageManagement | null;
}

type Listener = () => void;

class GlobalEditRegistry {
  private editState: EditState | null = null;
  private listeners: Set<Listener> = new Set();

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = (): EditState | null => {
    return this.editState;
  };

  setEditState = (state: EditState | null): void => {
    this.editState = state;
    this.listeners.forEach(listener => listener());
  };
}

export const globalEditRegistry = new GlobalEditRegistry();

export function useGlobalEditState(): EditState | null {
  return useSyncExternalStore(
    globalEditRegistry.subscribe,
    globalEditRegistry.getSnapshot,
    globalEditRegistry.getSnapshot
  );
}

export function useRegisterEditState(state: EditState | null): void {
  useEffect(() => {
    globalEditRegistry.setEditState(state);
    const registeredState = state;
    return () => {
      if (globalEditRegistry.getSnapshot() === registeredState) {
        globalEditRegistry.setEditState(null);
      }
    };
  }, [state]);
}
