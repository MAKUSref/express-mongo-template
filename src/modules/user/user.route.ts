import { router as userRouter } from "@/config/app.config";
import { userController } from "./user.controller";

userRouter.post("/", userController.createUser);

export { userRouter };