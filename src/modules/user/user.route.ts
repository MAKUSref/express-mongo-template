import { router as userRouter } from "@/config/app.config";
import { userController } from "./user.controller";
import { errorHandler } from "@/excpetion/errorHandler";

userRouter.post("/", userController.createUser);

export { userRouter };