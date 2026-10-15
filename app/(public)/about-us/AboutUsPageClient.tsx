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
  const { content } = useCMSContent("about-us", initialContent);

  // Render the server-provided content immediately (initialContent is already the CMS content
  // merged with defaults), so the initial HTML contains the real page instead of "Loading...".
  // useCMSContent still refreshes from the CMS after mount.

  if (isAdmin) {
    return (
      <Suspense fallback={<AboutUsView content={content} />}>
        <AboutUsEditable initialContent={content} />
      </Suspense>
    );
  }

  return <AboutUsView content={content} />;
}
