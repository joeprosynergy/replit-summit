import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
      if (!existingHero) {
        const heroContent = {
          heading: pageData.heading || '',
          tagline: pageData.tagline || '',
          subheading: pageData.subheading || '',
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
        console.log('[Migration] Created hero section');
      }

      const { data: existingCta } = await supabase
        .from('section_content')
        .select('id')
        .eq('page_id', pageId)
        .eq('section_name', 'cta')
        .maybeSingle();

      let ctaCreated = false;
      if (!existingCta) {
        const ctaContent = {
          heading: pageData.cta_heading || '',
          description: pageData.cta_description || '',
          button: pageData.cta_button || '',
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
        console.log('[Migration] Created cta section');
      }

      const { data: allSections } = await supabase
        .from('section_content')
        .select('section_name, content')
        .eq('page_id', pageId);

      const summary = [
        `Migration complete for ${TARGET_SLUG}`,
        heroCreated ? '- Created hero section' : '- Hero section already exists',
        ctaCreated ? '- Created cta section' : '- CTA section already exists',
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
        Creates hero and cta section rows from page_content fields.
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
