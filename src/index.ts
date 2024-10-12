import { config } from "./config";
import Logger from "@/config/logger.config";
import app from "@/config/app.config";
import { userRouter } from "./modules/user/user.route";
import { roleGuard } from "./modules/auth/auth.service";
import { ROLE } from "./modules/user/user.model";
import { authRouter } from "./modules/auth/auth.route";

app.use("/user", userRouter);
app.use("/auth", authRouter);

//@ts-ignore
app.get("/ping", roleGuard([ROLE.ADMIN, ROLE.USER]), (req, res) => {
  res.send("pong!!!");
});

app.listen(config.port, () => {
  Logger.info(`[server]: Server running on port ${config.port}`);
});
