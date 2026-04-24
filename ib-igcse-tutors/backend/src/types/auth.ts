export const ADMIN_USER_ROLES = ["super_admin", "admin", "editor"] as const;
export const PORTAL_USER_ROLES = ["student", "tutor"] as const;
export const USER_ROLES = [...ADMIN_USER_ROLES, ...PORTAL_USER_ROLES] as const;

export type AdminUserRole = (typeof ADMIN_USER_ROLES)[number];
export type PortalUserRole = (typeof PORTAL_USER_ROLES)[number];
export type UserRole = (typeof USER_ROLES)[number];

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: AdminUserRole;
};

export type PortalSessionUser = {
  id: string;
  role: PortalUserRole;
};

declare module "express-session" {
  interface SessionData {
    user?: SessionUser;
    portalUser?: PortalSessionUser;
  }
}

declare global {
  namespace Express {
    interface Request {
      authUser?: SessionUser;
      portalAuthUser?: PortalSessionUser;
    }
  }
}
