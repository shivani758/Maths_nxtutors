export function sendOk(res, data, statusCode = 200) {
    return res.status(statusCode).json({
        success: true,
        data,
    });
}
//# sourceMappingURL=response.js.map