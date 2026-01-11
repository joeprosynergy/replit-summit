import { useState, useEffect, useCallback } from 'react';
import { getBackendClient } from '@/lib/backendClient';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { AdminEditMode } from '@/components/admin/AdminEditMode';
import { EditModeProvider } from '@/contexts/EditModeContext';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import { usePageManagement } from '@/hooks/usePageManagement';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { PopulateLayoutConfigButton } from '@/components/admin/PopulateLayoutConfigButton';

interface PageData {
  id: string;
  slug: string;
  layout_config?: Record<string, any>;
  is_canonical?: boolean;
  [key: string]: any;
}

interface EconomyShedWorkingCopyRendererProps {
  pageSlug?: string;
  initialPage?: PageData;
  initialSections?: SectionRow[];
}

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
  buttonTarget: string;
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

  return (
    <section style={sectionStyle}>
      <div className={`container mx-auto px-4 ${alignmentClass}`}>
        <InlineEditable
          value={content.heading || ''}
          fieldName="heading"
          onChange={(value) => onUpdateField('heading', value)}
          isEditMode={isEditMode}
          as="h1"
          className="text-4xl md:text-5xl font-bold text-foreground mb-4"
        />
        <InlineEditable
          value={content.tagline || ''}
          fieldName="tagline"
          onChange={(value) => onUpdateField('tagline', value)}
          isEditMode={isEditMode}
          as="p"
          className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4"
        />
        <InlineEditable
          value={content.subheading || ''}
          fieldName="subheading"
          type="textarea"
          onChange={(value) => onUpdateField('subheading', value)}
          isEditMode={isEditMode}
          as="p"
          className="text-muted-foreground max-w-3xl mx-auto"
        />
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

  return (
    <section style={sectionStyle}>
      <div className={`container mx-auto px-4 ${alignmentClass}`}>
        <InlineEditable
          value={content.heading || ''}
          fieldName="heading"
          onChange={(value) => onUpdateField('heading', value)}
          isEditMode={isEditMode}
          as="h2"
          className="text-3xl font-bold mb-4"
        />
        <InlineEditable
          value={content.description || ''}
          fieldName="description"
          type="textarea"
          onChange={(value) => onUpdateField('description', value)}
          isEditMode={isEditMode}
          as="p"
          className="text-muted-foreground mb-8 max-w-2xl mx-auto"
        />
        <InlineEditableButton
          text={content.button || ''}
          href={content.buttonLink || ''}
          onTextChange={(value) => onUpdateField('button', value)}
          onHrefChange={(value) => onUpdateField('buttonLink', value)}
          isEditMode={isEditMode}
          isExternal={content.buttonTarget === '_blank'}
          onExternalChange={(isExternal) => onUpdateField('buttonTarget', isExternal ? '_blank' : '_self')}
        >
          <Button asChild size="lg">
            <a 
              href={content.buttonLink}
              target={content.buttonTarget || '_self'}
              rel={content.buttonTarget === '_blank' ? 'noopener noreferrer' : undefined}
            >
              {content.button || '[Add button text]'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </InlineEditableButton>
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

export function EconomyShedWorkingCopyRenderer({ 
  pageSlug = 'economy-shed-working-copy',
  initialPage,
  initialSections,
}: EconomyShedWorkingCopyRendererProps) {
  const { isAdmin, isRevalidating } = useAdminAuthContext();
  
  // If initialSections provided from server, skip loading state
  const hasServerData = !!(initialPage && initialSections);
  const [isLoading, setIsLoading] = useState(!hasServerData);
  const [sections, setSections] = useState<SectionRow[]>(() => {
    if (initialSections && initialSections.length > 0) {
      // Sort sections in render order
      const orderedSections = ['hero', 'cta'];
      return [...initialSections].sort((a, b) => {
        return orderedSections.indexOf(a.section_name) - orderedSections.indexOf(b.section_name);
      });
    }
    return [];
  });
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [editedSections, setEditedSections] = useState<SectionRow[]>(() => {
    if (initialSections && initialSections.length > 0) {
      const orderedSections = ['hero', 'cta'];
      const sorted = [...initialSections].sort((a, b) => {
        return orderedSections.indexOf(a.section_name) - orderedSections.indexOf(b.section_name);
      });
      return JSON.parse(JSON.stringify(sorted));
    }
    return [];
  });

  const {
    isDuplicating,
    isDeleting,
    showDuplicateDialog,
    showDeleteDialog,
    newSlug,
    setNewSlug,
    setShowDuplicateDialog,
    setShowDeleteDialog,
    duplicatePage,
    deletePage,
  } = usePageManagement(pageSlug);

  // Only fetch from client-side Supabase if no server data was provided (legacy fallback)
  const fetchSections = useCallback(async () => {
    // Skip if server data was provided
    if (hasServerData) {
      console.log(`[CmsFirstRenderer] Using server-provided data for ${pageSlug}`);
      setIsLoading(false);
      return;
    }

    const client = getBackendClient();
    if (!client) {
      setError('Database client not available');
      setIsLoading(false);
      return;
    }

    console.log(`[CmsFirstRenderer] Fallback: fetching from client-side Supabase for ${pageSlug}`);

    try {
      const { data: pageData, error: pageError } = await (client as any)
        .from('page_content')
        .select('id, layout_config, is_canonical')
        .eq('slug', pageSlug)
        .maybeSingle();

      if (pageError) {
        throw new Error(`Failed to fetch page: ${pageError.message}`);
      }

      if (!pageData) {
        throw new Error('Page not found');
      }

      const pageId = pageData.id;

      console.log(`[CmsFirstRenderer] Fetching sections for ${pageSlug}, page_id:`, pageId);

      const { data: sectionRows, error: sectionsError } = await (client as any)
        .from('section_content')
        .select('id, page_id, section_name, content')
        .eq('page_id', pageId)
        .in('section_name', ['hero', 'cta']);

      if (sectionsError) {
        throw new Error(`Failed to fetch sections: ${sectionsError.message}`);
      }

      console.log(`[CmsFirstRenderer] Fetched ${sectionRows?.length || 0} sections for ${pageSlug}`);
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
      console.error(`[CmsFirstRenderer] Error for ${pageSlug}:`, err);
      setError(err.message);
      setIsLoading(false);
    }
  }, [pageSlug, hasServerData]);

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
      console.error(`[CmsFirstRenderer] Save error for ${pageSlug}:`, err);
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
        pageSlug={pageSlug}
        showDuplicateDialog={showDuplicateDialog}
        showDeleteDialog={showDeleteDialog}
        newSlug={newSlug}
        isDuplicating={isDuplicating}
        isDeleting={isDeleting}
        onSetNewSlug={setNewSlug}
        onSetShowDuplicateDialog={setShowDuplicateDialog}
        onSetShowDeleteDialog={setShowDeleteDialog}
        onDuplicatePage={duplicatePage}
        onDeletePage={deletePage}
      />
      {isAdmin && !isEditMode && initialPage?.id && (
        <div className="fixed bottom-4 left-4 z-50">
          <PopulateLayoutConfigButton pageSlug={pageSlug} pageId={initialPage.id} />
        </div>
      )}
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
