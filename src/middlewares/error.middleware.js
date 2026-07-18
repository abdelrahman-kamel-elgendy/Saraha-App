import { AppError } from '../utils/AppError.js';
import ApiResponse from '../utils/ApiResponse.js';

// 404 handler — must be registered AFTER all routes
export const notFoundHandler = (req, res, next) => {
    ApiResponse.error(res, {
        statusCode: 404,
        errorCode: 'ROUTE_NOT_FOUND',
        message: `Cannot ${req.method} ${req.originalUrl}`,
    });
};

// Global error handler — must be registered LAST, with 4 args
export const globalErrorHandler = (err, req, res, next) => {
    // Known/operational errors
    if (err instanceof AppError) {
        return ApiResponse.error(res, {
            statusCode: err.statusCode,
            errorCode: err.errorCode,
            message: err.message,
            details: err.details,
        });
    }

    // Common library errors — map them explicitly
    if (err.name === 'ValidationError') { // e.g. mongoose
        return ApiResponse.error(res, {
            statusCode: 422,
            errorCode: 'VALIDATION_ERROR',
            message: 'Validation failed',
            details: err.errors,
        });
    }

    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        return ApiResponse.error(res, {
            statusCode: 401,
            errorCode: 'INVALID_TOKEN',
            message: 'Invalid or expired token',
        });
    }

    if (err.type === 'entity.parse.failed') { // malformed JSON body
        return ApiResponse.error(res, {
            statusCode: 400,
            errorCode: 'INVALID_JSON',
            message: 'Malformed JSON in request body',
        });
    }

    // Unknown/unexpected error — log full detail, hide internals from client
    console.error('UNEXPECTED ERROR:', {
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
    });

    return ApiResponse.error(res, {
        statusCode: 500,
        errorCode: 'INTERNAL_ERROR',
        message: process.env.NODE_ENV === 'production'
            ? 'An unexpected error occurred'
            : err.message,
        details: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};