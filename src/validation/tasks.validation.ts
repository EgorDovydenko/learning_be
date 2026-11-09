import z from "zod";

export const taskIdParams = z.object({
  id: z.uuid(),
});

export const createTaskBody = z.object({
  title: z.string().trim().min(1).max(200),
});

export const updateTaskBody = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  done: z.boolean().optional(),
});

export const listTasksQuery = z.object({
  done: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  page: z.coerce.number().int().min(1).default(1),
});

export type TaskIdParamsType = z.infer<typeof taskIdParams>;
export type CreateTaskBodyType = z.infer<typeof createTaskBody>;
export type UpdateTaskBodyType = z.infer<typeof updateTaskBody>;
export type ListTasksQueryType = z.infer<typeof listTasksQuery>;
