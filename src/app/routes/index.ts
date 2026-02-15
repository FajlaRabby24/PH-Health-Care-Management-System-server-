import { Router } from "express";
import { adminRoutes } from "../modules/admin/admin.route";
import { authRoutes } from "../modules/auth/auth.route";
import { doctorRoutes } from "../modules/doctor/doctor.route";
import { specialtyRoutes } from "../modules/specialty/specialty.route";
import { superAdminRoutes } from "../modules/superAdmin/superAdmin.route";
import { userRoutes } from "../modules/user/user.route";

const router = Router();

router.use("/specialties", specialtyRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/doctors", doctorRoutes);
router.use("/admins", adminRoutes);
router.use("/super-admins", superAdminRoutes);

export const indexRoutes = router;
