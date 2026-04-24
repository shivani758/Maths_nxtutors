import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { loginController, logoutController, sessionController } from "../controllers/authController.js";
const authRoutes = Router();
authRoutes.post("/login", asyncHandler(loginController));
authRoutes.post("/logout", asyncHandler(logoutController));
authRoutes.get("/session", asyncHandler(sessionController));
export default authRoutes;
//# sourceMappingURL=authRoutes.js.map