import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { specialtyService } from "./spacialty.service";

// * create specialty
const createSpecialty = catchAsync(async (req: Request, res: Response) => {
  const payload = {
    ...req.body,
    icon: req.file?.path,
  };
  const result = await specialtyService.createSpecialty(payload);
  sendResponse(res, 201, true, "Specialty created successfully", result);
});

// * get all specialty
const getAllSpecialties = catchAsync(async (req: Request, res: Response) => {
  const result = await specialtyService.getAllSpecialties();
  sendResponse(res, 200, true, "Specialties fetched successfully", result);
});

// * delete specialty
const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await specialtyService.deleteSpecialty(id as string);
  sendResponse(res, 200, true, "Specialty deleted successfully", result);
});

export const specialtyController = {
  createSpecialty,
  getAllSpecialties,
  deleteSpecialty,
};
