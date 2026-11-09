import { Router } from "express";
import * as tasksController from "../controllers/tasks.controller";
import { validateBody } from "../middlewares/validate.middleware";
import { createTaskBody, updateTaskBody } from "../validation/tasks.validation";

export const tasksRouter = Router();

tasksRouter.get("/", tasksController.getAllTasks);
tasksRouter.get("/:id", tasksController.getTask);
tasksRouter.delete("/:id", tasksController.removeTask);
tasksRouter.post(
  "/",
  validateBody(createTaskBody, "Invalid body. Title > 0 and < 200 symbols"),
  tasksController.createTask,
);
tasksRouter.put(
  "/:id",
  validateBody(updateTaskBody),
  tasksController.updateTask,
);
