"use client";

import { Suspense, lazy } from "react";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import ScrollToTop from "@/components/ScrollToTop";
import { CodeSnippetInjector } from "@/components/CodeSnippetInjector";
import { BuyersGuideLinkInterceptor } from "@/components/BuyersGuideLinkInterceptor";
import TrackingParamsCapture from "@/components/TrackingParamsCapture";
import VisitorSessionTracker from "@/components/VisitorSessionTracker";
import VisitorIdentityEnricher from "@/components/VisitorIdentityEnricher";

// Lazy-load admin toolbar so it doesn't bloat the public bundle
const GlobalEditToolbar = lazy(() =>
  import("@/components/admin/GlobalEditToolbar").then((m) => ({
    default: m.GlobalEditToolbar,
  }))
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <TooltipProvider>
        <BuyersGuideLinkInterceptor>
          <ScrollToTop />
          <TrackingParamsCapture />
          <VisitorSessionTracker />
          <VisitorIdentityEnricher />
          <CodeSnippetInjector />
          {children}
          <Suspense fallback={null}>
            <GlobalEditToolbar />
          </Suspense>
        </BuyersGuideLinkInterceptor>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </AdminAuthProvider>
  );
}
