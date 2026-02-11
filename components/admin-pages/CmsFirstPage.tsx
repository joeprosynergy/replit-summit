"use client";

import { EconomyShedWorkingCopyRenderer } from "@/components/EconomyShedWorkingCopyRenderer";

export default function CmsFirstPage({ slug }: { slug: string }) {
  return <EconomyShedWorkingCopyRenderer pageSlug={slug} />;
}
