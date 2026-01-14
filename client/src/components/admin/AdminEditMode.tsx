import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Save, X, Copy, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEditModeOptional } from '@/contexts/EditModeContext';

interface AdminEditModeProps {
  isAdmin: boolean;
}

export function AdminEditMode({ isAdmin }: AdminEditModeProps) {
  const navigate = useNavigate();
  const editContext = useEditModeOptional();

  if (!isAdmin || !editContext) return null;

  const {
    isEditMode,
    hasChanges,
    isSaving,
    startEditing,
    save,
    cancel,
    pageManagement,
  } = editContext;

  const pm = pageManagement;
  const hasPageManagement = pm && pm.pageSlug;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex gap-2" data-testid="admin-edit-controls">
        {isEditMode ? (
          <>
            {hasPageManagement && (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate('/admin')}
                  disabled={isSaving}
                  data-testid="button-back-to-admin"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Admin
                </Button>
                <Button
                  variant="outline"
                  onClick={() => pm.setShowDuplicateDialog(true)}
                  disabled={isSaving}
                  data-testid="button-duplicate-page"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => pm.setShowDeleteDialog(true)}
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
              onClick={cancel}
              disabled={isSaving}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={save}
              disabled={!hasChanges || isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </>
        ) : (
          <Button onClick={startEditing} disabled={pm?.isRevalidating}>
            <Pencil className="w-4 h-4 mr-2" />
            {pm?.isRevalidating ? 'Verifying...' : 'Edit Page'}
          </Button>
        )}
      </div>

      {hasPageManagement && (
        <>
          <Dialog open={pm.showDuplicateDialog} onOpenChange={pm.setShowDuplicateDialog}>
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
                  value={pm.newSlug}
                  onChange={(e) => pm.setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                  data-testid="input-new-slug"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  The new page will be available at: /{pm.newSlug || 'new-page-name'}
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => pm.setShowDuplicateDialog(false)} disabled={pm.isDuplicating}>
                  Cancel
                </Button>
                <Button onClick={() => pm.duplicatePage(pm.newSlug)} disabled={pm.isDuplicating || !pm.newSlug.trim()}>
                  {pm.isDuplicating ? 'Duplicating...' : 'Duplicate Page'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={pm.showDeleteDialog} onOpenChange={pm.setShowDeleteDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Page Content</DialogTitle>
                <DialogDescription>
                  This will delete all saved content for this page from the database. The page template will still exist, but all customizations will be lost. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => pm.setShowDeleteDialog(false)} disabled={pm.isDeleting}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={pm.deletePage} disabled={pm.isDeleting}>
                  {pm.isDeleting ? 'Deleting...' : 'Delete Page Content'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}
