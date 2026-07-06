import { config } from "dotenv";

const env = process.env.NODE_ENV || "development";
const envFile = `.env.${env}`;
config({ path: envFile });

const {
    NODE_ENV,
    API_V, PORT = 5000,
    MONGO_URI,
    JWT_SECRET, JWT_EXPIRES_IN = "7d",
} = process.env;
const CORS_ORIGIN = (process.env.CORS_ORIGIN || "")
                    .split(',').map(origin => origin.trim())
                    .filter(origin => origin !== "");

console.log(`Environment: ${NODE_ENV} | Port: ${PORT} | API Version: ${API_V}`);

export {
    NODE_ENV,
    PORT, API_V,
    MONGO_URI,
    CORS_ORIGIN,
    JWT_SECRET, JWT_EXPIRES_IN,
};