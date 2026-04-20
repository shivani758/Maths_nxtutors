import { createContext, useContext, useEffect, useMemo, useState } from "react";

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
      loginAdmin: ({ loginId, password }) => {
        const adminId = import.meta.env.VITE_ADMIN_ID || "admin@mathsbodhi.com";
        const adminPassword =
          import.meta.env.VITE_ADMIN_PASSWORD || "MathsBodhi@2026";

        if (loginId === adminId && password === adminPassword) {
          setSession({
            role: "admin",
            profile: {
              name: "Maths Bodhi Admin",
              loginId,
            },
            loggedInAt: Date.now(),
          });

          return { success: true };
        }

        return {
          success: false,
          error:
            "Invalid admin login. Update VITE_ADMIN_ID and VITE_ADMIN_PASSWORD before deployment if you want custom credentials.",
        };
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

