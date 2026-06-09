"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const globalErrorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        statusCode,
        message: error.message || "Something went wrong",
    });
};
exports.globalErrorHandler = globalErrorHandler;
