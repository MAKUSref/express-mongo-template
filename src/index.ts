import { config } from "./config";
import Logger from "@/config/logger.config";
import app from "@/config/app.config";
import { userRouter } from "./modules/user/user.route";

app.use("/user", userRouter);

app.get("/ping", (req, res) => {
  res.send("pong!!!");
});

app.listen(config.port, () => {
  Logger.info(`[server]: Server running on port ${config.port}`);
});
