import { NextFunction, Request, Response } from "express";
import AppError from ".";

export function errorHandler(fn: any) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await fn(req, res, next);
    } catch (err) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({
          message: err.message,
          statusCode: err.statusCode,
          error: err.name,
        });
        return;
      }

      res.status(500).json({
        message: "An error occurred while creating user",
        err,
      });
      return;
    }
  };
}
