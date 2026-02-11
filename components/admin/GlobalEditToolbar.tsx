"use client";

/**
 * Global Edit Toolbar
 * Appears for admins on editable pages
 * Floats in bottom-right corner
 */

import { useGlobalEditState } from '@/contexts/globalEditRegistry';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { Button } from '@/components/ui/button';
import { Edit, Save, X, Loader2, Home, Copy, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function GlobalEditToolbar() {
  const { isAdmin } = useOptionalAdminAuth();
  const editState = useGlobalEditState();
  const router = useRouter();
  const navigate = (path: string) => router.push(path);

  // Only show for admins with an active editable page
  if (!isAdmin || !editState) {
    return null;
  }

  const { 
    isEditMode, 
    hasChanges, 
    isSaving, 
    startEditing, 
    save, 
    cancel,
    pageManagement 
  } = editState;

  const handleBackToAdmin = () => {
    navigate('/admin');
  };

  const handleDuplicate = () => {
    if (pageManagement) {
      pageManagement.setShowDuplicateDialog(true);
    }
  };

  const handleDelete = () => {
    if (pageManagement) {
      pageManagement.setShowDeleteDialog(true);
    }
  };

  const handleConfirmDuplicate = async () => {
    if (pageManagement && pageManagement.newSlug) {
      const success = await pageManagement.duplicatePage(pageManagement.newSlug);
      if (success) {
        // Navigate to the CMS-first route which will render the duplicated page
        // The page data is in the database and will be fetched dynamically
        navigate(`/cms/${pageManagement.newSlug}`);
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (pageManagement) {
      const success = await pageManagement.deletePage();
      if (success) {
        navigate('/admin');
      }
    }
  };

  return (
    <>
      {/* Main Edit Toolbar */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 animate-in slide-in-from-bottom-5 fade-in-0">
        {/* Edit Controls Row */}
        <div className="flex gap-2 justify-end">
          {!isEditMode ? (
            <Button
              onClick={startEditing}
              size="lg"
              className="shadow-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              <Edit className="w-5 h-5 mr-2" />
              Edit Page
            </Button>
          ) : (
            <>
              <Button
                onClick={cancel}
                variant="outline"
                size="lg"
                className="shadow-lg bg-background/95 backdrop-blur-sm"
                disabled={isSaving}
              >
                <X className="w-5 h-5 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={save}
                size="lg"
                className={cn(
                  "shadow-2xl font-semibold",
                  hasChanges 
                    ? "bg-green-600 hover:bg-green-700 text-white animate-pulse" 
                    : "bg-muted text-muted-foreground"
                )}
                disabled={!hasChanges || isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </>
          )}
        </div>

        {/* Page Management Row */}
        <div className="flex gap-2 justify-end">
          <Button
            onClick={handleBackToAdmin}
            variant="outline"
            size="sm"
            className="shadow-lg bg-background/95 backdrop-blur-sm"
          >
            <Home className="w-4 h-4 mr-2" />
            Admin
          </Button>
          {/* Duplicate temporarily disabled - will re-enable after full CMS-first rollout */}
          {/* <Button
            onClick={handleDuplicate}
            variant="outline"
            size="sm"
            className="shadow-lg bg-background/95 backdrop-blur-sm"
            disabled={isEditMode && hasChanges}
          >
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </Button> */}
          <Button
            onClick={handleDelete}
            variant="outline"
            size="sm"
            className="shadow-lg bg-background/95 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
            disabled={isEditMode && hasChanges}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Duplicate Dialog */}
      {pageManagement && (
        <Dialog 
          open={pageManagement.showDuplicateDialog} 
          onOpenChange={pageManagement.setShowDuplicateDialog}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Duplicate Page</DialogTitle>
              <DialogDescription>
                Create a copy of this page with a new slug/URL
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="new-slug">New Page Slug</Label>
                <Input
                  id="new-slug"
                  value={pageManagement.newSlug}
                  onChange={(e) => pageManagement.setNewSlug(e.target.value)}
                  placeholder="e.g., economy-shed-copy"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => pageManagement.setShowDuplicateDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDuplicate}
                disabled={!pageManagement.newSlug || pageManagement.isDuplicating}
              >
                {pageManagement.isDuplicating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Duplicating...
                  </>
                ) : (
                  'Duplicate'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Dialog */}
      {pageManagement && (
        <Dialog 
          open={pageManagement.showDeleteDialog} 
          onOpenChange={pageManagement.setShowDeleteDialog}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Page</DialogTitle>
              <DialogDescription className="text-destructive">
                Are you sure you want to delete this page? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => pageManagement.setShowDeleteDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmDelete}
                disabled={pageManagement.isDeleting}
              >
                {pageManagement.isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Page'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
