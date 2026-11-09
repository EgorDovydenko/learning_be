import type { Request, Response } from "express";
import * as tasksService from "../services/tasks.service";
import {
  CreateTaskBodyType,
  TaskIdParamsType,
  UpdateTaskBodyType,
} from "../validation/tasks.validation";

export async function getAllTasks(_req: Request, res: Response): Promise<void> {
  res.json(await tasksService.getAll());
}

export async function getTask(_req: Request, res: Response): Promise<void> {
  const { id } = res.locals.params as TaskIdParamsType;
  res.json(await tasksService.getById(id));
}

export async function createTask(_req: Request, res: Response): Promise<void> {
  const { title } = res.locals.body as CreateTaskBodyType;
  const task = await tasksService.create(title);
  res.status(201).json(task);
}

export async function updateTask(_req: Request, res: Response): Promise<void> {
  const { title, done } = res.locals.body as UpdateTaskBodyType;
  const { id } = res.locals.params as TaskIdParamsType;

  const editableTask = {
    id: id,
    title: title,
    done: done,
  };

  const task = await tasksService.update(editableTask);
  res.status(200).json(task);
}

export async function removeTask(_req: Request, res: Response): Promise<void> {
  const { id } = res.locals.params as TaskIdParamsType;

  await tasksService.remove(id);
  res.status(200).json({ message: "Successful removed" });
}
