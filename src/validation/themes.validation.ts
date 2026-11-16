import z from "zod";

export const themeIdParams = z.object({
  id: z.uuid(),
});

export const createThemeBody = z.object({
  title: z.string().trim().min(1).max(20),
});

export const updateThemeBody = z.object({
  title: z.string().trim().min(1).max(20),
});

export type ThemeIdParamsType = z.infer<typeof themeIdParams>;
export type CreateThemeBodyType = z.infer<typeof createThemeBody>;
export type UpdateThemeBodyType = z.infer<typeof updateThemeBody>;
