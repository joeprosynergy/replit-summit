/**
 * Lazy-Loaded Editable Components
 * These components are ONLY loaded when an admin enters edit mode.
 * This keeps the public bundle clean and lightweight.
 */

import { lazy } from 'react';

// Lazy-load the entire EditablePageWrapper
export const EditablePageWrapper = lazy(() => 
  import('@/components/admin/EditablePageWrapper').then(m => ({ 
    default: m.EditablePageWrapper 
  }))
);

// Lazy-load inline editable components
export const InlineEditable = lazy(() => 
  import('@/components/admin/InlineEditable').then(m => ({ 
    default: m.InlineEditable 
  }))
);

export const InlineEditableImage = lazy(() => 
  import('@/components/admin/InlineEditableImage')
);

export const InlineEditableButton = lazy(() => 
  import('@/components/admin/InlineEditableButton')
);

export const InlineEditableLink = lazy(() => 
  import('@/components/admin/InlineEditableLink')
);

// Lazy-load admin edit mode UI
export const AdminEditMode = lazy(() => 
  import('@/components/admin/AdminEditMode').then(m => ({ 
    default: m.AdminEditMode 
  }))
);

/**
 * Loading fallback for editable components
 */
export function EditableLoadingFallback() {
  return (
    <div className="inline-block px-2 py-1 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-700">
      Loading editor...
    </div>
  );
}
