"use client";

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import { GlobalColorsConfig, defaultGlobalColors, GlobalColor } from '@shared/globalColorsSchema';
import { useToast } from '@/hooks/use-toast';

export function useGlobalColors() {
  const [colors, setColors] = useState<GlobalColor[]>(defaultGlobalColors.colors);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const { data, error } = await supabase
          .from('section_content')
          .select('content')
          .eq('page_slug', 'global-settings')
          .eq('section_name', 'colors')
          .maybeSingle();

        if (error) throw error;

        if (data && data.content) {
          const config = data.content as GlobalColorsConfig;
          setColors(config.colors || defaultGlobalColors.colors);
        }
      } catch (error) {
        console.error('Error loading global colors:', error);
        // Use defaults on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchColors();
  }, []);

  const saveColors = useCallback(async (newColors: GlobalColor[]) => {
    setIsSaving(true);
    try {
      // Check if entry exists
      const { data: existing } = await supabase
        .from('section_content')
        .select('id')
        .eq('page_slug', 'global-settings')
        .eq('section_name', 'colors')
        .maybeSingle();

      const config: GlobalColorsConfig = { colors: newColors };

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
            section_name: 'colors',
            content: config,
            order_index: 0,
          });
      }

      if (result.error) throw result.error;

      setColors(newColors);
      toast({
        title: 'Success',
        description: 'Global colors saved successfully',
      });
      return true;
    } catch (error: any) {
      console.error('Error saving global colors:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save global colors',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [toast]);

  const getColorById = useCallback((id: string): GlobalColor | undefined => {
    return colors.find(c => c.id === id);
  }, [colors]);

  const getColorsByCategory = useCallback((category: string): GlobalColor[] => {
    return colors.filter(c => c.category === category);
  }, [colors]);

  return {
    colors,
    isLoading,
    isSaving,
    saveColors,
    getColorById,
    getColorsByCategory,
  };
}
