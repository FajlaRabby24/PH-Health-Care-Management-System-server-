import { Router } from "express";
import { adminRoutes } from "../modules/admin/admin.route";
import { AppointmentRoutes } from "../modules/appointment/appointment.route";
import { authRoutes } from "../modules/auth/auth.route";
import { doctorRoutes } from "../modules/doctor/doctor.route";
import { doctorScheduleRoutes } from "../modules/doctorSchedule/doctorSchedule.route";
import { scheduleRoutes } from "../modules/schedule/schedule.route";
import { specialtyRoutes } from "../modules/specialty/specialty.route";
import { superAdminRoutes } from "../modules/superAdmin/superAdmin.route";
import { userRoutes } from "../modules/user/user.route";

const router = Router();

router.use("/specialties", specialtyRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/doctors", doctorRoutes);
router.use("/admins", adminRoutes);
router.use("/schedules", scheduleRoutes);
router.use("/super-admins", superAdminRoutes);
router.use("/doctor-schedules", doctorScheduleRoutes);
router.use("/appointments", AppointmentRoutes);

export const indexRoutes = router;
