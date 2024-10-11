import { router as userRouter } from "@/config/app.config";
import { userController } from "./user.controller";
import { errorHandler } from "@/excpetion/errorHandler";
import { roleGuard } from "@/utils/authUtils";
import { ROLE } from "./user.model";

userRouter.get("/", roleGuard([ROLE.ADMIN]), userController.getUserByEmail);
userRouter.post("/", roleGuard([ROLE.ADMIN]), userController.createUser);
userRouter.post("/delete", roleGuard([ROLE.ADMIN]), userController.deleteUser);
userRouter.post("/login", userController.loginUser);
userRouter.post(
  "/logout",
  roleGuard([ROLE.USER, ROLE.ADMIN]),
  userController.logoutUser
);

export { userRouter };
