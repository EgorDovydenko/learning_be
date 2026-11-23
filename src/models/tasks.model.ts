import { pool } from "../db/db";

export interface TaskModel {
  id: string;
  title: string;
  done: boolean;
  themes: {
    id: string;
    title: string;
  }[];
}

export interface TasksPaginatedModel {
  items: TaskModel[];
  total: number;
  page: number;
  totalPages: number;
}

export async function findAll(
  limit: number,
  page: number,
  done: boolean | undefined,
): Promise<TasksPaginatedModel> {
  const offset = (page - 1) * limit;

  const totalQuery =
    done === undefined
      ? await pool.query<{ total: number }>(
          "SELECT COUNT(*)::INT as total FROM tasks",
        )
      : await pool.query<{ total: number }>(
          "SELECT COUNT(*)::INT as total FROM tasks WHERE done = $1",
          [done],
        );

  const itemsQuery =
    done === undefined
      ? await pool.query<TaskModel>(
          "SELECT id, title, done FROM tasks LIMIT $1 OFFSET $2",
          [limit, offset],
        )
      : await pool.query<TaskModel>(
          "SELECT id, title, done FROM tasks WHERE done = $3 LIMIT $1 OFFSET $2",
          [limit, offset, done],
        );

  const total = totalQuery.rows[0]?.total ?? 0;

  return {
    items: itemsQuery.rows,
    total: total,
    page: page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function findById(id: string): Promise<TaskModel | null> {
  const { rows } = await pool.query<TaskModel>(
    "SELECT id, title, done FROM tasks WHERE id = $1",
    [id],
  );

  return rows[0] ?? null;
}

export async function create(
  task: TaskModel,
  themeIds: string[],
): Promise<TaskModel> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      "INSERT INTO tasks (id, title, done) VALUES ($1, $2, $3)",
      [task.id, task.title, task.done],
    );

    if (themeIds.length > 0) {
      await client.query(
        `INSERT INTO task_themes (task_id, theme_id)
         SELECT $1, theme_id FROM unnest($2::uuid[]) AS themes(theme_id)`,
        [task.id, themeIds],
      );
    }

    const themes =
      themeIds.length === 0
        ? []
        : (
            await client.query<TaskModel["themes"][number]>(
              `SELECT id, title
               FROM themes
               WHERE id = ANY($1::uuid[])
               ORDER BY title`,
              [themeIds],
            )
          ).rows;

    await client.query("COMMIT");

    return {
      id: task.id,
      title: task.title,
      done: task.done,
      themes,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
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
