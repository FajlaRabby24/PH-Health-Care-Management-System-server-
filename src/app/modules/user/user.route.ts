import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { userController } from "./user.controlle";
import { createDoctorZodSchema } from "./user.validation";

const router = Router();

router.post(
  "/create-doctor",
  validateRequest(createDoctorZodSchema),
  userController.createDoctor,
);
// router.post("/create-admin", userController.createDoctor);
// router.post("/create-superadmin", userController.createDoctor);

export const userRoutes = router;

// 12:45:00
