import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { userController } from "./user.controlle";
import { UserValidation } from "./user.validation";

const router = Router();

router.post(
  "/create-doctor",
  // checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(UserValidation.createDoctorValidationSchema),
  userController.createDoctor,
);

router.post(
  "/create-admin",
  checkAuth(Role.SUPER_ADMIN),
  validateRequest(UserValidation.createAdminValidationSchema),
  userController.createAdmin,
);

export const userRoutes = router;
