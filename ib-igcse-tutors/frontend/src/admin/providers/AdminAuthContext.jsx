import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getAdminSession,
  refreshAdminSession,
  loginAdminSession,
  logoutAdminSession,
  subscribeAdminSession,
} from "../../services/adminAuthService";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(getAdminSession);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    let mounted = true;
    const unsubscribe = subscribeAdminSession(setSession);

    refreshAdminSession()
      .catch(() => {
        if (mounted) {
          setSession(null);
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoadingAuth(false);
        }
      });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      isLoadingAuth,
      login: async (credentials) => {
        const result = await loginAdminSession(credentials);
        setSession(result.session ?? null);
        return result;
      },
      logout: async () => {
        await logoutAdminSession();
        setSession(null);
      },
    }),
    [isLoadingAuth, session],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  }

  return context;
}
