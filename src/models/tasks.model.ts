import { pool } from "../db/db";

export type TaskModel = {
  id: string;
  title: string;
  done: boolean;
};

export async function findAll(): Promise<TaskModel[]> {
  const { rows } = await pool.query<TaskModel>(
    "SELECT id, title, done FROM tasks",
  );

  return rows;
}

export async function findById(id: string): Promise<TaskModel | null> {
  const { rows } = await pool.query<TaskModel>(
    "SELECT id, title, done FROM tasks WHERE id = $1",
    [id],
  );

  return rows[0] ?? null;
}

export async function create(task: TaskModel): Promise<void> {
  await pool.query("INSERT INTO tasks (id, title, done) VALUES ($1, $2, $3)", [
    task.id,
    task.title,
    task.done,
  ]);
}

export async function update(task: TaskModel): Promise<TaskModel | null> {
  const { rows } = await pool.query<TaskModel>(
    "UPDATE tasks SET title = $2, done = $3 WHERE id = $1 RETURNING id, title, done",
    [task.id, task.title, task.done],
  );

  return rows[0] ?? null;
}

export async function remove(id: string): Promise<void> {
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
}
