/**
 * BuyersGuideEditable - Admin Editing Component
 * Lazy-loaded ONLY for admins
 * Wraps BuyersGuide with inline editing capabilities
 */

import { useState } from "react";
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
import { EditablePageWrapper } from "@/components/admin/EditablePageWrapper";
import { InlineEditable } from "@/components/admin/InlineEditable";
import { buyersGuideDefaults, type BuyersGuideContent } from "@/pages/defaults/buyersGuideDefaults";

interface BuyersGuideEditableProps {
  initialContent: BuyersGuideContent;
}

export default function BuyersGuideEditable({ initialContent }: BuyersGuideEditableProps) {
  const [activePage, setActivePage] = useState(1);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

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

  return (
    <EditablePageWrapper<BuyersGuideContent> slug="buyers-guide" defaultContent={initialContent}>
      {({ content, isEditMode, updateField }) => {
        // Safe access to navigation with fallback
        const nav = content.navigation || buyersGuideDefaults.navigation;

        const navButtons = [
          { page: 1, field: 'coverLabel' as const, label: nav.coverLabel, mobileLabel: "Cover" },
          { page: 2, field: 'step1Label' as const, label: nav.step1Label, mobileLabel: "1" },
          { page: 3, field: 'step2Label' as const, label: nav.step2Label, mobileLabel: "2" },
          { page: 4, field: 'step3Label' as const, label: nav.step3Label, mobileLabel: "3" },
          { page: 5, field: 'step4Label' as const, label: nav.step4Label, mobileLabel: "4" },
          { page: 6, field: 'step5Label' as const, label: nav.step5Label, mobileLabel: "5" },
        ];

        const updateNavField = (field: string, value: string) => {
          const newNav = { ...(content.navigation || buyersGuideDefaults.navigation), [field]: value };
          updateField('navigation' as keyof BuyersGuideContent, newNav as any);
        };

        return (
          <>
            <Helmet>
              <title>{content.metaTitle}</title>
              <meta name="description" content={content.metaDescription} />
              <link rel="canonical" href="https://summitbuildings.com/buyers-guide" />
            </Helmet>

            <Header />

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
                          <InlineEditable
                            value={btn.label}
                            fieldName={`Nav button ${btn.page}`}
                            onChange={(v) => updateNavField(btn.field, v)}
                            isEditMode={isEditMode}
                            as="span"
                          />
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
                    <InlineEditable
                      value={isGeneratingPDF ? nav.generatingText : nav.downloadButtonText}
                      fieldName={isGeneratingPDF ? "Generating text" : "Download button text"}
                      onChange={(v) => updateNavField(isGeneratingPDF ? 'generatingText' : 'downloadButtonText', v)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </Button>
                </nav>

                {/* Edit mode note */}
                {isEditMode && (
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-lg mb-6 text-sm text-center max-w-2xl">
                    Note: The Buyer's Guide pages contain specialized PDF export layouts. You can edit the navigation labels and meta content. The guide page content is fixed for PDF generation consistency.
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
      }}
    </EditablePageWrapper>
  );
}
