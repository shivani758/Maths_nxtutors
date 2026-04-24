import { Router } from "express";
import { getPublicBootstrapController } from "../controllers/publicController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const publicRoutes = Router();

publicRoutes.get("/bootstrap", asyncHandler(getPublicBootstrapController));

export default publicRoutes;
