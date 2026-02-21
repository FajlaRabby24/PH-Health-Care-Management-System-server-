/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import status from "http-status";
import z from "zod";
import { deleteFileFromCloudinary } from "../config/cloudinary.config";
import { envVars } from "../config/env";
import AppError from "../errorHandlers/AppError";
import { handleZodError } from "../errorHandlers/handleZodError";
import { IErrorResponse, IErrorSources } from "../interfaces/error.interfaces";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (envVars.NODE_ENV === "development") {
    console.log("Error in global error handler", err);
  }

  // * delete image from cloudinary
  if (req.file) {
    await deleteFileFromCloudinary(req.file.path);
  }

  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    const imageUrls = req.files.map((file) => file.path);
    await Promise.all(imageUrls.map((url) => deleteFileFromCloudinary(url)));
  }

  const errorSources: IErrorSources[] = [];
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = "Internel Server Error";
  let stack: string | undefined = undefined;

  // zod error
  if (err instanceof z.ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode as number;
    message = simplifiedError.message;
    errorSources.push(...simplifiedError.errorSources!);
    stack = err.stack;
  }
  // custom AppError
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    stack = err.stack;
    errorSources.push({ path: "", message: err.message });
  }
  // javascript global error
  else if (err instanceof Error) {
    statusCode = status.INTERNAL_SERVER_ERROR;
    message = err.message;
    stack = err.stack;
    errorSources.push({ path: "", message: err.message });
  }

  const errorResponse: IErrorResponse = {
    success: false,
    message,
    errorSources,
    stack: envVars.NODE_ENV === "development" ? stack : undefined,
    error: envVars.NODE_ENV === "development" ? err : undefined,
  };

  res.status(statusCode).json(errorResponse);
};
