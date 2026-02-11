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
  const { content, isLoading } = useCMSContent("animal-shelters", initialContent);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <Suspense fallback={<AnimalSheltersView content={content} />}>
        <AnimalSheltersEditable initialContent={content} />
      </Suspense>
    );
  }

  return <AnimalSheltersView content={content} />;
}
