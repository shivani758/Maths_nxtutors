import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authenticateAdminCredentials } from "../services/adminAuthService";

const STORAGE_KEY = "maths-bodhi-auth";
const AuthContext = createContext(null);

function readSession() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);

  useEffect(() => {
    if (session) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
  }, [session]);

  const value = useMemo(
    () => ({
      session,
      isLoggedIn: Boolean(session),
      loginStudent: (profile) => setSession({ role: "student", profile, loggedInAt: Date.now() }),
      loginTutor: (profile) => setSession({ role: "tutor", profile, loggedInAt: Date.now() }),
      loginAdmin: ({ username, password }) => {
        const result = authenticateAdminCredentials({ username, password });

        if (result.success) {
          setSession({
            role: "admin",
            profile: result.profile,
            loggedInAt: Date.now(),
          });

          return { success: true };
        }

        return result;
      },
      logout: () => setSession(null),
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

