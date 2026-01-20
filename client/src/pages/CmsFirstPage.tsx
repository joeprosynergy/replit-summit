import { useParams } from "react-router-dom";
import { EconomyShedWorkingCopyRenderer } from "@/components/EconomyShedWorkingCopyRenderer";

const CmsFirstPage = () => {
  const { "*": fullPath } = useParams();
  const slug = fullPath || "";
  return <EconomyShedWorkingCopyRenderer pageSlug={slug} />;
};

export default CmsFirstPage;
