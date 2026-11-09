import z from "zod";

export const createTaskBody = z.object({
  title: z.string().trim().min(1).max(200),
});

export const updateTaskBody = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  done: z.boolean().optional(),
});

export type CreateTaskBodyType = z.infer<typeof createTaskBody>;
export type UpdateTaskBodyType = z.infer<typeof updateTaskBody>;
