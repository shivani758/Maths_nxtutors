import type { NextFunction, Request, Response } from "express";
import type { AdminUserRole, PortalUserRole } from "../types/auth.js";
import { ApiError } from "../utils/ApiError.js";

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  if (!req.session.user) {
    return next(new ApiError(401, "Authentication required.", { code: "AUTH_REQUIRED" }));
  }

  req.authUser = req.session.user;
  return next();
}

export function requireRole(roles: AdminUserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.session.user) {
      return next(new ApiError(401, "Authentication required.", { code: "AUTH_REQUIRED" }));
    }

    if (!roles.includes(req.session.user.role)) {
      return next(new ApiError(403, "You do not have permission to access this resource.", { code: "FORBIDDEN" }));
    }

    req.authUser = req.session.user;
    return next();
  };
}

export function requirePortalAuth(req: Request, _res: Response, next: NextFunction) {
  if (!req.session.portalUser) {
    return next(new ApiError(401, "Authentication required.", { code: "AUTH_REQUIRED" }));
  }

  req.portalAuthUser = req.session.portalUser;
  return next();
}

export function requirePortalRole(roles: PortalUserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.session.portalUser) {
      return next(new ApiError(401, "Authentication required.", { code: "AUTH_REQUIRED" }));
    }

    if (!roles.includes(req.session.portalUser.role)) {
      return next(new ApiError(403, "You do not have permission to access this resource.", { code: "FORBIDDEN" }));
    }

    req.portalAuthUser = req.session.portalUser;
    return next();
  };
}
