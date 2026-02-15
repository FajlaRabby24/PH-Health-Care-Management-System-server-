import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { doctorServices } from "./doctor.service";

// * get all doctors
const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorServices.getAllDoctors();
  sendResponse(res, status.OK, true, "Doctor fetched successfully", result);
});

// * get doctor by id
const getDoctorById = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorServices.getDoctorById(
    req.params.doctorId as string,
  );
  sendResponse(res, status.OK, true, "Doctor fetched successfully", result);
});

// * update doctory by id
const updateDoctor = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await doctorServices.updateDoctor(
    req.params.doctorId as string,
    payload,
  );
  sendResponse(res, status.OK, true, "Doctor update successfully", result);
});

// * soft delete doctor by id
const softDeleteDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorServices.softDeleteDoctor(
    req.params.doctorId as string,
  );
  sendResponse(res, status.OK, true, "Doctor deleted successfully", result);
});

export const doctorController = {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  softDeleteDoctor,
};
