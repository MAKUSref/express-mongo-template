import { Request, Response } from "express";
import { userService } from "./user.service";
import { UserShemaType } from "./user.model";
import { CustomRequest } from "@/utils/CustomRequest";



export async function createUser(req: CustomRequest<UserShemaType>, res: Response) {
  const { firstname, lastname, email, password } = req.body;
  const user = await userService.createUser({
    firstname,
    lastname,
    email,
    password,
  });
  res.json(user);
  return;
}

interface LoginParamsInterface {
  email: string,
  password: string,
}

export async function loginUser(req: CustomRequest<LoginParamsInterface>, res: Response) {
  const { email, password } = req.body;
  const tokens = await userService.loginUser({email, password})
  res.json(tokens);
  return;
}

export async function logoutUser(req: CustomRequest<null>, res: Response) {
  const user = await userService.logoutUser();
  res.json(user);
  return;
}

export * as userController from "./user.controller";
