import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getBackendClient } from '@/lib/backendClient';
import { toast } from 'sonner';

interface PopulateLayoutConfigButtonProps {
  pageSlug: string;
  pageId: string;
}

const HERO_LAYOUT_DEFAULTS = {
  backgroundColor: "hsl(var(--primary) / 0.1)",
  paddingTop: "4rem",
  paddingBottom: "4rem",
  textAlignment: "center",
  layoutVariant: "full-width",
};

const CTA_LAYOUT_DEFAULTS = {
  backgroundColor: "hsl(var(--primary) / 0.1)",
  paddingTop: "4rem",
  paddingBottom: "4rem",
  textAlignment: "center",
  layoutVariant: "default",
  buttonTarget: "_self",
};

const PAGE_LAYOUT_CONFIG_DEFAULTS = {
  heroBackground: null,
  heroLayout: "full-width",
  backgroundColor: "#f8f9fa",
  theme: "default",
};

export function PopulateLayoutConfigButton({ pageSlug, pageId }: PopulateLayoutConfigButtonProps) {
  const [isRunning, setIsRunning] = useState(false);

  const handlePopulate = async () => {
    const client = getBackendClient();
    if (!client) {
      toast.error('Database client not available');
      return;
    }

    setIsRunning(true);

    try {
      const { error: updatePageError } = await (client as any)
        .from('page_content')
        .update({ layout_config: PAGE_LAYOUT_CONFIG_DEFAULTS })
        .eq('id', pageId);

      if (updatePageError) {
        throw new Error(`Failed to update page layout_config: ${updatePageError.message}`);
      }

      console.log('[PopulateLayoutConfig] Updated page_content.layout_config');

      const { data: sections, error: sectionsError } = await (client as any)
        .from('section_content')
        .select('id, section_name, content')
        .eq('page_id', pageId)
        .in('section_name', ['hero', 'cta']);

      if (sectionsError) {
        throw new Error(`Failed to fetch sections: ${sectionsError.message}`);
      }

      for (const section of sections || []) {
        const currentContent = section.content || {};
        let layoutDefaults: Record<string, string>;

        if (section.section_name === 'hero') {
          layoutDefaults = HERO_LAYOUT_DEFAULTS;
        } else if (section.section_name === 'cta') {
          layoutDefaults = CTA_LAYOUT_DEFAULTS;
        } else {
          continue;
        }

        const updatedContent = { ...currentContent };
        const fieldsAdded: string[] = [];

        for (const [key, value] of Object.entries(layoutDefaults)) {
          if (updatedContent[key] === undefined || updatedContent[key] === null) {
            updatedContent[key] = value;
            fieldsAdded.push(key);
          }
        }

        if (fieldsAdded.length > 0) {
          const { error: updateError } = await (client as any)
            .from('section_content')
            .update({ content: updatedContent })
            .eq('id', section.id);

          if (updateError) {
            throw new Error(`Failed to update section ${section.section_name}: ${updateError.message}`);
          }

          console.log(`[PopulateLayoutConfig] Updated ${section.section_name}: added ${fieldsAdded.join(', ')}`);
        } else {
          console.log(`[PopulateLayoutConfig] Section ${section.section_name} already has all layout fields`);
        }
      }

      toast.success('Layout config populated successfully');
    } catch (err: any) {
      console.error('[PopulateLayoutConfig] Error:', err);
      toast.error(err.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePopulate}
      disabled={isRunning}
      data-testid="button-populate-layout-config"
    >
      {isRunning ? 'Populating...' : 'Populate Layout Config'}
    </Button>
  );
}
