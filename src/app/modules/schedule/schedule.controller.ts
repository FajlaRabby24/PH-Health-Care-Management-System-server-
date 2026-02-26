import { Request, Response } from "express";
import status from "http-status";
import { IQueryParams } from "../../interfaces/query.interface";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { scheduleService } from "./schedule.service";

// * create schedule
const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const schedule = await scheduleService.createSchedule(payload);
  sendResponse(
    res,
    status.CREATED,
    true,
    "Schedule created successfully",
    schedule,
  );
});

// * get all schedule
const getAllSchedules = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await scheduleService.getAllSchedules(query as IQueryParams);
  sendResponse(
    res,
    status.OK,
    true,
    "Schedules retrieved successfully",
    result.data,
    result.meta,
  );
});

// * get schedule by id
const getScheduleById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schedule = await scheduleService.getScheduleById(id as string);
  sendResponse(
    res,
    status.OK,
    true,
    "Schedule retrieved successfully",
    schedule,
  );
});

// * update schedule
const updateSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const updatedSchedule = await scheduleService.updateSchedule(
    id as string,
    payload,
  );
  sendResponse(
    res,
    status.OK,
    true,
    "Schedule updated successfully",
    updatedSchedule,
  );
});

// * delete schedule
const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await scheduleService.deleteSchedule(id as string);
  sendResponse(res, status.OK, true, "Schedule deleted successfully");
});

export const scheduleController = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
