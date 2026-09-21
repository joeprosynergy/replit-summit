"use client";

import { lazy, Suspense } from "react";
import { useOptionalAdminAuth } from "@/contexts/useOptionalAdminAuth";
import { useCMSContent } from "@/hooks/useCMSContent";
import { FinancingView } from "@/components/FinancingView";
import type { FinancingContent } from "@/data/defaults/financingDefaults";

const FinancingEditable = lazy(() => import("@/components/FinancingEditable"));

interface FinancingPageClientProps {
  initialContent: any;
  mode?: "full" | "rent-to-own";
}

export default function FinancingPageClient({
  initialContent,
  mode = "full",
}: FinancingPageClientProps) {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent<FinancingContent>(
    "financing",
    initialContent
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (mode === "rent-to-own") {
    return <FinancingView content={content} mode="rent-to-own" />;
  }

  if (isAdmin) {
    return (
      <Suspense fallback={<FinancingView content={content} />}>
        <FinancingEditable initialContent={content} />
      </Suspense>
    );
  }

  return <FinancingView content={content} />;
}
