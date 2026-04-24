import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";
import {
  mongooseValidationErrorToDetails,
  zodErrorToDetails,
} from "../utils/validationDetails.js";

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
        code: error.code,
        details: error.details,
      },
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        message: "Validation failed.",
        code: "VALIDATION_ERROR",
        details: zodErrorToDetails(error),
      },
    });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      success: false,
      error: {
        message: "Validation failed.",
        code: "MONGOOSE_VALIDATION_ERROR",
        details: mongooseValidationErrorToDetails(error),
      },
    });
  }

  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      success: false,
      error: {
        message: "Invalid identifier provided.",
        code: "INVALID_ID",
      },
    });
  }

  const fallbackMessage = error instanceof Error ? error.message : "Unexpected server error.";

  return res.status(500).json({
    success: false,
    error: {
      message: fallbackMessage,
      code: "INTERNAL_SERVER_ERROR",
    },
  });
}
