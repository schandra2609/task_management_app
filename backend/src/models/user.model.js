import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required"],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, "User email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    password: {
        type: String,
        required: [true, "User password is required"],
        minLength: 8,
        select: false,
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;