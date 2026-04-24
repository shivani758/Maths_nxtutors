import { ApiError } from "../utils/ApiError.js";
export function notFoundHandler(_req, _res, next) {
    next(new ApiError(404, "The requested endpoint was not found.", { code: "NOT_FOUND" }));
}
//# sourceMappingURL=notFound.js.map