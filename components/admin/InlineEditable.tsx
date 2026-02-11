"use client";

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface InlineEditableProps {
  value: string;
  fieldName: string;
  type?: 'text' | 'textarea' | 'link';
  onChange: (value: string) => void;
  isEditMode: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function InlineEditable({
  value,
  fieldName,
  type = 'text',
  onChange,
  isEditMode,
  className,
  as: Component = 'span',
}: InlineEditableProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (isEditMode && !isEditing) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (localValue !== value) {
      onChange(localValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && type !== 'textarea') {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setLocalValue(value);
      setIsEditing(false);
    }
  };

  if (!isEditMode) {
    return <Component className={className}>{value}</Component>;
  }

  if (isEditing) {
    const InputComponent = type === 'textarea' ? Textarea : Input;
    return (
      <InputComponent
        ref={inputRef as any}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          'bg-slate-900 text-white border-2 border-primary placeholder:text-slate-400',
          'focus:ring-2 focus:ring-primary focus:ring-offset-2',
          type === 'textarea' ? 'min-h-[100px]' : ''
        )}
        style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
        aria-label={`Edit ${fieldName}`}
      />
    );
  }

  return (
    <Component
      onClick={handleClick}
      className={cn(
        className,
        'cursor-pointer hover:outline hover:outline-2 hover:outline-primary hover:outline-offset-2 rounded transition-all'
      )}
      title={`Click to edit ${fieldName}`}
    >
      {value || `[Click to add ${fieldName}]`}
    </Component>
  );
}
