import { ApiClientError, apiRequest } from "./apiClient";

const EVENT_NAME = "maths-bodhi-admin-session-change";

let cachedSession = null;

// Legacy compatibility shim for the older site-wide AuthContext.
// Admin authentication must now go through the real backend API and /admin/login.
// Do not reintroduce frontend-only admin credentials here.
export function authenticateAdminCredentials() {
  return {
    success: false,
    message: "Admin login now uses the secure backend flow at /admin/login.",
  };
}

function hasBrowser() {
  return typeof window !== "undefined";
}

function emitSessionChange() {
  if (!hasBrowser()) {
    return;
  }

  window.dispatchEvent(new Event(EVENT_NAME));
}

function toSessionPayload(payload) {
  if (!payload?.authenticated || !payload.user) {
    return null;
  }

  return {
    role: payload.user.role,
    profile: payload.user,
    loggedInAt: Date.now(),
  };
}

export function getAdminSession() {
  return cachedSession;
}

export async function refreshAdminSession() {
  try {
    const payload = await apiRequest("/api/auth/session", {
      cache: "no-store",
    });
    cachedSession = toSessionPayload(payload);
    emitSessionChange();
    return cachedSession;
  } catch (error) {
    cachedSession = null;
    emitSessionChange();
    throw error;
  }
}

export async function loginAdminSession(credentials) {
  const payload = await apiRequest("/api/auth/login", {
    method: "POST",
    body: {
      email: credentials.email,
      password: credentials.password,
    },
  });
  cachedSession = toSessionPayload(payload);
  emitSessionChange();

  return {
    success: Boolean(cachedSession),
    session: cachedSession,
  };
}

export async function logoutAdminSession() {
  await apiRequest("/api/auth/logout", {
    method: "POST",
  });
  cachedSession = null;
  emitSessionChange();
}

export function subscribeAdminSession(listener) {
  if (!hasBrowser()) {
    return () => {};
  }

  const handleEvent = () => listener(getAdminSession());
  window.addEventListener(EVENT_NAME, handleEvent);

  return () => {
    window.removeEventListener(EVENT_NAME, handleEvent);
  };
}
