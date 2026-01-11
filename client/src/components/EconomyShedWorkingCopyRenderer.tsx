import { useState, useEffect, useCallback } from 'react';
import { getBackendClient } from '@/lib/backendClient';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { AdminEditMode } from '@/components/admin/AdminEditMode';
import { EditModeProvider } from '@/contexts/EditModeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const PAGE_SLUG = 'economy-shed-working-copy';

interface SectionRow {
  id: string;
  page_id: string;
  section_name: string;
  content: Record<string, any>;
}

interface HeroContent {
  heading: string;
  tagline: string;
  subheading: string;
  backgroundColor: string;
  paddingTop: string;
  paddingBottom: string;
  textAlignment: string;
  layoutVariant: string;
}

interface CtaContent {
  heading: string;
  description: string;
  button: string;
  buttonLink: string;
  backgroundColor: string;
  paddingTop: string;
  paddingBottom: string;
  textAlignment: string;
  layoutVariant: string;
}

interface EditableSectionProps<T> {
  content: T;
  isEditMode: boolean;
  onUpdateField: (field: keyof T, value: string) => void;
}

function HeroSection({ content, isEditMode, onUpdateField }: EditableSectionProps<HeroContent>) {
  const sectionStyle: React.CSSProperties = {
    backgroundColor: content.backgroundColor,
    paddingTop: content.paddingTop,
    paddingBottom: content.paddingBottom,
  };

  const alignmentClass = content.textAlignment === 'left' ? 'text-left' 
    : content.textAlignment === 'right' ? 'text-right' 
    : 'text-center';

  if (isEditMode) {
    return (
      <section style={sectionStyle} className="relative">
        <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
          Hero Section
        </div>
        <div className="container mx-auto px-4 py-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hero-heading">Heading</Label>
            <Input
              id="hero-heading"
              value={content.heading || ''}
              onChange={(e) => onUpdateField('heading', e.target.value)}
              placeholder="Enter heading..."
              data-testid="input-hero-heading"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero-tagline">Tagline</Label>
            <Input
              id="hero-tagline"
              value={content.tagline || ''}
              onChange={(e) => onUpdateField('tagline', e.target.value)}
              placeholder="Enter tagline..."
              data-testid="input-hero-tagline"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero-subheading">Subheading</Label>
            <Textarea
              id="hero-subheading"
              value={content.subheading || ''}
              onChange={(e) => onUpdateField('subheading', e.target.value)}
              placeholder="Enter subheading..."
              data-testid="input-hero-subheading"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={sectionStyle}>
      <div className={`container mx-auto px-4 ${alignmentClass}`}>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {content.heading}
        </h1>
        {content.tagline && (
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            {content.tagline}
          </p>
        )}
        {content.subheading && (
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {content.subheading}
          </p>
        )}
      </div>
    </section>
  );
}

function CtaSection({ content, isEditMode, onUpdateField }: EditableSectionProps<CtaContent>) {
  const sectionStyle: React.CSSProperties = {
    backgroundColor: content.backgroundColor,
    paddingTop: content.paddingTop,
    paddingBottom: content.paddingBottom,
  };

  const alignmentClass = content.textAlignment === 'left' ? 'text-left' 
    : content.textAlignment === 'right' ? 'text-right' 
    : 'text-center';

  if (isEditMode) {
    return (
      <section style={sectionStyle} className="relative">
        <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
          CTA Section
        </div>
        <div className="container mx-auto px-4 py-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cta-heading">Heading</Label>
            <Input
              id="cta-heading"
              value={content.heading || ''}
              onChange={(e) => onUpdateField('heading', e.target.value)}
              placeholder="Enter heading..."
              data-testid="input-cta-heading"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cta-description">Description</Label>
            <Textarea
              id="cta-description"
              value={content.description || ''}
              onChange={(e) => onUpdateField('description', e.target.value)}
              placeholder="Enter description..."
              data-testid="input-cta-description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cta-button">Button Text</Label>
            <Input
              id="cta-button"
              value={content.button || ''}
              onChange={(e) => onUpdateField('button', e.target.value)}
              placeholder="Enter button text..."
              data-testid="input-cta-button"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cta-buttonLink">Button Link</Label>
            <Input
              id="cta-buttonLink"
              value={content.buttonLink || ''}
              onChange={(e) => onUpdateField('buttonLink', e.target.value)}
              placeholder="Enter button link..."
              data-testid="input-cta-buttonLink"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={sectionStyle}>
      <div className={`container mx-auto px-4 ${alignmentClass}`}>
        <h2 className="text-3xl font-bold mb-4">
          {content.heading}
        </h2>
        {content.description && (
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {content.description}
          </p>
        )}
        {content.button && (
          <Button asChild size="lg">
            <a href={content.buttonLink}>
              {content.button}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
    </section>
  );
}

interface RenderSectionProps {
  section: SectionRow;
  isEditMode: boolean;
  onUpdateField: (sectionId: string, field: string, value: string) => void;
}

function RenderSection({ section, isEditMode, onUpdateField }: RenderSectionProps) {
  const handleUpdateField = useCallback((field: string, value: string) => {
    onUpdateField(section.id, field, value);
  }, [section.id, onUpdateField]);

  switch (section.section_name) {
    case 'hero':
      return (
        <HeroSection
          key={section.id}
          content={section.content as HeroContent}
          isEditMode={isEditMode}
          onUpdateField={handleUpdateField as (field: keyof HeroContent, value: string) => void}
        />
      );
    case 'cta':
      return (
        <CtaSection
          key={section.id}
          content={section.content as CtaContent}
          isEditMode={isEditMode}
          onUpdateField={handleUpdateField as (field: keyof CtaContent, value: string) => void}
        />
      );
    default:
      console.warn(`[EconomyShedWorkingCopyRenderer] Unknown section_name: ${section.section_name}`);
      return null;
  }
}

export function EconomyShedWorkingCopyRenderer() {
  const { isAdmin, isRevalidating } = useAdminAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [sections, setSections] = useState<SectionRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [editedSections, setEditedSections] = useState<SectionRow[]>([]);

  const fetchSections = useCallback(async () => {
    const client = getBackendClient();
    if (!client) {
      setError('Database client not available');
      setIsLoading(false);
      return;
    }

    try {
      const { data: pageData, error: pageError } = await (client as any)
        .from('page_content')
        .select('id, layout_config, is_canonical')
        .eq('slug', PAGE_SLUG)
        .maybeSingle();

      if (pageError) {
        throw new Error(`Failed to fetch page: ${pageError.message}`);
      }

      if (!pageData) {
        throw new Error('Page not found');
      }

      const pageId = pageData.id;

      console.log('[EconomyShedWorkingCopyRenderer] Fetching sections for page_id:', pageId);

      const { data: sectionRows, error: sectionsError } = await (client as any)
        .from('section_content')
        .select('id, page_id, section_name, content')
        .eq('page_id', pageId)
        .in('section_name', ['hero', 'cta']);

      if (sectionsError) {
        throw new Error(`Failed to fetch sections: ${sectionsError.message}`);
      }

      console.log('[EconomyShedWorkingCopyRenderer] Fetched sections:', sectionRows?.length || 0);
      sectionRows?.forEach((s: SectionRow) => {
        console.log(`  - ${s.section_name}: ${Object.keys(s.content || {}).length} fields`);
      });

      const orderedSections = ['hero', 'cta'];
      const sortedSections = (sectionRows || []).sort((a: SectionRow, b: SectionRow) => {
        return orderedSections.indexOf(a.section_name) - orderedSections.indexOf(b.section_name);
      });

      setSections(sortedSections);
      setEditedSections(JSON.parse(JSON.stringify(sortedSections)));
      setIsLoading(false);
    } catch (err: any) {
      console.error('[EconomyShedWorkingCopyRenderer] Error:', err);
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const handleStartEditing = useCallback(() => {
    setIsEditMode(true);
  }, []);

  const handleSave = useCallback(async () => {
    const client = getBackendClient();
    if (!client) {
      toast.error('Database not available');
      return;
    }

    setIsSaving(true);

    try {
      for (const section of editedSections) {
        const { error } = await (client as any)
          .from('section_content')
          .update({ content: section.content })
          .eq('id', section.id);

        if (error) {
          throw new Error(`Failed to save ${section.section_name}: ${error.message}`);
        }
      }

      toast.success('Changes saved');
      setSections(JSON.parse(JSON.stringify(editedSections)));
      setHasChanges(false);
      setIsEditMode(false);
    } catch (err: any) {
      console.error('[EconomyShedWorkingCopyRenderer] Save error:', err);
      toast.error(err.message);
    } finally {
      setIsSaving(false);
    }
  }, [editedSections]);

  const handleCancel = useCallback(() => {
    setEditedSections(JSON.parse(JSON.stringify(sections)));
    setHasChanges(false);
    setIsEditMode(false);
  }, [sections]);

  const handleUpdateSectionField = useCallback((sectionId: string, field: string, value: string) => {
    setEditedSections(prev => {
      const updated = prev.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            content: {
              ...section.content,
              [field]: value,
            },
          };
        }
        return section;
      });
      return updated;
    });
    setHasChanges(true);
  }, []);

  const sectionsToRender = isEditMode ? editedSections : sections;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-destructive mb-4">Error</h1>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <EditModeProvider
      initialContent={{}}
      onSave={handleSave}
    >
      <AdminEditMode
        isAdmin={isAdmin}
        isRevalidating={isRevalidating}
        isEditMode={isEditMode}
        hasChanges={hasChanges}
        isSaving={isSaving}
        onToggleEdit={handleStartEditing}
        onSave={handleSave}
        onCancel={handleCancel}
        pageSlug={PAGE_SLUG}
        showDuplicateDialog={false}
        showDeleteDialog={false}
        newSlug=""
        isDuplicating={false}
        isDeleting={false}
        onSetNewSlug={() => {}}
        onSetShowDuplicateDialog={() => {}}
        onSetShowDeleteDialog={() => {}}
        onDuplicatePage={async () => false}
        onDeletePage={async () => false}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {sectionsToRender.map(section => (
            <RenderSection
              key={section.id}
              section={section}
              isEditMode={isEditMode}
              onUpdateField={handleUpdateSectionField}
            />
          ))}
        </main>
        <Footer />
      </div>
    </EditModeProvider>
  );
}
