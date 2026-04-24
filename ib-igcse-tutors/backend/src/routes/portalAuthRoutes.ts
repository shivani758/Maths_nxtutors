import { Router } from "express";
import { requirePortalAuth } from "../auth/accessControl.js";
import {
  portalLoginController,
  portalLogoutController,
  portalProfileUpdateController,
  portalResendVerificationController,
  portalSessionController,
  portalSignupController,
  portalVerifyEmailController,
} from "../controllers/portalAuthController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const portalAuthRoutes = Router();

portalAuthRoutes.post("/signup", asyncHandler(portalSignupController));
portalAuthRoutes.post("/login", asyncHandler(portalLoginController));
portalAuthRoutes.post("/logout", asyncHandler(portalLogoutController));
portalAuthRoutes.get("/session", asyncHandler(portalSessionController));
portalAuthRoutes.put("/profile", requirePortalAuth, asyncHandler(portalProfileUpdateController));
portalAuthRoutes.post(
  "/resend-verification",
  requirePortalAuth,
  asyncHandler(portalResendVerificationController),
);
portalAuthRoutes.post("/verify-email", asyncHandler(portalVerifyEmailController));

export default portalAuthRoutes;
