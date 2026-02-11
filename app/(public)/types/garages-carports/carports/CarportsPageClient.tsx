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
  const { content, isLoading } = useCMSContent("carports", initialContent);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <Suspense fallback={<CarportsView content={content} />}>
        <CarportsEditable initialContent={content} />
      </Suspense>
    );
  }

  return <CarportsView content={content} />;
}
