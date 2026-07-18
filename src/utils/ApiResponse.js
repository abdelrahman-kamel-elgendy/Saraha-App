export default class ApiResponse {
    static success(res, { statusCode = 200, message = 'Success', data = null, meta = null }) {
        const body = {
            success: true,
            message,
            ...(data ? { data } : {}),
        };
        if (meta) body.meta = meta;
        return res.status(statusCode).json(body);
    }

    static error(res, { statusCode = 500, errorCode = 'INTERNAL_ERROR', message = 'Something went wrong', details = null }) {
        const body = {
            success: false,
            error: {
                code: errorCode,
                message,
                ...(details ? { details } : {}),
            },
        };
        return res.status(statusCode).json(body);
    }
}