"use client";

import { useState, useEffect, useCallback } from 'react';
import { getBackendClient, isBackendAvailable } from '@/lib/backendClient';
import { toast } from 'sonner';

export interface SiteImage {
  key: string;
  cloudinary_url: string;
  alt_text?: string;
  page_slug?: string;
  section_name?: string;
}

export function useSiteImages(pageSlug?: string) {
  const [images, setImages] = useState<Record<string, SiteImage>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      if (!isBackendAvailable()) {
        setIsLoading(false);
        return;
      }

      const client = getBackendClient();
      if (!client) {
        setIsLoading(false);
        return;
      }

      // Use any to bypass strict typing for tables not in generated types
      let query = (client as any).from('site_images').select('*');
      
      if (pageSlug) {
        query = query.eq('page_slug', pageSlug);
      }

      const { data, error } = await query;

      if (data && !error) {
        const mapped: Record<string, SiteImage> = {};
        data.forEach((img: any) => {
          mapped[img.key] = {
            key: img.key,
            cloudinary_url: img.cloudinary_url,
            alt_text: img.alt_text ?? undefined,
            page_slug: img.page_slug ?? undefined,
            section_name: img.section_name ?? undefined,
          };
        });
        setImages(mapped);
      }
      setIsLoading(false);
    };

    fetchImages();
  }, [pageSlug]);

  const getImageUrl = useCallback((key: string, fallback: string): string => {
    return images[key]?.cloudinary_url || fallback;
  }, [images]);

  const updateImage = useCallback(async (
    key: string,
    cloudinaryUrl: string,
    altText?: string,
    pageSlug?: string,
    sectionName?: string
  ): Promise<boolean> => {
    const client = getBackendClient();
    if (!client) return false;

    // Use any to bypass strict typing
    const { error } = await (client as any)
      .from('site_images')
      .upsert({
        key,
        cloudinary_url: cloudinaryUrl,
        alt_text: altText,
        page_slug: pageSlug,
        section_name: sectionName,
      }, { onConflict: 'key' });

    if (error) {
      toast.error('Failed to save image');
      console.error(error);
      return false;
    }

    // Update local state
    setImages(prev => ({
      ...prev,
      [key]: {
        key,
        cloudinary_url: cloudinaryUrl,
        alt_text: altText,
        page_slug: pageSlug,
        section_name: sectionName,
      }
    }));

    toast.success('Image updated');
    return true;
  }, []);

  return {
    images,
    isLoading,
    getImageUrl,
    updateImage,
  };
}
