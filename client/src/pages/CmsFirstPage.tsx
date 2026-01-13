import { useParams } from "react-router-dom";
import { EconomyShedWorkingCopyRenderer } from "@/components/EconomyShedWorkingCopyRenderer";

const CmsFirstPage = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return (
      <div className="p-8 text-sm text-muted-foreground">
        CMS page slug missing
      </div>
    );
  }

  return <EconomyShedWorkingCopyRenderer pageSlug={slug} />;
};

export default CmsFirstPage;