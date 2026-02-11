"use client";

import React from 'react';
import { InlineEditable } from './InlineEditable';

interface EditableTextProps {
  value: string;
  field: string;
  isEditMode: boolean;
  onUpdate: (field: string, value: string) => void;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  type?: 'text' | 'textarea';
  className?: string;
}

/**
 * EditableText - A clean wrapper around InlineEditable for text content.
 * 
 * Usage:
 * <EditableText 
 *   value={content.heading} 
 *   field="heading" 
 *   isEditMode={isEditMode}
 *   onUpdate={updateField}
 *   as="h1" 
 *   className="text-4xl font-bold" 
 * />
 */
export const EditableText: React.FC<EditableTextProps> = ({
  value,
  field,
  isEditMode,
  onUpdate,
  as = 'span',
  type = 'text',
  className = '',
}) => {
  return (
    <InlineEditable
      value={value}
      fieldName={field}
      isEditMode={isEditMode}
      onChange={(newValue) => onUpdate(field, newValue)}
      as={as}
      type={type}
      className={className}
    />
  );
};
