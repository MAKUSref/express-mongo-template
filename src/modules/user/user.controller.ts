import { Request, Response } from "express";
import { userService } from "./user.service";
import { User } from "./user.model";
import { CustomRequest } from "@/utils/CustomRequest";



export async function createUser(req: CustomRequest<User>, res: Response) {
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

export * as userController from "./user.controller";
