import { useState } from 'react';
import { cn } from '@/lib/utils';
import { GripVertical, Settings, Check, X, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { NavLink } from '../../../../shared/navigationSchema';

interface InlineEditableNavLinkProps {
  link: NavLink;
  onUpdate: (link: NavLink) => void;
  onDelete: () => void;
  isEditMode: boolean;
  children?: React.ReactNode;
  className?: string;
  showDragHandle?: boolean;
}

const InlineEditableNavLink = ({
  link,
  onUpdate,
  onDelete,
  isEditMode,
  children,
  className,
  showDragHandle = true,
}: InlineEditableNavLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedLink, setEditedLink] = useState<NavLink>(link);

  const handleSave = () => {
    onUpdate(editedLink);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setEditedLink(link);
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setEditedLink(link);
    }
    setIsOpen(open);
  };

  if (!isEditMode) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center gap-2 group">
      {showDragHandle && (
        <div className="cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <div className="relative flex-1">
            <div className={cn(
              'relative cursor-pointer outline outline-2 outline-dashed outline-transparent hover:outline-primary rounded px-1 -mx-1',
              className
            )}>
              {children}
              <Settings className="inline-block w-3 h-3 ml-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="space-y-4">
            <div className="text-sm font-medium">Edit Navigation Link</div>
            
            <div className="space-y-2">
              <Label htmlFor="link-label">Link Text</Label>
              <Input
                id="link-label"
                value={editedLink.label}
                onChange={(e) => setEditedLink({ ...editedLink, label: e.target.value })}
                placeholder="About Us"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="link-href">URL</Label>
              <Input
                id="link-href"
                value={editedLink.href}
                onChange={(e) => setEditedLink({ ...editedLink, href: e.target.value })}
                placeholder="/about-us or https://example.com"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="link-external" className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                External Link
              </Label>
              <Switch
                id="link-external"
                checked={editedLink.isExternal ?? false}
                onCheckedChange={(checked) => setEditedLink({ ...editedLink, isExternal: checked, isRoute: !checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="link-disabled">Disabled (Coming Soon)</Label>
              <Switch
                id="link-disabled"
                checked={editedLink.disabled ?? false}
                onCheckedChange={(checked) => setEditedLink({ ...editedLink, disabled: checked })}
              />
            </div>

            <div className="flex justify-between pt-2 border-t border-border">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  onDelete();
                  setIsOpen(false);
                }}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Check className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default InlineEditableNavLink;
