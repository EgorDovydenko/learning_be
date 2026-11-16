import { AppError } from "../errors";
import * as themeModel from "../models/themes.model";
import type { ThemeModel } from "../models/themes.model";

export async function getAll(): Promise<ThemeModel[]> {
  return await themeModel.findAll();
}

export async function getById(id: string): Promise<ThemeModel | null> {
  const theme = await themeModel.findById(id);

  if (!theme) throw new AppError("not_found", "Theme not found");

  return theme;
}

export async function create(title: string): Promise<ThemeModel> {
  const theme: ThemeModel = {
    id: crypto.randomUUID(),
    title: title,
  };

  await themeModel.create(theme);

  return theme;
}

export async function update(theme: ThemeModel): Promise<ThemeModel | null> {
  const checkedTheme = await themeModel.findById(theme.id);

  if (!checkedTheme) throw new AppError("not_found", "Theme not found");

  const updatedTheme = await themeModel.update(theme);

  return updatedTheme;
}

export async function remove(id: string): Promise<void> {
  const removableTheme = await themeModel.findById(id);

  if (!removableTheme) throw new AppError("not_found", "Theme not found");

  await themeModel.remove(id);
}
