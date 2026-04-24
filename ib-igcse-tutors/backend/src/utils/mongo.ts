import { Types } from "mongoose";
import { ApiError } from "./ApiError.js";

export function toObjectIdOrNull(value?: string | null) {
  if (!value) {
    return null;
  }

  if (!Types.ObjectId.isValid(value)) {
    throw new ApiError(400, "Invalid related identifier provided.", { code: "INVALID_OBJECT_ID" });
  }

  return new Types.ObjectId(value);
}
