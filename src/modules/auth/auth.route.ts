import { router as authRouter } from "@/config/app.config";
import { refreshAccessToken } from "./auth.controller";


authRouter.get("/:userId", refreshAccessToken);

export { authRouter };
