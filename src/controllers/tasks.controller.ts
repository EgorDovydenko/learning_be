import type { Request, Response } from "express";
import * as tasksService from "../services/tasks.service";
import {
  CreateTaskBodyType,
  UpdateTaskBodyType,
} from "../validation/tasks.validation";

export async function getAllTasks(_req: Request, res: Response): Promise<void> {
  res.json(await tasksService.getAll());
}

export async function getTask(req: Request, res: Response): Promise<void> {
  const id = typeof req.params.id === "string" ? req.params.id : "";
  res.json(await tasksService.getById(id));
}

export async function createTask(_req: Request, res: Response): Promise<void> {
  const input = res.locals.body as CreateTaskBodyType;
  const task = await tasksService.create(input.title);
  res.status(201).json(task);
}

export async function updateTask(req: Request, res: Response): Promise<void> {
  const input = res.locals.body as UpdateTaskBodyType;

  const editableTask = {
    id: typeof req.params?.id === "string" ? req.params.id : "",
    title: input.title,
    done: input.done,
  };

  const task = await tasksService.update(editableTask);
  res.status(200).json(task);
}

export async function removeTask(req: Request, res: Response): Promise<void> {
  const id = typeof req.params.id === "string" ? req.params.id : "";

  await tasksService.remove(id);
  res.status(200).json({ message: "Successful removed" });
}
