import { Request, Response } from "express";
import { userService } from "./user.service";

export async function createUser(req: Request, res: Response) {
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
