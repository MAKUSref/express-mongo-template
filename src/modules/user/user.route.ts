import { router as userRouter } from "@/config/app.config";
import { userController } from "./user.controller";
import { errorHandler } from "@/excpetion/errorHandler";
import { roleGuard } from "@/modules/auth/auth.service";
import { ROLE } from "./user.model";

userRouter.get("/", roleGuard([ROLE.ADMIN]), errorHandler(userController.getUserByEmail));
userRouter.get("/:userId", userController.getUserByEmail);
userRouter.post("/", roleGuard([ROLE.ADMIN]), userController.createUser);
userRouter.post("/delete/:userId", roleGuard([ROLE.ADMIN]), userController.deleteUser);
userRouter.post("/login", userController.loginUser);
userRouter.post(
  "/logout",
  roleGuard([ROLE.USER, ROLE.ADMIN]),
  userController.logoutUser
);

export { userRouter };
