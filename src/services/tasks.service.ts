import { AppError } from "../errors";
import * as taskModel from "../models/tasks.model";
import { type TaskModel } from "../models/tasks.model";

export async function getAll(): Promise<TaskModel[]> {
  return await taskModel.findAll();
}

export async function getById(id: string): Promise<TaskModel> {
  const task = await taskModel.findById(id);

  if (!task) throw new AppError("not_found", "Task not found");

  return task;
}

export async function create(title: string): Promise<TaskModel> {
  const task: TaskModel = {
    id: crypto.randomUUID(),
    title: title,
    done: false,
  };

  await taskModel.create(task);

  return task;
}

export async function update(
  task: Omit<TaskModel, "title" | "done"> &
    Partial<Pick<TaskModel, "title" | "done">>,
): Promise<TaskModel | null> {
  const checkedTask = await taskModel.findById(task.id);

  if (!checkedTask) throw new AppError("not_found", "Task not found");

  const editableTask = {
    id: task.id,
    title: task.title === undefined ? checkedTask.title : task.title,
    done: task.done === undefined ? checkedTask.done : task.done,
  };

  const updatedTask = await taskModel.update(editableTask);

  return updatedTask;
}

export async function remove(id: string): Promise<void> {
  const removableItem = await taskModel.findById(id);

  if (!removableItem) throw new AppError("not_found", "Task not found");

  await taskModel.remove(id);
}
