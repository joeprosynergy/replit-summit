import { useState, useEffect, useCallback, useMemo } from "react";
import { getBackendClient } from "@/lib/backendClient";
import { useAdminAuthContext } from "@/contexts/AdminAuthContext";
import { AdminEditMode } from "@/components/admin/AdminEditMode";
import { EditModeProvider } from "@/contexts/EditModeContext";
import { InlineEditable } from "@/components/admin/InlineEditable";
import InlineEditableButton from "@/components/admin/InlineEditableButton";
import { usePageManagement } from "@/hooks/usePageManagement";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { PopulateLayoutConfigButton } from "@/components/admin/PopulateLayoutConfigButton";

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

function HeroSection({
  content,
  isEditMode,
  onUpdateField,
}: EditableSectionProps<HeroContent>) {
  const sectionStyle: React.CSSProperties = {
    backgroundColor: content.backgroundColor,
    paddingTop: content.paddingTop,
    paddingBottom: content.paddingBottom,
  };

  const alignmentClass =
    content.textAlignment === "left"
      ? "text-left"
      : content.textAlignment === "right"
        ? "text-right"
        : "text-center";

  return (
    <section style={sectionStyle}>
      <div className={`container mx-auto px-4 ${alignmentClass}`}>
        <InlineEditable
          value={content.heading || ""}
          fieldName="heading"
          onChange={(value) => onUpdateField("heading", value)}
          isEditMode={isEditMode}
          as="h1"
          className="text-4xl md:text-5xl font-bold text-foreground mb-4"
        />
        <InlineEditable
          value={content.tagline || ""}
          fieldName="tagline"
          onChange={(value) => onUpdateField("tagline", value)}
          isEditMode={isEditMode}
          as="p"
          className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4"
        />
        <InlineEditable
          value={content.subheading || ""}
          fieldName="subheading"
          type="textarea"
          onChange={(value) => onUpdateField("subheading", value)}
          isEditMode={isEditMode}
          as="p"
          className="text-muted-foreground max-w-3xl mx-auto"
        />
      </div>
    </section>
  );
}

function CtaSection({
  content,
  isEditMode,
  onUpdateField,
}: EditableSectionProps<CtaContent>) {
  const sectionStyle: React.CSSProperties = {
    backgroundColor: content.backgroundColor,
    paddingTop: content.paddingTop,
    paddingBottom: content.paddingBottom,
  };

  const alignmentClass =
    content.textAlignment === "left"
      ? "text-left"
      : content.textAlignment === "right"
        ? "text-right"
        : "text-center";

  return (
    <section style={sectionStyle}>
      <div className={`container mx-auto px-4 ${alignmentClass}`}>
        <InlineEditable
          value={content.heading || ""}
          fieldName="heading"
          onChange={(value) => onUpdateField("heading", value)}
          isEditMode={isEditMode}
          as="h2"
          className="text-3xl font-bold mb-4"
        />
        <InlineEditable
          value={content.description || ""}
          fieldName="description"
          type="textarea"
          onChange={(value) => onUpdateField("description", value)}
          isEditMode={isEditMode}
          as="p"
          className="text-muted-foreground mb-8 max-w-2xl mx-auto"
        />
        <InlineEditableButton
          text={content.button || ""}
          href={content.buttonLink || ""}
          onTextChange={(value) => onUpdateField("button", value)}
          onHrefChange={(value) => onUpdateField("buttonLink", value)}
          isEditMode={isEditMode}
          isExternal={content.buttonTarget === "_blank"}
          onExternalChange={(isExternal) =>
            onUpdateField("buttonTarget", isExternal ? "_blank" : "_self")
          }
        >
          <Button asChild size="lg">
            <a
              href={content.buttonLink}
              target={content.buttonTarget || "_self"}
              rel={
                content.buttonTarget === "_blank"
                  ? "noopener noreferrer"
                  : undefined
              }
            >
              {content.button || "[Add button text]"}
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

function RenderSection({
  section,
  isEditMode,
  onUpdateField,
}: RenderSectionProps) {
  const handleUpdateField = useCallback(
    (field: string, value: string) => {
      onUpdateField(section.id, field, value);
    },
    [section.id, onUpdateField],
  );

  switch (section.section_name) {
    case "hero":
      return (
        <HeroSection
          key={section.id}
          content={section.content as HeroContent}
          isEditMode={isEditMode}
          onUpdateField={
            handleUpdateField as (
              field: keyof HeroContent,
              value: string,
            ) => void
          }
        />
      );
    case "cta":
      return (
        <CtaSection
          key={section.id}
          content={section.content as CtaContent}
          isEditMode={isEditMode}
          onUpdateField={
            handleUpdateField as (
              field: keyof CtaContent,
              value: string,
            ) => void
          }
        />
      );
    default:
      console.warn(
        `[EconomyShedWorkingCopyRenderer] Unknown section_name: ${section.section_name}`,
      );
      return null;
  }
}

export function EconomyShedWorkingCopyRenderer({
  pageSlug = "economy-shed-working-copy",
  initialPage,
  initialSections,
}: EconomyShedWorkingCopyRendererProps) {
  const { isAdmin, isRevalidating } = useAdminAuthContext();
  // CMS-FIRST FETCH (only when mounted directly via /cms/*)
  const [fetchedPage, setFetchedPage] = useState<PageData | null>(null);
  const [fetchedSections, setFetchedSections] = useState<SectionRow[] | null>(
    null,
  );

  useEffect(() => {
    if (initialPage && initialSections) return;

    let cancelled = false;

    const fetchCmsPage = async () => {
      try {
        const res = await fetch(
          `${window.location.origin}/api/cms-page/${encodeURIComponent(pageSlug)}`
        );

        const contentType = res.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
          console.error("[CMS FETCH] Non-JSON response", {
            status: res.status,
            contentType,
          });
          return;
        }

        const data = await res.json();

        if (!cancelled) {
          setFetchedPage(data.page);
          setFetchedSections(data.sections);
        }
      } catch (e) {
        console.error('[CMS FETCH] error', e);
      }
    };

    fetchCmsPage();

    return () => {
      cancelled = true;
    };
  }, [pageSlug, initialPage, initialSections]);

  // CMS-FIRST IMMUTABLE DATA: Server-provided sections are the ONLY source of truth
  // DO NOT copy into mutable state - render directly from props
  const pageSource = initialPage ?? fetchedPage;
  const sectionSource = initialSections ?? fetchedSections;

  // Compute sorted sections from immutable server props (no state)
  const immutableSections = useMemo(() => {
    if (!sectionSource || sectionSource.length === 0) return [];
    const orderedSections = ["hero", "cta"];
    return [...sectionSource].sort((a, b) => {
      return (
        orderedSections.indexOf(a.section_name) -
        orderedSections.indexOf(b.section_name)
      );
    });
  }, [sectionSource]);

  // Edit mode state - only used during active editing
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // editedSections: Deep clone of immutable data, used ONLY during edit mode
  // Initialized once from server props, reset on cancel
  const [editedSections, setEditedSections] = useState<SectionRow[]>(() => {
    if (!sectionSource || sectionSource.length === 0) return [];
    const orderedSections = ["hero", "cta"];
    const sorted = [...sectionSource].sort((a, b) => {
      return (
        orderedSections.indexOf(a.section_name) -
        orderedSections.indexOf(b.section_name)
      );
    });
    return JSON.parse(JSON.stringify(sorted));
  });
  // 🔁 HYDRATE EDITABLE STATE WHEN CMS DATA LOADS
  useEffect(() => {
    if (!sectionSource || sectionSource.length === 0) return;

    setEditedSections(
      JSON.parse(JSON.stringify(sectionSource))
    );
  }, [sectionSource]);
  // Track if we've saved changes (to show updated content without re-fetch)
  const [savedSections, setSavedSections] = useState<SectionRow[] | null>(null);

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

  // CMS-FIRST: NO client-side fetch for pages with server data
  // This eliminates all post-mount state mutations that could overwrite server data

  const handleStartEditing = useCallback(() => {
    setIsEditMode(true);
  }, []);

  const handleSave = useCallback(async () => {
    const client = getBackendClient();
    if (!client) {
      toast.error("Database not available");
      return;
    }

    setIsSaving(true);

    try {
      for (const section of editedSections) {
        const { error } = await (client as any)
          .from("section_content")
          .update({ content: section.content })
          .eq("id", section.id);

        if (error) {
          throw new Error(
            `Failed to save ${section.section_name}: ${error.message}`,
          );
        }
      }

      toast.success("Changes saved");
      // Store saved sections to display after save (without mutating immutable props)
      setSavedSections(JSON.parse(JSON.stringify(editedSections)));
      setHasChanges(false);
      setIsEditMode(false);
    } catch (err: any) {
      console.error(`[CmsFirstRenderer] Save error for ${pageSlug}:`, err);
      toast.error(err.message);
    } finally {
      setIsSaving(false);
    }
  }, [editedSections, pageSlug]);

  const handleCancel = useCallback(() => {
    // Reset to immutable source: savedSections (if exists) or original immutable props
    const sourceData = savedSections || immutableSections;
    setEditedSections(JSON.parse(JSON.stringify(sourceData)));
    setHasChanges(false);
    setIsEditMode(false);
  }, [savedSections, immutableSections]);

  const handleUpdateSectionField = useCallback(
    (sectionId: string, field: string, value: string) => {
      setEditedSections((prev) => {
        const updated = prev.map((section) => {
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
    },
    [],
  );

  // IMMUTABLE RENDER: Use savedSections (after save) or immutableSections (from server props)
  // Only use editedSections during active edit mode
  const sectionsToRender = isEditMode
    ? editedSections
    : savedSections || immutableSections;
  console.log('[CMS RENDER CHECK]', {
    pageSource,
    sectionSource,
  });
  // CMS-FIRST: No loading state needed - server data is available immediately
  // No error state needed - errors are handled at the DynamicPage level

  if (!pageSource || !sectionSource) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <EditModeProvider initialContent={{}} onSave={handleSave}>
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
          <PopulateLayoutConfigButton
            pageSlug={pageSlug}
            pageId={pageSource.id}
          />
        </div>
      )}
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {sectionsToRender.map((section) => (
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
