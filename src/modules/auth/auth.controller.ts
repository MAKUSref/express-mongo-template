import { CustomRequest } from "@/utils/CustomRequest";
import { refreshUserToken } from "./auth.service";
import { Response } from "express";

export async function refreshAccessToken(req: CustomRequest<null>, res: Response) {
    const token = await refreshUserToken(req.params.refreshToken);
    res.json(token);
    return;
  }