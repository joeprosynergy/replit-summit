"use client";

import { useState, useEffect, useCallback } from 'react';
import { getBackendClient, isBackendAvailable } from '@/lib/backendClient';
import { toast } from 'sonner';

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  source: string;
  display_order: number;
  is_visible: boolean;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Samantha Tevlin',
    rating: 5,
    text: "I requested a metal 14x32 shed. Let me just say, it turned out everything I pictured and more. They did an amazing job on the build. You can tell they truly put their best effort into it and took their time to make sure it was done right. I'm 10/10 extremely happy & thankful for it!",
    source: 'Google Review',
    display_order: 0,
    is_visible: true,
  },
  {
    id: '2',
    name: 'Dona Clapperton',
    rating: 5,
    text: "Gino was such a helpful salesman. He was patient and kind as we did this sale long distance. Delivery was a breeze. The team was friendly and knowledgeable. It was a joy to watch them set up the unit. Five stars isn't enough for the experience with Summit.",
    source: 'Google Review',
    display_order: 1,
    is_visible: true,
  },
  {
    id: '3',
    name: 'Gary Shrum',
    rating: 5,
    text: "I am quite pleased with the 12X32 building I purchased. The worker who delivered and set up the building was amazing and was very knowledgeable. I would recommend Summit Portable Buildings to anyone want a solid built and attractive building.",
    source: 'Google Review',
    display_order: 2,
    is_visible: true,
  },
];

export function useEditableTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [editedTestimonials, setEditedTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      if (!isBackendAvailable()) {
        setIsLoading(false);
        return;
      }

      const client = getBackendClient();
      if (!client) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await (client as any)
          .from('testimonials')
          .select('*')
          .order('display_order', { ascending: true });

        if (data && !error && data.length > 0) {
          const mapped = data.map((t: any) => ({
            id: t.id,
            name: t.name,
            rating: t.rating,
            text: t.text,
            source: t.source || 'Google Review',
            display_order: t.display_order,
            is_visible: t.is_visible ?? true,
          }));
          setTestimonials(mapped);
          setEditedTestimonials(mapped);
        }
        // If no data, keep using defaults (already set in initial state)
      } catch (err) {
        console.log('[useEditableTestimonials] Using default testimonials');
      }
      setIsLoading(false);
    };

    fetchTestimonials();
  }, []);

  const hasChanges = JSON.stringify(testimonials) !== JSON.stringify(editedTestimonials);

  const updateTestimonial = useCallback((id: string, field: keyof Testimonial, value: string | number | boolean) => {
    setEditedTestimonials(prev => 
      prev.map(t => t.id === id ? { ...t, [field]: value } : t)
    );
  }, []);

  const save = useCallback(async () => {
    const client = getBackendClient();
    if (!client) return false;

    setIsSaving(true);
    
    // Use any to bypass strict typing
    const { error } = await (client as any)
      .from('testimonials')
      .upsert(
        editedTestimonials.map(t => ({
          id: t.id,
          name: t.name,
          rating: t.rating,
          text: t.text,
          source: t.source,
          display_order: t.display_order,
          is_visible: t.is_visible,
        })),
        { onConflict: 'id' }
      );

    if (error) {
      toast.error(`Save failed: ${error.message || 'Unknown error'}`);
      console.error('[useEditableTestimonials] Save error:', error);
      setIsSaving(false);
      return false;
    }

    toast.success('Testimonials saved');
    setTestimonials(editedTestimonials);
    setIsSaving(false);
    return true;
  }, [editedTestimonials]);

  const reset = useCallback(() => {
    setEditedTestimonials(testimonials);
  }, [testimonials]);

  return {
    testimonials: editedTestimonials,
    isLoading,
    isSaving,
    hasChanges,
    updateTestimonial,
    save,
    reset,
  };
}
