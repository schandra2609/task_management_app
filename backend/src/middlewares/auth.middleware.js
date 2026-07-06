import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config.js";
import User from "../models/user.model.js";
import { NotFoundError, UnauthorizedError } from "../errors/handler.error.js";


const verifyJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer "))
            throw new UnauthorizedError("Invalid token provided");
        
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user)
            throw new NotFoundError("User doesn't exist");

        req.user = user;
        next();
    } catch (error) { next(error); }
};

export { verifyJWT };