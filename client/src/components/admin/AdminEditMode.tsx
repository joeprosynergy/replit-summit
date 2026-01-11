import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Save, X, Copy, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AdminEditModeProps {
  isAdmin: boolean;
  isRevalidating?: boolean;
  isEditMode: boolean;
  hasChanges: boolean;
  isSaving: boolean;
  onToggleEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  pageSlug?: string;
  showDuplicateDialog?: boolean;
  showDeleteDialog?: boolean;
  newSlug?: string;
  isDuplicating?: boolean;
  isDeleting?: boolean;
  onSetNewSlug?: (slug: string) => void;
  onSetShowDuplicateDialog?: (show: boolean) => void;
  onSetShowDeleteDialog?: (show: boolean) => void;
  onDuplicatePage?: (slug: string) => Promise<boolean>;
  onDeletePage?: () => Promise<boolean>;
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
  pageSlug,
  showDuplicateDialog = false,
  showDeleteDialog = false,
  newSlug = '',
  isDuplicating = false,
  isDeleting = false,
  onSetNewSlug,
  onSetShowDuplicateDialog,
  onSetShowDeleteDialog,
  onDuplicatePage,
  onDeletePage,
}: AdminEditModeProps) {
  if (!isAdmin) return null;

  const hasPageManagement = pageSlug && onSetShowDuplicateDialog && onSetShowDeleteDialog && onDuplicatePage && onDeletePage;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex gap-2" data-testid="admin-edit-controls">
        {isEditMode ? (
          <>
            {hasPageManagement && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    console.log("DUPLICATE BUTTON HANDLER CALLED");
                    alert("DUPLICATE BUTTON HANDLER CALLED");
                    onSetShowDuplicateDialog(true);
                  }}
                  disabled={isSaving}
                  data-testid="button-duplicate-page"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => onSetShowDeleteDialog(true)}
                  disabled={isSaving}
                  data-testid="button-delete-page"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </>
            )}
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

      {hasPageManagement && (
        <>
          <Dialog open={showDuplicateDialog} onOpenChange={onSetShowDuplicateDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Duplicate Page</DialogTitle>
                <DialogDescription>
                  Create a copy of this page with a new URL slug. All content will be duplicated.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <label className="text-sm font-medium mb-2 block">New Page Slug</label>
                <Input
                  placeholder="e.g., new-page-name"
                  value={newSlug}
                  onChange={(e) => onSetNewSlug?.(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                  data-testid="input-new-slug"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  The new page will be available at: /{newSlug || 'new-page-name'}
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => onSetShowDuplicateDialog(false)} disabled={isDuplicating}>
                  Cancel
                </Button>
                <Button onClick={() => onDuplicatePage(newSlug)} disabled={isDuplicating || !newSlug.trim()}>
                  {isDuplicating ? 'Duplicating...' : 'Duplicate Page'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showDeleteDialog} onOpenChange={onSetShowDeleteDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Page Content</DialogTitle>
                <DialogDescription>
                  This will delete all saved content for this page from the database. The page template will still exist, but all customizations will be lost. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => onSetShowDeleteDialog(false)} disabled={isDeleting}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={onDeletePage} disabled={isDeleting}>
                  {isDeleting ? 'Deleting...' : 'Delete Page Content'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}
