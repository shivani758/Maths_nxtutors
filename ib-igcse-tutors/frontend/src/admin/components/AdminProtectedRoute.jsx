import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "../providers/AdminAuthContext";
import { LoadingPanel } from "./primitives";

function AdminProtectedRoute() {
  const { isAuthenticated, isLoadingAuth } = useAdminAuth();
  const location = useLocation();

  if (isLoadingAuth) {
    return <LoadingPanel label="Checking admin session..." />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: `${location.pathname}${location.search}${location.hash}` }}
      />
    );
  }

  return <Outlet />;
}

export default AdminProtectedRoute;
