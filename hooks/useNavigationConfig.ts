"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import {
  HeaderConfig,
  FooterConfig,
  defaultHeaderConfig,
  defaultFooterConfig,
} from '@shared/navigationSchema';
import { useToast } from '@/hooks/use-toast';

interface UseNavigationConfigReturn {
  headerConfig: HeaderConfig;
  footerConfig: FooterConfig;
  isLoading: boolean;
  saveHeaderConfig: (config: HeaderConfig) => Promise<void>;
  saveFooterConfig: (config: FooterConfig) => Promise<void>;
  isSaving: boolean;
}

export function useNavigationConfig(): UseNavigationConfigReturn {
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>(defaultHeaderConfig);
  const [footerConfig, setFooterConfig] = useState<FooterConfig>(defaultFooterConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchNavigationConfig();
  }, []);

  const fetchNavigationConfig = async () => {
    try {
      setIsLoading(true);

      // Fetch both header and footer configs in parallel
      const [headerResult, footerResult] = await Promise.all([
        supabase
          .from('section_content')
          .select('content')
          .eq('page_slug', 'global-navigation')
          .eq('section_name', 'header')
          .maybeSingle(),
        supabase
          .from('section_content')
          .select('content')
          .eq('page_slug', 'global-navigation')
          .eq('section_name', 'footer')
          .maybeSingle(),
      ]);

      if (headerResult.error) {
        console.error('Error fetching header config:', headerResult.error);
      } else if (headerResult.data?.content) {
        setHeaderConfig(headerResult.data.content as HeaderConfig);
      }

      if (footerResult.error) {
        console.error('Error fetching footer config:', footerResult.error);
      } else if (footerResult.data?.content) {
        setFooterConfig(footerResult.data.content as FooterConfig);
      }
    } catch (error) {
      console.error('Error fetching navigation config:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveHeaderConfig = async (config: HeaderConfig) => {
    try {
      setIsSaving(true);

      // First check if entry exists
      const { data: existing } = await supabase
        .from('section_content')
        .select('id')
        .eq('page_slug', 'global-navigation')
        .eq('section_name', 'header')
        .maybeSingle();

      let result;
      if (existing) {
        // Update existing
        result = await supabase
          .from('section_content')
          .update({
            content: config,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id);
      } else {
        // Insert new
        result = await supabase
          .from('section_content')
          .insert({
            page_slug: 'global-navigation',
            section_name: 'header',
            content: config,
            order_index: 0,
          });
      }

      if (result.error) {
        console.error('Save error details:', result.error);
        throw result.error;
      }

      setHeaderConfig(config);
      toast({
        title: 'Success',
        description: 'Header configuration saved successfully',
      });
    } catch (error: any) {
      console.error('Error saving header config:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save header configuration',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const saveFooterConfig = async (config: FooterConfig) => {
    try {
      setIsSaving(true);

      // First check if entry exists
      const { data: existing } = await supabase
        .from('section_content')
        .select('id')
        .eq('page_slug', 'global-navigation')
        .eq('section_name', 'footer')
        .maybeSingle();

      let result;
      if (existing) {
        // Update existing
        result = await supabase
          .from('section_content')
          .update({
            content: config,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id);
      } else {
        // Insert new
        result = await supabase
          .from('section_content')
          .insert({
            page_slug: 'global-navigation',
            section_name: 'footer',
            content: config,
            order_index: 0,
          });
      }

      if (result.error) {
        console.error('Save error details:', result.error);
        throw result.error;
      }

      setFooterConfig(config);
      toast({
        title: 'Success',
        description: 'Footer configuration saved successfully',
      });
    } catch (error: any) {
      console.error('Error saving footer config:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save footer configuration',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    headerConfig,
    footerConfig,
    isLoading,
    saveHeaderConfig,
    saveFooterConfig,
    isSaving,
  };
}
