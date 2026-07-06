import Task from "../models/task.model.js";
import { BadRequestError, NotFoundError } from "../errors/handler.error.js";

const createTask = async (req, res, next) => {
    try {
        const task = await Task.create({
            ...req.body,
            createdBy: req.user._id,
        });
        res.status(201).json({
            success: true,
            data: task,
        });
    } catch (error) { next(error); }
};

const getAllTasks = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 6,
            status,
            search,
            sortBy = 'createdAt',
            order = 'desc',
        } = req.query;

        // --- Build Filter ---
        const filter = { createdBy: req.user._id };

        if (status && status !== 'ALL') {
            const validStatuses = ['PENDING', 'IN-PROGRESS', 'COMPLETED'];
            if (!validStatuses.includes(status)) {
                throw new BadRequestError(`Invalid status: ${status}. Must be one of: ${validStatuses.join(', ')}`);
            }
            filter.status = status;
        }

        if (search && search.trim()) {
            filter.title = { $regex: search.trim(), $options: 'i' };
        }

        // --- Build Sort ---
        const validSortFields = ['createdAt', 'dueDate', 'title', 'status'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
        const sortOrder = order === 'asc' ? 1 : -1;
        const sort = { [sortField]: sortOrder };

        // --- Pagination ---
        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 6));
        const skip = (pageNum - 1) * limitNum;

        // --- Execute Query ---
        const [tasks, totalCount] = await Promise.all([
            Task.find(filter).sort(sort).skip(skip).limit(limitNum),
            Task.countDocuments(filter),
        ]);

        const totalPages = Math.ceil(totalCount / limitNum);

        res.status(200).json({
            success: true,
            data: tasks,
            pagination: {
                currentPage: pageNum,
                totalPages,
                totalCount,
                limit: limitNum,
                hasNextPage: pageNum < totalPages,
                hasPrevPage: pageNum > 1,
            },
        });
    } catch (error) { next(error); }
};

const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            createdBy: req.user._id,
        });

        if (!task) throw new NotFoundError("Task not found");

        res.status(200).json({
            success: true,
            data: task,
        });
    } catch (error) { next(error); }
};

const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) throw new NotFoundError("Task not found");

        res.status(200).json({
            success: true,
            data: task,
        });
    } catch (error) { next(error); }
};

const updateTaskStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const validStatuses = ['PENDING', 'IN-PROGRESS', 'COMPLETED'];

        if (!status || !validStatuses.includes(status)) {
            throw new BadRequestError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        }

        const task = await Task.findOne({
            _id: req.params.id,
            createdBy: req.user._id,
        });

        if (!task) throw new NotFoundError("Task not found");

        // --- Status Workflow Validation ---
        const allowedTransitions = {
            'PENDING': ['IN-PROGRESS', 'COMPLETED'],
            'IN-PROGRESS': ['PENDING', 'COMPLETED'],
            'COMPLETED': ['PENDING', 'IN-PROGRESS'],
        };

        if (!allowedTransitions[task.status].includes(status)) {
            throw new BadRequestError(
                `Cannot transition from ${task.status} to ${status}. Allowed: ${allowedTransitions[task.status].join(', ')}`
            );
        }

        task.status = status;
        await task.save();

        res.status(200).json({
            success: true,
            data: task,
        });
    } catch (error) { next(error); }
};

const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user._id,
        });

        if (!task) throw new NotFoundError("Task not found");

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) { next(error); }
};

export {
    createTask, getAllTasks, getTaskById, updateTask, updateTaskStatus, deleteTask
};