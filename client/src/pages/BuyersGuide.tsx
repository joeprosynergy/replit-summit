import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import html2pdf from "html2pdf.js";
import { Download, Loader2 } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  CoverPage,
  Step1Page,
  Step2Page,
  Step3Page,
  Step4Page,
  Step5ContactPage,
} from "@/components/buyers-guide/BuyersGuidePages";
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useEditablePageContent, PageContent } from '@/hooks/useEditablePageContent';
import { useSectionContent } from '@/hooks/useSectionContent';
import { InlineEditable } from '@/components/admin/InlineEditable';
import { AdminEditMode } from '@/components/admin/AdminEditMode';
import { usePageManagement } from '@/hooks/usePageManagement';

interface NavContent {
  coverLabel: string;
  step1Label: string;
  step2Label: string;
  step3Label: string;
  step4Label: string;
  step5Label: string;
  downloadButtonText: string;
  generatingText: string;
}

const defaultNavContent: NavContent = {
  coverLabel: "Cover",
  step1Label: "Step 1",
  step2Label: "Step 2",
  step3Label: "Step 3",
  step4Label: "Step 4",
  step5Label: "Step 5 & Contact",
  downloadButtonText: "Download PDF",
  generatingText: "Generating...",
};

export const defaultContent: PageContent = {
  heading: "Summit Buyers Guide",
  tagline: "",
  subheading: "",
  ctaHeading: "",
  ctaDescription: "",
  ctaButton: "",
  metaTitle: "Summit Buyers Guide | Summit Portable Buildings",
  metaDescription: "Your 5-step roadmap to the perfect storage building. Learn how to choose the right size, materials, prepare your site, and more.",
};

const BuyersGuide = () => {
  const { isAdmin } = useAdminAuth();
  const { showDuplicateDialog, showDeleteDialog, newSlug, isDuplicating, isDeleting, setNewSlug, setShowDuplicateDialog, setShowDeleteDialog, duplicatePage, deletePage } = usePageManagement('buyers-guide');
  const [activePage, setActivePage] = useState(1);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const {
    content,
    isLoading: isPageLoading,
    isSaving: isPageSaving,
    isEditMode,
    hasChanges: hasPageChanges,
    updateField,
    save: savePage,
    reset: resetPage,
    startEditing,
  } = useEditablePageContent('buyers-guide', defaultContent);

  const {
    content: navContent,
    isLoading: isNavLoading,
    isSaving: isNavSaving,
    hasChanges: hasNavChanges,
    updateField: updateNavField,
    save: saveNav,
    reset: resetNav,
  } = useSectionContent('buyers-guide', 'navigation', defaultNavContent as any) as {
    content: NavContent;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: any;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  const [localNav, setLocalNav] = useState<NavContent>(defaultNavContent);

  useEffect(() => { if (navContent) setLocalNav(navContent); }, [navContent]);

  const handleSave = async () => {
    await Promise.all([savePage(), saveNav()]);
  };

  const handleReset = () => {
    resetPage();
    resetNav();
    if (navContent) setLocalNav(navContent);
  };

  const isLoading = isPageLoading || isNavLoading;
  const isSaving = isPageSaving || isNavSaving;
  const hasChanges = hasPageChanges || hasNavChanges;

  const navButtons = [
    { page: 1, label: localNav.coverLabel, mobileLabel: "Cover" },
    { page: 2, label: localNav.step1Label, mobileLabel: "1" },
    { page: 3, label: localNav.step2Label, mobileLabel: "2" },
    { page: 4, label: localNav.step3Label, mobileLabel: "3" },
    { page: 5, label: localNav.step4Label, mobileLabel: "4" },
    { page: 6, label: localNav.step5Label, mobileLabel: "5" },
  ];

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);

    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 250));

    const pdfElement = document.getElementById("buyers-guide-pdf");
    if (!pdfElement) {
      setIsGeneratingPDF(false);
      return;
    }

    const opt = {
      margin: [0.4, 0.35, 0.4, 0.35],
      filename: "Summit-Buyers-Guide.pdf",
      enableLinks: true,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        letterRendering: true,
      },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"], after: ".pdf-page" },
    };

    try {
      await html2pdf().set(opt).from(pdfElement).save();
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (isLoading) return null;

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <link rel="canonical" href="https://summitbuildings.com/buyers-guide" />
      </Helmet>

      <Header />

      <AdminEditMode
        isAdmin={isAdmin}
        isEditMode={isEditMode}
        hasChanges={hasChanges}
        isSaving={isSaving}
        onToggleEdit={startEditing}
        onSave={handleSave}
        onCancel={handleReset}
        pageSlug="buyers-guide"
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

      <main className="bg-muted min-h-screen pt-20">
        <div className="flex flex-col items-center py-10 px-4">
          {/* Page Navigation */}
          <nav className="sticky top-24 z-40 bg-background/90 backdrop-blur-md px-4 md:px-5 py-3 rounded-2xl md:rounded-full shadow-lg mb-8 flex flex-col md:flex-row gap-2 md:gap-2 justify-center items-center print:hidden">
            <div className="flex gap-1 md:gap-2 justify-center">
              {navButtons.map((btn) => (
                <button
                  key={btn.page}
                  onClick={() => setActivePage(btn.page)}
                  className={`px-3 md:px-5 py-2 rounded-full font-semibold text-xs md:text-sm transition-all ${
                    activePage === btn.page
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent text-primary hover:bg-primary/10"
                  }`}
                >
                  <span className="md:hidden">{btn.mobileLabel}</span>
                  <span className="hidden md:inline">
                    {isEditMode ? (
                      <InlineEditable
                        value={btn.label}
                        fieldName={`Nav button ${btn.page}`}
                        onChange={(v) => {
                          const fieldMap: Record<number, keyof NavContent> = {
                            1: 'coverLabel', 2: 'step1Label', 3: 'step2Label',
                            4: 'step3Label', 5: 'step4Label', 6: 'step5Label'
                          };
                          const fieldKey = fieldMap[btn.page];
                          setLocalNav({ ...localNav, [fieldKey]: v });
                          updateNavField(fieldKey, v);
                        }}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    ) : (
                      btn.label
                    )}
                  </span>
                </button>
              ))}
            </div>

            <div className="hidden md:block h-6 w-px bg-border mx-2" />

            <Button
              onClick={handleDownloadPDF}
              variant="hero"
              size="sm"
              className="gap-2 w-full md:w-auto"
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {isGeneratingPDF ? localNav.generatingText : localNav.downloadButtonText}
            </Button>
          </nav>

          {/* Edit mode note */}
          {isEditMode && (
            <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-lg mb-6 text-sm text-center max-w-2xl">
              Note: The Buyer's Guide pages contain specialized PDF export layouts. You can edit the navigation labels and meta content above. The guide page content is fixed for PDF generation consistency.
            </div>
          )}

          {/* On-screen content (single page at a time) */}
          <div id="buyers-guide-content" className="w-full flex flex-col items-center">
            {activePage === 1 && <CoverPage />}
            {activePage === 2 && <Step1Page />}
            {activePage === 3 && <Step2Page />}
            {activePage === 4 && <Step3Page />}
            {activePage === 5 && <Step4Page />}
            {activePage === 6 && <Step5ContactPage />}
          </div>

          {/* Hidden content for PDF generation (all pages) */}
          {isGeneratingPDF && (
            <div
              aria-hidden="true"
              className="fixed left-[-100000px] top-0 bg-white"
              style={{ width: '7.5in' }}
            >
              <div id="buyers-guide-pdf" className="buyers-guide-pdf">
                <CoverPage exportMode />
                <Step1Page exportMode />
                <Step2Page exportMode />
                <Step3Page exportMode />
                <Step4Page exportMode />
                <Step5ContactPage exportMode />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BuyersGuide;
