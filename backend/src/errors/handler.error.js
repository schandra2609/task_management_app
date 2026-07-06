import HttpError from "./http.error.js";

class BadRequestError extends HttpError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}

class UnauthorizedError extends HttpError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

class ForbiddenError extends HttpError {
    constructor(message = "Access Denied") {
        super(message, 403);
    }
}

class NotFoundError extends HttpError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}

class ConflictError extends HttpError {
    constructor(message = "Conflict") {
        super(message, 409);
    }
}

class TooManyRequestsError extends HttpError {
    constructor(message = "Too Many Requests") {
        super(message, 429);
    }
}

class InternalServerError extends HttpError {
    constructor(message = "Internal Server Error") {
        super(message, 500);
    }
}

export {
    BadRequestError,
    ConflictError,
    ForbiddenError,
    InternalServerError,
    NotFoundError,
    TooManyRequestsError,
    UnauthorizedError,
};
