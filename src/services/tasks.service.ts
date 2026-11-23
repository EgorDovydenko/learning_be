import { AppError } from "../errors";
import * as taskModel from "../models/tasks.model";
import * as themeModel from "../models/themes.model";
import type { TaskModel, TasksPaginatedModel } from "../models/tasks.model";

export async function getAll(
  limit: number,
  page: number,
  done: boolean | undefined,
): Promise<TasksPaginatedModel> {
  return await taskModel.findAll(limit, page, done);
}

export async function getById(id: string): Promise<TaskModel> {
  const task = await taskModel.findById(id);

  if (!task) throw new AppError("not_found", "Task not found");

  return task;
}

export async function create(
  title: string,
  themesIds: string[],
): Promise<TaskModel> {
  const ids = [...new Set(themesIds ?? [])];

  if (ids.length > 0) {
    const existingIds = await themeModel.checkIds(ids);

    if (existingIds.length !== ids.length) {
      throw new AppError("not_found", "Theme not found");
    }
  }

  const task: TaskModel = {
    id: crypto.randomUUID(),
    title: title,
    done: false,
    themes: [],
  };

  return await taskModel.create(task, ids);
}

export async function update(
  task: Omit<TaskModel, "title" | "done"> &
    Partial<Pick<TaskModel, "title" | "done">>,
  themesIds: string[],
): Promise<TaskModel | null> {
  const checkedTask = await taskModel.findById(task.id);

  if (!checkedTask) throw new AppError("not_found", "Task not found");

  const ids = [...new Set(themesIds ?? [])];

  const editableTask = {
    id: task.id,
    title: task.title === undefined ? checkedTask.title : task.title,
    done: task.done === undefined ? checkedTask.done : task.done,
    themes: checkedTask.themes,
  };

  const updatedTask = await taskModel.update(editableTask);

  return updatedTask;
}

export async function remove(id: string): Promise<void> {
  const removableItem = await taskModel.findById(id);

  if (!removableItem) throw new AppError("not_found", "Task not found");

  await taskModel.remove(id);
}
