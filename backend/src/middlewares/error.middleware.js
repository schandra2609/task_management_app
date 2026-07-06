import mongoose from "mongoose";
import { NODE_ENV } from "../config/env.config.js";
import HttpError from "../errors/http.error.js";
import {
    BadRequestError,
    ConflictError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError,
} from "../errors/handler.error.js";

const errorMiddleware = (err, req, res, next) => {
    void next, req;
    let error = err;

    // 🔹 Mongoose: Invalid ObjectId
    if (err instanceof mongoose.Error.CastError) {
        error = new NotFoundError("Resource not found");
    }

    // 🔹 Mongoose: Duplicate Key
    else if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        error = new ConflictError(`${field} already exists`);
    }

    // 🔹 Mongoose: Validation Error
    else if (err instanceof mongoose.Error.ValidationError) {
        const message = Object.values(err.errors)
            .map((val) => val.message)
            .join(", ");
        error = new BadRequestError(message);
    }

    // 🔹 JWT: Invalid JSON Web Token
    else if (err.name === 'JsonWebTokenError') {
        error = new UnauthorizedError("Invalid token");
    }

    // 🔹 JWT: Expired JSON Web Token
    else if (err.name === 'TokenExpiredError') {
        error = new UnauthorizedError("Token expired");
    }

    // 🔹 Unknown / System Error
    else if (!(err instanceof HttpError)) {
        console.error("💥 UNHANDLED SYSTEM ERROR:", err);
        error = new InternalServerError();
    }

    // 🔹 Hide stack trace in production
    error.stack = NODE_ENV === "development" ? error.stack : undefined;

    res.status(error.statusCode).json({
        success: false,
        message: error.message,
        stack: error.stack,
    });
};

export default errorMiddleware;