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
  const { content } = useCMSContent("cabin", initialContent);

  // Render the server-provided content immediately (initialContent is already the CMS content
  // merged with defaults), so the initial HTML contains the real page instead of "Loading...".
  // useCMSContent still refreshes from the CMS after mount.

  if (isAdmin) {
    return (
      <Suspense fallback={<CabinView content={content} />}>
        <CabinEditable initialContent={content} />
      </Suspense>
    );
  }

  return <CabinView content={content} />;
}
