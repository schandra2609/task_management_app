import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Task title is required"],
        trim: true,
        minLength: 3,
        maxLength: 100,
    },
    description: {
        type: String,
        trim: true,
        maxLength: 500,
    },
    status: {
        type: String,
        enum: ["PENDING", "IN-PROGRESS", "COMPLETED"],
        default: "PENDING",
    },
    dueDate: {
        type: Date,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;