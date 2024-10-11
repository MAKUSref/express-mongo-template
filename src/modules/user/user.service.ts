import AppError from "@/excpetion";
import User, { ROLE, UserShemaType } from "./user.model";
import { HTTP_STATUS_CODE } from "@/excpetion/http";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";

import { config } from "@/config";
import { generateAccessToken, generateRefreshToken } from "@/utils/authUtils";
export async function createUser(data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}) {
  try {
    const hashedPassword = await bcrypt.hash(
      data.password,
      config.bcryptSaltRounds
    );
    const user = new User({
      ...data,
      password: hashedPassword,
      roles: [ROLE.ADMIN],
    });

    const accesstoken = generateAccessToken(user);
    const refreshtoken = generateRefreshToken(user);

    user.refreshToken = [refreshtoken];

    await user.save();
    return { accesstoken, refreshtoken };
  } catch (error: unknown) {
    throw new AppError((error as Error).message, HTTP_STATUS_CODE.BAD_REQUEST);
  }
}

export async function loginUser(data: { email: string; password: string }) {
  try {
    const user = await User.findOne({ email: data.email });

    if (!user) {
      throw new Error("Login or password is incorrect");
    }

    console.log(data.password, user);

    if (await bcrypt.compare(data.password, user.password)) {
      const accesstoken = generateAccessToken(user);
      const refreshtoken = generateRefreshToken(user);

      return { accesstoken, refreshtoken };
    } else {
      throw new Error("Login or password is incorrect");
    }
  } catch (error: unknown) {
    throw new AppError((error as Error).message, HTTP_STATUS_CODE.BAD_REQUEST);
  }
}

export async function logoutUser() {}

export async function logOutUser(data: { email: string }) {}

export * as userService from "./user.service";
