import { createApp } from "./app";
import { env } from "./config/env";

createApp().listen(env.PORT, () => {
  console.log("Server started");
});
