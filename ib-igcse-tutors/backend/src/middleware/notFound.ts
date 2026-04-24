import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

export function notFoundHandler(_req: Request, _res: Response, next: NextFunction) {
  next(new ApiError(404, "The requested endpoint was not found.", { code: "NOT_FOUND" }));
}
