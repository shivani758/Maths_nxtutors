import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ allowedRoles, fallbackPath, children }) {
  const { session } = useAuth();
  const location = useLocation();

  if (!session) {
    return <Navigate to={fallbackPath} replace state={{ from: location.pathname }} />;
  }

  if (!allowedRoles.includes(session.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

