"use client";

import { lazy, Suspense } from "react";
import { useOptionalAdminAuth } from "@/contexts/useOptionalAdminAuth";
import { useCMSContent } from "@/hooks/useCMSContent";
import { AboutUsView } from "@/components/AboutUsView";

const AboutUsEditable = lazy(() => import("@/components/AboutUsEditable"));

interface AboutUsPageClientProps {
  initialContent: any;
}

export default function AboutUsPageClient({
  initialContent,
}: AboutUsPageClientProps) {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent("about-us", initialContent);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <Suspense fallback={<AboutUsView content={content} />}>
        <AboutUsEditable initialContent={content} />
      </Suspense>
    );
  }

  return <AboutUsView content={content} />;
}
