import AppError from "@/excpetion";
import User, { ROLE } from "./user.model";
import { HTTP_STATUS_CODE } from "@/excpetion/http";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";

import { config } from "@/config";
import {
  generateAccessToken,
  generateRefreshToken,
  getUserInfo,
} from "@/modules/auth/auth.service";
import { Request } from "express";
import Logger from "@/config/logger.config";

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

    if (await bcrypt.compare(data.password, user.password)) {
      const accesstoken = generateAccessToken(user);
      const refreshtoken = generateRefreshToken(user);

      user.refreshToken = [...user.refreshToken, refreshtoken];
      user.save();

      return { accesstoken, refreshtoken };
    } else {
      throw new Error("Login or password is incorrect");
    }
  } catch (error: unknown) {
    throw new AppError((error as Error).message, HTTP_STATUS_CODE.BAD_REQUEST);
  }
}

export async function logoutUser(req: Request) {
  const decodedToken = getUserInfo(req);
  if (!decodedToken)
    throw new AppError("You are not logged in", HTTP_STATUS_CODE.UNAUTHORIZED);

  const user = await User.findById(decodedToken._id);
  if (!user)
    throw new AppError("You are not logged in", HTTP_STATUS_CODE.UNAUTHORIZED);

  user.refreshToken = [];
  user.save();
}

export async function getUserById(userId: string | undefined) {
  if (!userId) {
    throw new AppError("User dose not exist", HTTP_STATUS_CODE.NOT_FOUND);
  }

  const user = await User.findOne({ _id: userId }, ["-password", "-__v"]);
  if (!user)
    throw new AppError("User dose not exist", HTTP_STATUS_CODE.NOT_FOUND);
  return user;
}

export async function deleteUser(userId: string | undefined) {
  if (!userId) {
    throw new AppError("User dose not exist", HTTP_STATUS_CODE.NOT_FOUND);
  }

  const user = await User.findByIdAndDelete(userId);
  if (!user)
    throw new AppError("User dose not exist", HTTP_STATUS_CODE.NOT_FOUND);
  return user;
}

export * as userService from "./user.service";
