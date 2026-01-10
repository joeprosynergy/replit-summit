import { Button } from '@/components/ui/button';
import { Pencil, Save, X } from 'lucide-react';

interface AdminEditModeProps {
  isAdmin: boolean;
  isRevalidating?: boolean;
  isEditMode: boolean;
  hasChanges: boolean;
  isSaving: boolean;
  onToggleEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function AdminEditMode({
  isAdmin,
  isRevalidating = false,
  isEditMode,
  hasChanges,
  isSaving,
  onToggleEdit,
  onSave,
  onCancel,
}: AdminEditModeProps) {
  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-2" data-testid="admin-edit-controls">
      {isEditMode ? (
        <>
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isSaving}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={onSave}
            disabled={!hasChanges || isSaving}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </>
      ) : (
        <Button onClick={onToggleEdit} disabled={isRevalidating}>
          <Pencil className="w-4 h-4 mr-2" />
          {isRevalidating ? 'Verifying...' : 'Edit Page'}
        </Button>
      )}
    </div>
  );
}
