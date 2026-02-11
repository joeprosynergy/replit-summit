"use client";

import { useOptionalAdminAuth } from "@/contexts/useOptionalAdminAuth";
import { useCMSContent } from "@/hooks/useCMSContent";
import { CabinView } from "@/components/CabinView";
import { lazy, Suspense } from "react";

const CabinEditable = lazy(() => import("@/components/CabinEditable"));

interface CabinPageClientProps {
  initialContent: any;
}

export default function CabinPageClient({ initialContent }: CabinPageClientProps) {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent("cabin", initialContent);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <Suspense fallback={<CabinView content={content} />}>
        <CabinEditable initialContent={content} />
      </Suspense>
    );
  }

  return <CabinView content={content} />;
}
