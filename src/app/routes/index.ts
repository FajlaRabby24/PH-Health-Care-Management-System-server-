import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { doctorRoutes } from "../modules/doctor/doctor.route";
import { specialtyRoutes } from "../modules/specialty/specialty.route";
import { userRoutes } from "../modules/user/user.route";

const router = Router();

router.use("/specialties", specialtyRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/doctors", doctorRoutes);

export const indexRoutes = router;
