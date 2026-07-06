import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register')
    .post(register);

router.route('/login')
    .post(login);

router.get('/me', verifyJWT, getMe);

export default router;