export class AppError extends Error {
    constructor(message, statusCode = 500, errorCode = 'INTERNAL_ERROR', details) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.details = details;
        this.isOperational = true; // distinguishes expected errors from bugs
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends AppError {
    constructor(message = 'Bad request', details = null) {
        super(message, 400, 'BAD_REQUEST', details);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
        super(message, 401, 'UNAUTHORIZED');
    }
}

export class ForbiddenError extends AppError {
    constructor(message = 'Forbidden') {
        super(message, 403, 'FORBIDDEN');
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, 404, 'NOT_FOUND');
    }
}

export class ConflictError extends AppError {
    constructor(message = 'Conflict', details = null) {
        super(message, 409, 'CONFLICT', details);
    }
}

export class ValidationError extends AppError {
    constructor(message = 'Validation failed', details = null) {
        super(message, 422, 'VALIDATION_ERROR', details);
    }
}