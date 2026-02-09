import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { specialtyRoutes } from "../modules/specialty/specialty.route";

const router = Router();

router.use("/specialties", specialtyRoutes);
router.use("/auth", authRoutes);

export const indexRoutes = router;
