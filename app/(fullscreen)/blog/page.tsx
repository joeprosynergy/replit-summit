import type { Metadata } from "next";
import { Suspense } from "react";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: { absolute: "Blog | Summit Portable Buildings" },
  description:
    "Read tips, ideas, and stories about storage sheds, portable buildings, tiny homes, and more from Summit Portable Buildings.",
  alternates: {
    canonical: "https://summitbuildings.com/blog",
  },
};

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      }
    >
      <BlogPageClient />
    </Suspense>
  );
}
