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
  const { content } = useCMSContent("modern-shed", initialContent);

  // Render the server-provided content immediately (initialContent is already the CMS content
  // merged with defaults), so the initial HTML contains the real page instead of "Loading...".
  // useCMSContent still refreshes from the CMS after mount.

  if (isAdmin) {
    return (
      <Suspense fallback={<ModernShedView content={content} />}>
        <ModernShedEditable initialContent={content} />
      </Suspense>
    );
  }

  return <ModernShedView content={content} />;
}
