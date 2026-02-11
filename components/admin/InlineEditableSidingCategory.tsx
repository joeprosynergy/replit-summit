"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import InlineEditableColorSwatch from './InlineEditableColorSwatch';
import { ColorSwatch } from '@/data/defaults/productPageTypes';

interface InlineEditableSidingCategoryProps {
  id: string;
  title: string;
  colors: ColorSwatch[];
  onTitleChange: (title: string) => void;
  onColorsChange: (colors: ColorSwatch[]) => void;
  onDelete: () => void;
  isEditMode: boolean;
  isOpen?: boolean;
}

const InlineEditableSidingCategory = ({
  id,
  title,
  colors,
  onTitleChange,
  onColorsChange,
  onDelete,
  isEditMode,
  isOpen = false,
}: InlineEditableSidingCategoryProps) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (editedTitle !== title) {
      onTitleChange(editedTitle);
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTitleBlur();
    }
    if (e.key === 'Escape') {
      setEditedTitle(title);
      setIsEditingTitle(false);
    }
  };

  const handleColorChange = (index: number, updates: { globalColorId?: string; name?: string; color?: string; image?: string }) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], ...updates };
    console.log('[InlineEditableSidingCategory] Color changed:', { index, updates, newColors });
    onColorsChange(newColors);
  };

  const handleColorDelete = (index: number) => {
    const newColors = colors.filter((_, i) => i !== index);
    onColorsChange(newColors);
  };

  const handleAddColor = () => {
    const newColors = [
      ...colors,
      { name: 'New Color', color: '#808080' },
    ];
    onColorsChange(newColors);
  };

  if (!isEditMode) {
    return (
      <AccordionItem value={id}>
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <span className="font-heading text-lg font-bold text-secondary uppercase">
            {title}
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="flex flex-wrap gap-6 pt-4">
            {colors.map((swatch, index) => (
              <InlineEditableColorSwatch
                key={index}
                globalColorId={swatch.globalColorId}
                name={swatch.name}
                color={swatch.color}
                image={swatch.image}
                onChange={() => {}}
                onDelete={() => {}}
                isEditMode={false}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <AccordionItem value={id} className="border-b border-border">
      <div className="relative group">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <div className="flex items-center gap-3 flex-1">
            <GripVertical className="w-4 h-4 text-muted-foreground" />
            {isEditingTitle ? (
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleTitleBlur}
                onKeyDown={handleTitleKeyDown}
                onClick={(e) => e.stopPropagation()}
                autoFocus
                className="font-heading text-lg font-bold text-secondary uppercase max-w-md"
              />
            ) : (
              <span
                className="font-heading text-lg font-bold text-secondary uppercase cursor-pointer hover:text-secondary/80"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditingTitle(true);
                }}
              >
                {title}
              </span>
            )}
          </div>
        </AccordionTrigger>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute right-12 top-3 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <AccordionContent className="px-6 pb-6">
        <div className="flex flex-wrap gap-6 pt-4">
          {colors.map((swatch, index) => (
            <InlineEditableColorSwatch
              key={index}
              globalColorId={swatch.globalColorId}
              name={swatch.name}
              color={swatch.color}
              image={swatch.image}
              onChange={(updates) => handleColorChange(index, updates)}
              onDelete={() => handleColorDelete(index)}
              isEditMode={isEditMode}
            />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Button variant="outline" size="sm" onClick={handleAddColor}>
            <Plus className="w-4 h-4 mr-2" />
            Add Color
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default InlineEditableSidingCategory;
