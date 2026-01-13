import { useCmsPage } from "@/hooks/useCmsPage";
import { SectionRenderer } from "@/components/sections/SectionRenderer";

export function CmsPageRenderer({ slug }: { slug: string }) {
  const { page, sections, isLoading, error } = useCmsPage(slug);

  if (isLoading) return null;
  if (error || !page) return null;

  return (
    <>
      {sections.map((section) => (
        <SectionRenderer
          key={section.id}
          section={section}
        />
      ))}
    </>
  );
}