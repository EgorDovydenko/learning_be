import { Router } from "express";
import * as tasksController from "../controllers/tasks.controller";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../middlewares/validate.middleware";
import {
  createTaskBody,
  listTasksQuery,
  taskIdParams,
  updateTaskBody,
} from "../validation/tasks.validation";

export const tasksRouter = Router();

tasksRouter.get(
  "/",
  validateQuery(listTasksQuery),
  tasksController.getAllTasks,
);

tasksRouter.get("/:id", validateParams(taskIdParams), tasksController.getTask);

tasksRouter.post("/", validateBody(createTaskBody), tasksController.createTask);

tasksRouter.patch(
  "/:id",
  validateParams(taskIdParams),
  validateBody(updateTaskBody),
  tasksController.updateTask,
);

tasksRouter.delete(
  "/:id",
  validateParams(taskIdParams),
  tasksController.removeTask,
);
