import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { superAdminServices } from "./superAdmin.service";

// * get all super admin
const getAllSuperAdmins = catchAsync(async (req: Request, res: Response) => {
  const result = await superAdminServices.getAllSuperAdmins();
  sendResponse(
    res,
    status.OK,
    true,
    "Super admins fetched successfully",
    result,
  );
});

// * get super admin by id
const getSuperAdminById = catchAsync(async (req: Request, res: Response) => {
  const result = await superAdminServices.getSuperAdminById(
    req.params.adminId as string,
  );
  sendResponse(
    res,
    status.OK,
    true,
    "Super admin fetched successfully",
    result,
  );
});

// * update  super by id
const updateSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await superAdminServices.updateSuperAdmin(
    req.params.adminId as string,
    payload,
  );
  sendResponse(res, status.OK, true, "Super admin update successfully", result);
});

// * soft delete super admin by id
const softDeleteSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await superAdminServices.softDeleteSuperAdmin(
    req.params.adminId as string,
  );
  sendResponse(
    res,
    status.OK,
    true,
    "Super admin deleted successfully",
    result,
  );
});

export const superAdminController = {
  getAllSuperAdmins,
  getSuperAdminById,
  updateSuperAdmin,
  softDeleteSuperAdmin,
};
