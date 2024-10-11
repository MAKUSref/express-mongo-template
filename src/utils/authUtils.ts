import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";
import { config } from "@/config";
import { ROLE, UserShemaType } from "@/modules/user/user.model";
import AppError from "@/excpetion";
import { HTTP_STATUS_CODE } from "@/excpetion/http";
import { Document, Types } from "mongoose";

export const generateAccessToken = (
  user: Document<unknown, {}, UserShemaType> &
    UserShemaType & {
      _id: Types.ObjectId;
    }
) =>
  jwt.sign(
    { _id: user._id, email: user.email, roles: user.roles },
    config.tokenSecret,
    {
      expiresIn: config.accessTokenExpireTime,
    }
  );

export const generateRefreshToken = (
  user: Document<unknown, {}, UserShemaType> &
    UserShemaType & {
      _id: Types.ObjectId;
    }
) =>
  jwt.sign({ _id: user._id }, config.tokenSecret, {
    expiresIn: config.refreshTokenExpireTime,
  });

export const roleGuard = (roles: ROLE[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.slice(7);

    if (!token) {
      throw new AppError(
        "You need to log in first",
        HTTP_STATUS_CODE.UNAUTHORIZED
      );
    }
    jwt.verify(token, config.tokenSecret, function (err, decoded) {
      if (err) {
        throw new AppError("Invalid token", HTTP_STATUS_CODE.UNAUTHORIZED);
      }
      if (
        roles.some((item) => (decoded as UserShemaType)?.roles.includes(item))
      ) {
        next();
      } else {
        throw new AppError("Access denied", HTTP_STATUS_CODE.FORBIDDEN);
      }
    });
  };
};

export const getUserInfo = (req: Request) => {
  const token = req.headers.authorization?.slice(7);
  
  if (!token) {
    return null;
  }
  return jwt.verify(token, config.tokenSecret) as JwtPayload;
};
