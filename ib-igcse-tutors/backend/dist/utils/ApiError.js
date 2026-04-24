export class ApiError extends Error {
    statusCode;
    code;
    details;
    constructor(statusCode, message, options = {}) {
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
        this.code = options.code;
        this.details = options.details;
    }
}
//# sourceMappingURL=ApiError.js.map