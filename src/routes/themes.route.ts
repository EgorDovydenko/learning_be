import { Router } from "express";
import * as themesController from "../controllers/themes.controller";
import {
  validateBody,
  validateParams,
} from "../middlewares/validate.middleware";
import {
  themeIdParams,
  createThemeBody,
  updateThemeBody,
} from "../validation/themes.validation";
import { taskIdParams } from "../validation/tasks.validation";

export const themesRouter = Router();

themesRouter.get("/", themesController.getAllThemes);

themesRouter.get(
  "/:id",
  validateParams(themeIdParams),
  themesController.getTheme,
);

themesRouter.post(
  "/",
  validateBody(createThemeBody),
  themesController.createTheme,
);

themesRouter.patch(
  "/:id",
  validateParams(taskIdParams),
  validateBody(updateThemeBody),
  themesController.updateTheme,
);

themesRouter.delete(
  "/:id",
  validateParams(themeIdParams),
  themesController.removeTheme,
);
