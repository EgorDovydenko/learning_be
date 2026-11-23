import { pool } from "../db/db";

export interface ThemeModel {
  id: string;
  title: string;
}

export async function findAll(): Promise<ThemeModel[]> {
  const { rows } = await pool.query<ThemeModel>("SELECT id, title FROM themes");

  return rows;
}

export async function findById(id: string): Promise<ThemeModel | null> {
  const { rows } = await pool.query<ThemeModel>(
    "SELECT id, title FROM themes WHERE id = $1",
    [id],
  );

  return rows[0] ?? null;
}

export async function findByTitle(title: string): Promise<ThemeModel | null> {
  const { rows } = await pool.query<ThemeModel>(
    "SELECT id, title FROM themes WHERE title = $1",
    [title],
  );

  return rows[0] ?? null;
}

export async function checkIds(ids: string[]): Promise<string[]> {
  const { rows } = await pool.query(
    "SELECT id FROM themes WHERE id = ANY($1::uuid[])",
    [ids],
  );
  console.log(rows);

  return rows ?? [];
}

export async function create(theme: ThemeModel): Promise<void> {
  await pool.query("INSERT INTO themes (id, title) VALUES ($1, $2)", [
    theme.id,
    theme.title,
  ]);
}

export async function update(theme: ThemeModel): Promise<ThemeModel | null> {
  const { rows } = await pool.query<ThemeModel>(
    "UPDATE themes SET title = $2 WHERE id = $1 RETURNING id, title",
    [theme.id, theme.title],
  );

  return rows[0] ?? null;
}

export async function remove(id: string): Promise<void> {
  await pool.query("DELETE FROM themes WHERE id = $1", [id]);
}
