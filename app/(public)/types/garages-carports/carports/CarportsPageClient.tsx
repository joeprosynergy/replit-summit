"use client";

import { useOptionalAdminAuth } from "@/contexts/useOptionalAdminAuth";
import { useCMSContent } from "@/hooks/useCMSContent";
import { CarportsView } from "@/components/CarportsView";
import { lazy, Suspense } from "react";

const CarportsEditable = lazy(() => import("@/components/CarportsEditable"));

interface CarportsPageClientProps {
  initialContent: any;
}

export default function CarportsPageClient({ initialContent }: CarportsPageClientProps) {
  const { isAdmin } = useOptionalAdminAuth();
  const { content } = useCMSContent("carports", initialContent);

  // Render the server-provided content immediately (initialContent is already the CMS content
  // merged with defaults), so the initial HTML contains the real page instead of "Loading...".
  // useCMSContent still refreshes from the CMS after mount.

  if (isAdmin) {
    return (
      <Suspense fallback={<CarportsView content={content} />}>
        <CarportsEditable initialContent={content} />
      </Suspense>
    );
  }

  return <CarportsView content={content} />;
}
