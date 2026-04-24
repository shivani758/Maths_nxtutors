import { Router } from "express";
import { getDashboardController } from "../../controllers/dashboardController.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const dashboardRoutes = Router();
dashboardRoutes.get("/", asyncHandler(getDashboardController));
export default dashboardRoutes;
//# sourceMappingURL=dashboardRoutes.js.map