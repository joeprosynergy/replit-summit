import { useParams } from "react-router-dom";
import { CmsPageRenderer } from "@/components/CmsPageRenderer";

const CmsFirstPage = () => {
  const { "*": fullPath } = useParams();
  const slug = fullPath ?? "";

  return <CmsPageRenderer slug={slug} />;
};

export default CmsFirstPage;