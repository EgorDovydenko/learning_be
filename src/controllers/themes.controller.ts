import * as themesService from "../services/themes.service";

import { Request, Response } from "express";
import {
  ThemeIdParamsType,
  CreateThemeBodyType,
  UpdateThemeBodyType,
} from "../validation/themes.validation";

export async function getAllThemes(
  _req: Request,
  res: Response,
): Promise<void> {
  res.json(await themesService.getAll());
}

export async function getTheme(_req: Request, res: Response): Promise<void> {
  const { id } = res.locals.params as ThemeIdParamsType;
  res.json(await themesService.getById(id));
}

export async function createTheme(_req: Request, res: Response): Promise<void> {
  const { title } = res.locals.body as CreateThemeBodyType;
  const theme = await themesService.create(title);
  res.status(201).json(theme);
}

export async function updateTheme(_req: Request, res: Response): Promise<void> {
  const { id } = res.locals.params as ThemeIdParamsType;
  const { title } = res.locals.body as UpdateThemeBodyType;
  const theme = await themesService.update({ id, title });
  res.status(200).json(theme);
}

export async function removeTheme(_req: Request, res: Response): Promise<void> {
  const { id } = res.locals.params as ThemeIdParamsType;
  await themesService.remove(id);
  res.status(200).json({ message: "Successful removed" });
}
