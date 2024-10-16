import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "@/config";
import User, { ROLE, UserShemaType } from "@/modules/user/user.model";
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

export const refreshUserToken = async (refreshToken: string) => {
  jwt.verify(refreshToken, config.tokenSecret, async function (err, decoded) {
    if (err) {
      throw new AppError("Invalid token", HTTP_STATUS_CODE.UNAUTHORIZED);
    }

    const user = await User.findById((decoded as JwtPayload)?._id)

    if (!user) {
      throw new AppError("User dose not exist", HTTP_STATUS_CODE.NOT_FOUND);
    }

    return generateAccessToken(user);


  });
}

export const roleGuard = (roles: ROLE[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.slice(7);

    if (!token) {
      res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
        message: "You need to log in first",
      });
      return;
    }
    jwt.verify(token, config.tokenSecret, function (err, decoded) {
      if (err) {
        res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
          message: "Invalid token",
        });
        return;
      }
      if (
        roles.some((item) => (decoded as UserShemaType)?.roles.includes(item))
      ) {
        next();
      } else {
        res.status(HTTP_STATUS_CODE.FORBIDDEN).send({
          message: "Access denied",
        });
        return;
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
