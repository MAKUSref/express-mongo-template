import { router as userRouter } from "@/config/app.config";
import { userController } from "./user.controller";
import { errorHandler } from "@/excpetion/errorHandler";

userRouter.post("/", userController.createUser);
userRouter.post("/login", userController.loginUser);

export { userRouter };