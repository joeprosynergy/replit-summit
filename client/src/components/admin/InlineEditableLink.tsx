import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Link2, ExternalLink, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface InlineEditableLinkProps {
  text: string;
  href: string;
  onTextChange: (text: string) => void;
  onHrefChange: (href: string) => void;
  isEditMode: boolean;
  className?: string;
  isExternal?: boolean;
  onExternalChange?: (isExternal: boolean) => void;
  children?: React.ReactNode;
}

const InlineEditableLink = ({
  text,
  href,
  onTextChange,
  onHrefChange,
  isEditMode,
  className,
  isExternal = false,
  onExternalChange,
  children
}: InlineEditableLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [editedHref, setEditedHref] = useState(href);
  const [editedExternal, setEditedExternal] = useState(isExternal);

  const handleSave = () => {
    onTextChange(editedText);
    onHrefChange(editedHref);
    onExternalChange?.(editedExternal);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setEditedText(text);
    setEditedHref(href);
    setEditedExternal(isExternal);
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setEditedText(text);
      setEditedHref(href);
      setEditedExternal(isExternal);
    }
    setIsOpen(open);
  };

  if (!isEditMode) {
    if (children) {
      return <>{children}</>;
    }
    
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {text}
        </a>
      );
    }
    
    return (
      <a href={href} className={className}>
        {text}
      </a>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <span 
          className={cn(
            'relative cursor-pointer inline-flex items-center gap-1',
            'outline outline-2 outline-dashed outline-primary/50 hover:outline-primary',
            'rounded px-1 -mx-1',
            className
          )}
        >
          {children || text}
          <Link2 className="w-4 h-4 text-primary flex-shrink-0" />
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="link-text">Link Text</Label>
            <Input
              id="link-text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              placeholder="Enter link text"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="link-href">URL</Label>
            <Input
              id="link-href"
              value={editedHref}
              onChange={(e) => setEditedHref(e.target.value)}
              placeholder="https://example.com or /page"
            />
          </div>

          {onExternalChange && (
            <div className="flex items-center justify-between">
              <Label htmlFor="link-external" className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Open in new tab
              </Label>
              <Switch
                id="link-external"
                checked={editedExternal}
                onCheckedChange={setEditedExternal}
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
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
      </PopoverContent>
    </Popover>
  );
};

export default InlineEditableLink;
