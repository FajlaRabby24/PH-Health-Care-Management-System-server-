import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { doctorController } from "./doctor.controller";
import { DoctorValidation } from "./doctor.validation";

const router = Router();

router.get(
  "/",
  // checkAuth(Role.ADMIN, Role.DOCTOR, Role.SUPER_ADMIN),
  doctorController.getAllDoctors,
);

router.get(
  "/:doctorId",
  checkAuth(Role.ADMIN, Role.DOCTOR, Role.SUPER_ADMIN),
  doctorController.getDoctorById,
);

router.patch(
  "/:doctorId",
  checkAuth(Role.ADMIN, Role.DOCTOR, Role.SUPER_ADMIN),
  validateRequest(DoctorValidation.updateDoctorValidationSchema),
  doctorController.updateDoctor,
);

router.delete(
  "/:doctorId",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  doctorController.softDeleteDoctor,
);

export const doctorRoutes = router;
