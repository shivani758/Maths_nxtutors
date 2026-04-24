import { AdminAuthProvider } from "./providers/AdminAuthContext";
import { AdminToastProvider } from "./providers/AdminToastContext";

function AdminProviders({ children }) {
  return (
    <AdminAuthProvider>
      <AdminToastProvider>{children}</AdminToastProvider>
    </AdminAuthProvider>
  );
}

export default AdminProviders;
