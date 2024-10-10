import AppError from "@/excpetion";
import User from "./user.model";
import { HTTP_STAUS_CODE } from "@/excpetion/http";

export async function createUser(data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}) {
  try {
    const user = await User.create({ ...data });
    return user;
  } catch (error: unknown) {
    throw new AppError((error as Error).message, HTTP_STAUS_CODE.BAD_REQUEST);
  }
}

export * as userService from "./user.service";
