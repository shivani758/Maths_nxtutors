import type { Request, Response } from "express";
import { createReview, deleteReview, getReviewById, listReviews, updateReview } from "../services/reviewService.js";
import { createReviewSchema, updateReviewSchema } from "../validators/reviewValidators.js";
import { sendOk } from "../utils/response.js";

export async function listReviewsController(_req: Request, res: Response) {
  return sendOk(res, await listReviews());
}

export async function getReviewController(req: Request, res: Response) {
  return sendOk(res, await getReviewById(String(req.params.id)));
}

export async function createReviewController(req: Request, res: Response) {
  const payload = createReviewSchema.parse(req.body);
  return sendOk(res, await createReview(payload), 201);
}

export async function updateReviewController(req: Request, res: Response) {
  const payload = updateReviewSchema.parse(req.body);
  return sendOk(res, await updateReview(String(req.params.id), payload));
}

export async function deleteReviewController(req: Request, res: Response) {
  return sendOk(res, await deleteReview(String(req.params.id)));
}
