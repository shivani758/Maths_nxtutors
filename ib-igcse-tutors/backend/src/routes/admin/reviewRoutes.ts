import { Router } from "express";
import {
  createReviewController,
  deleteReviewController,
  getReviewController,
  listReviewsController,
  updateReviewController,
} from "../../controllers/reviewController.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const reviewRoutes = Router();

reviewRoutes.get("/", asyncHandler(listReviewsController));
reviewRoutes.get("/:id", asyncHandler(getReviewController));
reviewRoutes.post("/", asyncHandler(createReviewController));
reviewRoutes.put("/:id", asyncHandler(updateReviewController));
reviewRoutes.delete("/:id", asyncHandler(deleteReviewController));

export default reviewRoutes;
