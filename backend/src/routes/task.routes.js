import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTask, getAllTasks, getTaskById, updateTask, updateTaskStatus, deleteTask } from "../controllers/task.controller.js";

const router = Router();

router.use(verifyJWT)
router.route('/')
    .post(createTask)
    .get(getAllTasks);

router.route('/:id')
    .get(getTaskById)
    .patch(updateTask)
    .delete(deleteTask);

router.patch('/:id/status', updateTaskStatus);

export default router;