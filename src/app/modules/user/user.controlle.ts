import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { userServices } from "./user.service";

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await userServices.createDoctor(payload);
  sendResponse(
    res,
    status.CREATED,
    true,
    "Doctor registered successfully",
    result,
  );
});

// creat admin
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await userServices.createAdmin(payload);
  sendResponse(
    res,
    status.CREATED,
    true,
    "Admin registered successfully",
    result,
  );
});

export const userController = {
  createDoctor,
  createAdmin,
};
