import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { superAdminController } from "./superAdmin.controller";
import { superAdminValidation } from "./superAdmin.validation";

const router = Router();

router.get(
  "/",
  checkAuth(Role.SUPER_ADMIN),
  superAdminController.getAllSuperAdmins,
);

router.get(
  "/:adminId",
  checkAuth(Role.SUPER_ADMIN),
  superAdminController.getSuperAdminById,
);

router.patch(
  "/:adminId",
  checkAuth(Role.SUPER_ADMIN),
  validateRequest(superAdminValidation.updateSuperAdminValidationSchema),
  superAdminController.updateSuperAdmin,
);

router.delete(
  "/:adminId",
  checkAuth(Role.SUPER_ADMIN),
  superAdminController.softDeleteSuperAdmin,
);

export const superAdminRoutes = router;
