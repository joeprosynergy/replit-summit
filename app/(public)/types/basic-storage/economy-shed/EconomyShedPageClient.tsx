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
  const { content } = useCMSContent("economy-shed", initialContent);

  // Render the server-provided content immediately (initialContent is already the CMS content
  // merged with defaults), so the initial HTML contains the real page instead of "Loading...".
  // useCMSContent still refreshes from the CMS after mount.

  if (isAdmin) {
    return (
      <Suspense fallback={<EconomyShedView content={content} />}>
        <EconomyShedEditable initialContent={content} />
      </Suspense>
    );
  }

  return <EconomyShedView content={content} />;
}
