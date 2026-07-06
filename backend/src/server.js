import express from "express";
import cors from "cors";
import { connectDB } from "./config/database.config.js";
import { API_V, CORS_ORIGIN, NODE_ENV, PORT } from "./config/env.config.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import taskRouter from "./routes/task.routes.js";

const app = express();

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (CORS_ORIGIN.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}));
app.use(express.json());

app.get(`/health`, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is active",
    });
});
app.use(`${API_V}/auth`, authRouter);
app.use(`${API_V}/tasks`, taskRouter);

app.use(errorMiddleware);

if (NODE_ENV !== "test") {
    const startServer = async () => {
        try {
            await connectDB();
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        } catch (err) {
            console.error("Failed to start server:", err);
            process.exit(1);
        }
    };

    startServer();
}

export default app;