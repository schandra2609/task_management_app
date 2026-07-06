import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_EXPIRES_IN, JWT_SECRET, NODE_ENV } from "../config/env.config.js";
import User from "../models/user.model.js";
import { BadRequestError, ConflictError, UnauthorizedError } from "../errors/handler.error.js";

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
};

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!(name?.trim() && email?.trim() && password?.trim()))
            throw new BadRequestError("All fields are required");

        const existngUser = await User.findOne({ email });
        if(existngUser)
            throw new ConflictError("Email already registered");

        const saltRounds = NODE_ENV === "test" ? 4 : 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({ name, email, password: hashedPassword });
        const token = generateToken(user._id);
        const newUser = await User.findOne({ _id: user._id });
        res.status(201).json({
            success: true,
            data: { newUser, token },
            message: "User created",
        });
    } catch (error) { next(error); }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!(email?.trim() && password?.trim()))
            throw new BadRequestError("Email and password are required");

        const user = await User.findOne({ email }).select("+password");
        if(!user)
            throw new UnauthorizedError("Invalid credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            throw new UnauthorizedError("Invalid credentials");

        const token = generateToken(user._id);
        // Return user info (without password) along with token
        const userInfo = await User.findById(user._id);
        res.status(200).json({
            success: true,
            data: { user: userInfo, token },
            message: "Logged in",
        })
    } catch (error) { next(error); }
};

const getMe = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            data: req.user,
        });
    } catch (error) { next(error); }
};

export { register, login, getMe };