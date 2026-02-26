import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { doctorScheduleController } from "./doctorSchedule.controller";

const router = Router();

router.post(
  "/create-my-doctor-schedule",
  checkAuth(Role.DOCTOR),
  doctorScheduleController.createMyDoctorSchedule,
);

router.get(
  "/my-doctor-schedules",
  checkAuth(Role.DOCTOR),
  doctorScheduleController.getMyDoctorSchedules,
);

router.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  doctorScheduleController.getAllDoctorSchedules,
);

router.get(
  "/:doctorId/schedule/:scheduleId",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  doctorScheduleController.getDoctorScheduleById,
);

router.patch(
  "/update-my-doctor-schedule",
  checkAuth(Role.DOCTOR),
  doctorScheduleController.updateMyDoctorSchedule,
);

router.delete(
  "/delete-my-doctor-schedule/:id",
  checkAuth(Role.DOCTOR),
  doctorScheduleController.deleteMyDoctorSchedule,
);

export const doctorScheduleRoutes = router;
