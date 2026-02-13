import { Router } from "express";
import { doctorController } from "./doctor.controller";

const router = Router();

router.get("/", doctorController.getAllDoctors);
router.get("/:doctorId", doctorController.getDoctorById);
router.patch("/:doctorId", doctorController.updateDoctor);
router.delete("/:doctorId", doctorController.deleteDoctor);

export const doctorRoutes = router;
