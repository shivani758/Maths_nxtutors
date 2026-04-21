const DEV_ADMIN_USERNAME =
  import.meta.env.VITE_DEV_ADMIN_USERNAME || "shivanibansal";
const DEV_ADMIN_PASSWORD =
  import.meta.env.VITE_DEV_ADMIN_PASSWORD || "shivani";

// Development-only admin authentication.
// Replace this with secure backend authentication (JWT/session) before production.
export function authenticateAdminCredentials({ username, password }) {
  const normalizedUsername = String(username ?? "").trim().toLowerCase();

  if (
    normalizedUsername === DEV_ADMIN_USERNAME.toLowerCase() &&
    String(password ?? "") === DEV_ADMIN_PASSWORD
  ) {
    return {
      success: true,
      profile: {
        name: "Maths Bodhi Admin",
        username: DEV_ADMIN_USERNAME,
      },
    };
  }

  return {
    success: false,
    error: "Invalid username or password.",
  };
}
