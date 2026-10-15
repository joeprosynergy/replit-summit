"use client";

import { useOptionalAdminAuth } from "@/contexts/useOptionalAdminAuth";
import { useCMSContent } from "@/hooks/useCMSContent";
import { AnimalSheltersView } from "@/components/AnimalSheltersView";
import { lazy, Suspense } from "react";

const AnimalSheltersEditable = lazy(() => import("@/components/AnimalSheltersEditable"));

interface AnimalSheltersPageClientProps {
  initialContent: any;
}

export default function AnimalSheltersPageClient({ initialContent }: AnimalSheltersPageClientProps) {
  const { isAdmin } = useOptionalAdminAuth();
  const { content } = useCMSContent("animal-shelters", initialContent);

  // Render the server-provided content immediately (initialContent is already the CMS content
  // merged with defaults), so the initial HTML contains the real page instead of "Loading...".
  // useCMSContent still refreshes from the CMS after mount.

  if (isAdmin) {
    return (
      <Suspense fallback={<AnimalSheltersView content={content} />}>
        <AnimalSheltersEditable initialContent={content} />
      </Suspense>
    );
  }

  return <AnimalSheltersView content={content} />;
}
