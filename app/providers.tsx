"use client";

import { Suspense, lazy } from "react";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import ScrollToTop from "@/components/ScrollToTop";
import { CodeSnippetInjector } from "@/components/CodeSnippetInjector";
import { BuyersGuideLinkInterceptor } from "@/components/BuyersGuideLinkInterceptor";

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
