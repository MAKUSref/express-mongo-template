import { config } from "./config";
import Logger from "@/config/logger.config";
import app from "@/config/app.config";
import { userRouter } from "./modules/user/user.route";
import { roleGuard } from "./utils/authUtils";
import { ROLE } from "./modules/user/user.model";

app.use("/user", userRouter);

//@ts-ignore
app.get("/ping", roleGuard([ROLE.ADMIN, ROLE.USER]), (req, res) => {
  res.send("pong!!!");
});

app.listen(config.port, () => {
  Logger.info(`[server]: Server running on port ${config.port}`);
});
