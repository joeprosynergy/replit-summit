"use client";

import { useOptionalAdminAuth } from "@/contexts/useOptionalAdminAuth";
import { useCMSContent } from "@/hooks/useCMSContent";
import { EconomyShedView } from "@/components/EconomyShedView";
import { lazy, Suspense } from "react";

const EconomyShedEditable = lazy(() => import("@/components/EconomyShedEditable"));

interface EconomyShedPageClientProps {
  initialContent: any;
}

export default function EconomyShedPageClient({ initialContent }: EconomyShedPageClientProps) {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent("economy-shed", initialContent);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <Suspense fallback={<EconomyShedView content={content} />}>
        <EconomyShedEditable initialContent={content} />
      </Suspense>
    );
  }

  return <EconomyShedView content={content} />;
}
