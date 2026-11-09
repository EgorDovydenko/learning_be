import type { NextFunction, Request, Response } from "express";
import z from "zod";
import { AppError } from "../errors";

export function validateBody(schema: z.ZodType, errorMessage?: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      const zodErrorMessage = parsed.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ");

      next(new AppError("validation", errorMessage ?? zodErrorMessage));
      return;
    }

    res.locals.body = parsed.data;
    next();
  };
}
