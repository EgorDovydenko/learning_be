import express, { type Express } from "express";
import { tasksRouter } from "./routes/tasks.route";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";

export function createApp(): Express {
  const app = express();

  app.use(express.json({ limit: "64kb" }));

  app.get("/health-check", (_req, res) => {
    res.status(200).json({
      message: "All cool",
    });
  });
  app.use("/tasks", tasksRouter);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
