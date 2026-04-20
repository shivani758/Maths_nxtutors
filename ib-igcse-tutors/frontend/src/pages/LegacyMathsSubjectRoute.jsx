import { Navigate, useParams } from "react-router-dom";
import { getLegacyMathsRedirectPath } from "../data/mathsBoardPages";
import SubjectPage from "./SubjectPage";

function LegacyMathsSubjectRoute() {
  const { slug } = useParams();
  const redirectPath = getLegacyMathsRedirectPath(slug);

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return <SubjectPage />;
}

export default LegacyMathsSubjectRoute;
