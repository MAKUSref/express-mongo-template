import { NextFunction, Request, Response } from "express";
import AppError from ".";

export async function errorHandler(_req: Request, res: Response, next: NextFunction) {
  console.log("Error handler middleware");
  
  try {
    next();
  } catch (error: unknown) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        message: error.message,
        statusCode: error.statusCode,
        error: error.name
      });
      return;
    }

    res.status(500).json({
      message: "An error occurred while creating user",
      error
    })
    return;
  }
}