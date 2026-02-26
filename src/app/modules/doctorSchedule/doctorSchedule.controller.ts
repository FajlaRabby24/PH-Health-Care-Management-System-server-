import { Request, Response } from "express";
import status from "http-status";
import { IQueryParams } from "../../interfaces/query.interface";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { doctorScheduleService } from "./doctorSchedule.service";

// create
const createMyDoctorSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const doctorSchedule = await doctorScheduleService.createMyDoctorSchedule(
      user,
      payload,
    );
    sendResponse(
      res,
      status.CREATED,
      true,
      "Doctor schedule created successfully",
      doctorSchedule,
    );
  },
);

// get
const getMyDoctorSchedules = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const query = req.query;
  const result = await doctorScheduleService.getMyDoctorSchedules(
    user,
    query as IQueryParams,
  );
  sendResponse(
    res,
    status.OK,
    true,
    "Doctor schedules retrieved successfully",
    result.data,
    result.meta,
  );
});

// get
const getAllDoctorSchedules = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query;
    const result = await doctorScheduleService.getAllDoctorSchedules(
      query as IQueryParams,
    );
    sendResponse(
      res,
      status.OK,
      true,
      "All doctor schedules retrieved successfully",
      result.data,
      result.meta,
    );
  },
);

// get
const getDoctorScheduleById = catchAsync(
  async (req: Request, res: Response) => {
    const doctorId = req.params.doctorId;
    const scheduleId = req.params.scheduleId;
    const doctorSchedule = await doctorScheduleService.getDoctorScheduleById(
      doctorId as string,
      scheduleId as string,
    );
    sendResponse(
      res,
      status.OK,
      true,
      "Doctor schedule retrieved successfully",
      doctorSchedule,
    );
  },
);

// update
const updateMyDoctorSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const updatedDoctorSchedule =
      await doctorScheduleService.updateMyDoctorSchedule(user, payload);
    sendResponse(
      res,
      status.OK,
      true,
      "Doctor schedule updated successfully",
      updatedDoctorSchedule,
    );
  },
);

// delete
const deleteMyDoctorSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = req.user;
    await doctorScheduleService.deleteMyDoctorSchedule(id as string, user);
    sendResponse(res, status.OK, true, "Doctor schedule deleted successfully");
  },
);

export const doctorScheduleController = {
  createMyDoctorSchedule,
  getMyDoctorSchedules,
  getAllDoctorSchedules,
  getDoctorScheduleById,
  updateMyDoctorSchedule,
  deleteMyDoctorSchedule,
};
