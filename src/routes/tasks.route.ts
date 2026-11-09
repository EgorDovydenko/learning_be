import { Router } from "express";
import * as tasksController from "../controllers/tasks.controller";
import {
  validateBody,
  validateParams,
} from "../middlewares/validate.middleware";
import {
  createTaskBody,
  taskIdParams,
  updateTaskBody,
} from "../validation/tasks.validation";

export const tasksRouter = Router();

tasksRouter.get("/", tasksController.getAllTasks);
tasksRouter.get("/:id", validateParams(taskIdParams), tasksController.getTask);

tasksRouter.delete(
  "/:id",
  validateParams(taskIdParams),
  tasksController.removeTask,
);

tasksRouter.post(
  "/",
  validateBody(createTaskBody, "Invalid body. Title > 0 and < 200 symbols"),
  tasksController.createTask,
);

tasksRouter.patch(
  "/:id",
  validateParams(taskIdParams),
  validateBody(updateTaskBody),
  tasksController.updateTask,
);
