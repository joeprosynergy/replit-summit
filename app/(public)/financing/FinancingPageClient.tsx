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
  const { content } = useCMSContent<FinancingContent>(
    "financing",
    initialContent
  );

  // Render the server-provided content immediately (initialContent is already the CMS content
  // merged with defaults), so the initial HTML contains the real page instead of "Loading...".
  // useCMSContent still refreshes from the CMS after mount.

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
