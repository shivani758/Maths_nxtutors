import { ApiError } from "../utils/ApiError.js";
export function requireAuth(req, _res, next) {
    if (!req.session.user) {
        return next(new ApiError(401, "Authentication required.", { code: "AUTH_REQUIRED" }));
    }
    req.authUser = req.session.user;
    return next();
}
export function requireRole(roles) {
    return (req, _res, next) => {
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
export function requirePortalAuth(req, _res, next) {
    if (!req.session.portalUser) {
        return next(new ApiError(401, "Authentication required.", { code: "AUTH_REQUIRED" }));
    }
    req.portalAuthUser = req.session.portalUser;
    return next();
}
export function requirePortalRole(roles) {
    return (req, _res, next) => {
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
//# sourceMappingURL=accessControl.js.map