"use client";

import { useOptionalAdminAuth } from "@/contexts/useOptionalAdminAuth";
import { useCMSContent } from "@/hooks/useCMSContent";
import { ModernShedView } from "@/components/ModernShedView";
import { lazy, Suspense } from "react";

const ModernShedEditable = lazy(() => import("@/components/ModernShedEditable"));

interface ModernShedPageClientProps {
  initialContent: any;
}

export default function ModernShedPageClient({ initialContent }: ModernShedPageClientProps) {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent("modern-shed", initialContent);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <Suspense fallback={<ModernShedView content={content} />}>
        <ModernShedEditable initialContent={content} />
      </Suspense>
    );
  }

  return <ModernShedView content={content} />;
}
