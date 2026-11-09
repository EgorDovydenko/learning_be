import { createApp } from "./app";

const port = Number(process.env.PORT) || 4300;

createApp().listen(port, () => {
  console.log("Server started");
});
