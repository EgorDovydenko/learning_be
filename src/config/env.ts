import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(4300),
  DATABASE_URL: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  for (const issue of parsed.error.issues) {
    console.error(`${issue.path.join(".")}: ${issue.message}`);
  }

  process.exit(1);
}

export const env = parsed.data;
