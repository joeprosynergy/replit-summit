"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CoverPage,
  Step1Page,
  Step2Page,
  Step3Page,
  Step4Page,
  Step5ContactPage,
} from "@/components/buyers-guide/BuyersGuidePages";
import type { BuyersGuideContent } from "@/data/defaults/buyersGuideDefaults";

interface BuyersGuideViewProps {
  content: BuyersGuideContent;
}

export const BuyersGuideView = ({ content }: BuyersGuideViewProps) => {
  const [activePage, setActivePage] = useState(1);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Safe access to navigation (defensive check)
  const nav = content.navigation || {
    coverLabel: "Cover",
    step1Label: "Step 1",
    step2Label: "Step 2",
    step3Label: "Step 3",
    step4Label: "Step 4",
    step5Label: "Step 5 & Contact",
    downloadButtonText: "Download PDF",
    generatingText: "Generating...",
  };

  const navButtons = [
    { page: 1, label: nav.coverLabel, mobileLabel: "Cover" },
    { page: 2, label: nav.step1Label, mobileLabel: "1" },
    { page: 3, label: nav.step2Label, mobileLabel: "2" },
    { page: 4, label: nav.step3Label, mobileLabel: "3" },
    { page: 5, label: nav.step4Label, mobileLabel: "4" },
    { page: 6, label: nav.step5Label, mobileLabel: "5" },
  ];

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);

    // Wait for React to render the hidden PDF content
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));

    const pdfElement = document.getElementById("buyers-guide-pdf");
    if (!pdfElement) {
      setIsGeneratingPDF(false);
      return;
    }

    // Pre-load all images before generating PDF
    const images = pdfElement.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = () => resolve();
              img.onerror = () => resolve(); // Continue even if image fails
            }
          })
      )
    );

    // Additional wait for images to fully render
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 300));

    const opt = {
      margin: [0.4, 0.35, 0.4, 0.35],
      filename: "Summit-Buyers-Guide.pdf",
      enableLinks: true,
      image: { type: "jpeg", quality: 0.95 },
      html2canvas: {
        scale: 1.5, // Lower scale for more consistent image rendering
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        letterRendering: true,
        allowTaint: false,
        imageTimeout: 15000, // Give images more time to load
      },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"], after: ".pdf-page" },
    };

    try {
      const html2pdfModule = await import("html2pdf.js");
      const html2pdf = html2pdfModule.default;
      await html2pdf().set(opt).from(pdfElement).save();
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <>
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
                <span className="hidden md:inline">{btn.label}</span>
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
            {isGeneratingPDF ? nav.generatingText : nav.downloadButtonText}
          </Button>
        </nav>

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
    </>
  );
};
