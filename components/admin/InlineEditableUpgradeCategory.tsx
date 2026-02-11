"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Plus, Trash2, GripVertical, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InlineEditable } from './InlineEditable';

interface InlineEditableUpgradeCategoryProps {
  id: string;
  category: string;
  items: string[];
  onCategoryChange: (category: string) => void;
  onItemsChange: (items: string[]) => void;
  onDelete: () => void;
  isEditMode: boolean;
}

const InlineEditableUpgradeCategory = ({
  id,
  category,
  items,
  onCategoryChange,
  onItemsChange,
  onDelete,
  isEditMode,
}: InlineEditableUpgradeCategoryProps) => {
  const [editedCategory, setEditedCategory] = useState(category);
  const [isEditingCategory, setIsEditingCategory] = useState(false);

  const handleCategoryBlur = () => {
    setIsEditingCategory(false);
    if (editedCategory !== category) {
      onCategoryChange(editedCategory);
    }
  };

  const handleCategoryKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCategoryBlur();
    }
    if (e.key === 'Escape') {
      setEditedCategory(category);
      setIsEditingCategory(false);
    }
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onItemsChange(newItems);
  };

  const handleItemDelete = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onItemsChange(newItems);
  };

  const handleAddItem = () => {
    const newItems = [...items, 'New upgrade item'];
    onItemsChange(newItems);
  };

  if (!isEditMode) {
    return (
      <div className="bg-card rounded-xl p-6 border border-border/50">
        <h3 className="font-heading text-lg font-bold text-foreground mb-4">
          {category}
        </h3>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="text-sm text-muted-foreground flex items-start gap-2"
            >
              <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border/50 relative group">
      <div className="flex items-center gap-2 mb-4">
        <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        {isEditingCategory ? (
          <Input
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
            onBlur={handleCategoryBlur}
            onKeyDown={handleCategoryKeyDown}
            autoFocus
            className="font-heading text-lg font-bold text-foreground flex-1"
          />
        ) : (
          <h3
            className="font-heading text-lg font-bold text-foreground cursor-pointer hover:text-primary flex-1"
            onClick={() => setIsEditingCategory(true)}
          >
            {category}
          </h3>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <ul className="space-y-2 mb-4">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-2 group/item"
          >
            <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
            <div className="flex-1 flex items-center gap-2">
              <InlineEditable
                value={item}
                fieldName={`upgrade-item-${index}`}
                onChange={(val) => handleItemChange(index, val)}
                isEditMode={isEditMode}
                as="span"
                className="text-sm text-muted-foreground flex-1"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleItemDelete(index)}
                className="opacity-0 group-hover/item:opacity-100 transition-opacity h-6 w-6 p-0"
              >
                <X className="w-3 h-3 text-destructive" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <Button variant="outline" size="sm" onClick={handleAddItem} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Item
      </Button>
    </div>
  );
};

export default InlineEditableUpgradeCategory;
