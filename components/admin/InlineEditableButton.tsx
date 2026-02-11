"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Settings, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface InlineEditableButtonProps {
  text: string;
  href: string;
  onTextChange: (text: string) => void;
  onHrefChange: (href: string) => void;
  isEditMode: boolean;
  isExternal?: boolean;
  onExternalChange?: (isExternal: boolean) => void;
  children: React.ReactNode;
}

const InlineEditableButton = ({
  text,
  href,
  onTextChange,
  onHrefChange,
  isEditMode,
  isExternal = false,
  onExternalChange,
  children
}: InlineEditableButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [editedHref, setEditedHref] = useState(href);
  const [editedExternal, setEditedExternal] = useState(isExternal);

  const handleSave = () => {
    console.log("BUTTON TARGET EDITOR HANDLER CALLED");
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
    return <>{children}</>;
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div className="relative inline-block group cursor-pointer">
          {children}
          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground p-1 rounded-full shadow-lg opacity-80 group-hover:opacity-100 transition-opacity">
            <Settings className="w-3 h-3" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="text-sm font-medium">Edit Button</div>
          
          <div className="space-y-2">
            <Label htmlFor="button-text">Button Text</Label>
            <Input
              id="button-text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              placeholder="Enter button text"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="button-href">Link URL</Label>
            <Input
              id="button-href"
              value={editedHref}
              onChange={(e) => setEditedHref(e.target.value)}
              placeholder="https://example.com or /page"
            />
          </div>

          {onExternalChange && (
            <div className="flex items-center justify-between">
              <Label htmlFor="button-external">Open in new tab</Label>
              <Switch
                id="button-external"
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

export default InlineEditableButton;
