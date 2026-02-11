"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const TARGET_SLUG = 'economy-shed-working-copy';

export function MigrateEconomyShedWorkingCopy() {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const runMigration = async () => {
    if (!supabase) {
      toast.error('Database not available');
      return;
    }

    setIsRunning(true);
    setResult(null);

    try {
      console.log(`[Migration] Starting migration for ${TARGET_SLUG}`);

      const { data: pageData, error: pageError } = await supabase
        .from('page_content')
        .select('id, slug, heading, tagline, subheading, cta_heading, cta_description, cta_button, layout_config, is_canonical')
        .eq('slug', TARGET_SLUG)
        .maybeSingle();

      if (pageError) {
        throw new Error(`Failed to fetch page: ${pageError.message}`);
      }

      if (!pageData) {
        throw new Error(`Page "${TARGET_SLUG}" not found`);
      }

      const pageId = pageData.id;
      console.log('[Migration] Found page:', pageData);

      const { data: existingHero } = await supabase
        .from('section_content')
        .select('id')
        .eq('page_id', pageId)
        .eq('section_name', 'hero')
        .maybeSingle();

      let heroCreated = false;
      let heroUpdated = false;
      const heroLayoutFields = {
        backgroundColor: 'hsl(var(--primary) / 0.1)',
        paddingTop: '4rem',
        paddingBottom: '4rem',
        textAlignment: 'center',
        layoutVariant: 'simple',
      };

      if (!existingHero) {
        const heroContent = {
          heading: pageData.heading || '',
          tagline: pageData.tagline || '',
          subheading: pageData.subheading || '',
          ...heroLayoutFields,
        };

        const { error: heroError } = await supabase
          .from('section_content')
          .insert({
            page_slug: TARGET_SLUG,
            page_id: pageId,
            section_name: 'hero',
            content: heroContent,
          });

        if (heroError) {
          throw new Error(`Failed to create hero section: ${heroError.message}`);
        }
        heroCreated = true;
        console.log('[Migration] Created hero section with layout fields');
      } else {
        const { data: heroData } = await supabase
          .from('section_content')
          .select('content')
          .eq('id', existingHero.id)
          .single();

        const existingContent = (heroData?.content as Record<string, any>) || {};
        const needsLayoutFields = !existingContent.backgroundColor || !existingContent.paddingTop;

        if (needsLayoutFields) {
          const updatedContent = { ...existingContent, ...heroLayoutFields };
          const { error: updateError } = await supabase
            .from('section_content')
            .update({ content: updatedContent })
            .eq('id', existingHero.id);

          if (updateError) {
            throw new Error(`Failed to update hero section: ${updateError.message}`);
          }
          heroUpdated = true;
          console.log('[Migration] Updated hero section with layout fields');
        }
      }

      const { data: existingCta } = await supabase
        .from('section_content')
        .select('id')
        .eq('page_id', pageId)
        .eq('section_name', 'cta')
        .maybeSingle();

      let ctaCreated = false;
      let ctaUpdated = false;
      const ctaLayoutFields = {
        buttonLink: '#',
        buttonTarget: '_self',
        backgroundColor: 'hsl(var(--primary) / 0.1)',
        paddingTop: '4rem',
        paddingBottom: '4rem',
        textAlignment: 'center',
        layoutVariant: 'simple',
      };

      if (!existingCta) {
        const ctaContent = {
          heading: pageData.cta_heading || '',
          description: pageData.cta_description || '',
          button: pageData.cta_button || '',
          ...ctaLayoutFields,
        };

        const { error: ctaError } = await supabase
          .from('section_content')
          .insert({
            page_slug: TARGET_SLUG,
            page_id: pageId,
            section_name: 'cta',
            content: ctaContent,
          });

        if (ctaError) {
          throw new Error(`Failed to create cta section: ${ctaError.message}`);
        }
        ctaCreated = true;
        console.log('[Migration] Created cta section with layout fields');
      } else {
        const { data: ctaData } = await supabase
          .from('section_content')
          .select('content')
          .eq('id', existingCta.id)
          .single();

        const existingContent = (ctaData?.content as Record<string, any>) || {};
        const needsLayoutFields = !existingContent.backgroundColor || !existingContent.paddingTop || !existingContent.buttonTarget;

        if (needsLayoutFields) {
          const updatedContent = { ...existingContent, ...ctaLayoutFields };
          const { error: updateError } = await supabase
            .from('section_content')
            .update({ content: updatedContent })
            .eq('id', existingCta.id);

          if (updateError) {
            throw new Error(`Failed to update cta section: ${updateError.message}`);
          }
          ctaUpdated = true;
          console.log('[Migration] Updated cta section with layout fields');
        }
      }

      const { data: allSections } = await supabase
        .from('section_content')
        .select('section_name, content')
        .eq('page_id', pageId);

      const summary = [
        `Migration complete for ${TARGET_SLUG}`,
        heroCreated ? '- Created hero section with layout fields' 
          : heroUpdated ? '- Updated hero section with layout fields'
          : '- Hero section already has layout fields',
        ctaCreated ? '- Created cta section with layout fields' 
          : ctaUpdated ? '- Updated cta section with layout fields'
          : '- CTA section already has layout fields',
        `- Total sections: ${allSections?.length || 0}`,
      ].join('\n');

      setResult(summary);
      toast.success('Migration completed successfully');
    } catch (err: any) {
      console.error('[Migration] Error:', err);
      setResult(`Error: ${err.message}`);
      toast.error(err.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-muted/50 space-y-4">
      <h3 className="font-semibold">Migrate: {TARGET_SLUG}</h3>
      <p className="text-sm text-muted-foreground">
        Creates or updates hero and cta section rows with full layout/styling fields
        (backgroundColor, padding, alignment, layoutVariant).
      </p>
      <Button onClick={runMigration} disabled={isRunning}>
        {isRunning ? 'Running...' : 'Run Migration'}
      </Button>
      {result && (
        <pre className="text-xs bg-background p-2 rounded whitespace-pre-wrap">
          {result}
        </pre>
      )}
    </div>
  );
}
