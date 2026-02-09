/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, RequestHandler, Response } from "express";

export const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong!";
      res.status(500).json({
        success: false,
        message: "Failed to fetch",
        error: errorMessage,
      });
    }
  };
};
