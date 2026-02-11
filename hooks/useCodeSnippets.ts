"use client";

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CodeSnippet {
  id: string;
  name: string;
  description?: string;
  code: string;
  location: 'head' | 'body-start' | 'body-end';
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CodeSnippetsConfig {
  snippets: CodeSnippet[];
}

const defaultSnippetsConfig: CodeSnippetsConfig = {
  snippets: []
};

export function useCodeSnippets() {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSnippets = async () => {
      if (!supabase) {
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('section_content')
          .select('content')
          .eq('page_slug', 'global-settings')
          .eq('section_name', 'code-snippets')
          .maybeSingle();

        if (error) throw error;

        if (data && data.content) {
          const config = data.content as CodeSnippetsConfig;
          setSnippets(config.snippets || []);
        }
      } catch (error) {
        console.error('Error loading code snippets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  const saveSnippets = useCallback(async (newSnippets: CodeSnippet[]) => {
    if (!supabase) return false;
    
    setIsSaving(true);
    try {
      // Check if entry exists
      const { data: existing } = await supabase
        .from('section_content')
        .select('id')
        .eq('page_slug', 'global-settings')
        .eq('section_name', 'code-snippets')
        .maybeSingle();

      const config: CodeSnippetsConfig = { snippets: newSnippets };

      let result;
      if (existing) {
        result = await supabase
          .from('section_content')
          .update({
            content: config,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id);
      } else {
        result = await supabase
          .from('section_content')
          .insert({
            page_slug: 'global-settings',
            section_name: 'code-snippets',
            content: config,
            order_index: 1,
          });
      }

      if (result.error) throw result.error;

      setSnippets(newSnippets);
      toast({
        title: 'Success',
        description: 'Code snippets saved successfully',
      });
      return true;
    } catch (error: any) {
      console.error('Error saving code snippets:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save code snippets',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [toast]);

  const addSnippet = useCallback((snippet: Omit<CodeSnippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSnippet: CodeSnippet = {
      ...snippet,
      id: `snippet-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return newSnippet;
  }, []);

  const getEnabledSnippetsByLocation = useCallback((location: CodeSnippet['location']) => {
    return snippets.filter(s => s.enabled && s.location === location);
  }, [snippets]);

  return {
    snippets,
    isLoading,
    isSaving,
    saveSnippets,
    addSnippet,
    getEnabledSnippetsByLocation,
  };
}
