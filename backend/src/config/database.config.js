import mongoose from "mongoose";
import { MONGO_URI } from "./env.config.js";


export const connectDB = async () => {
    try {
        if(!MONGO_URI) throw new Error("No MongoDB URI found.");
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to database');
        console.log(error);
        process.exit(1);
    }
};