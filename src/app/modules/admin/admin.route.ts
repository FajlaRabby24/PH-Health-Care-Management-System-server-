import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { adminController } from "./admin.controller";
import { adminValidation } from "./admin.validation";

const router = Router();

// router.get(
//   "/",
//   checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
//   adminController.getAllAdmins,
// );

// router.get(
//   "/:adminId",
//   checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
//   adminController.getAdminById,
// );

// router.patch(
//   "/:adminId",
//   checkAuth(Role.SUPER_ADMIN),
//   validateRequest(adminValidation.updateAdminValidationSchema),
//   adminController.updateAdmin,
// );

// router.delete(
//   "/:adminId",
//   checkAuth(Role.SUPER_ADMIN),
//   adminController.softDeleteAdmin,
// );

router.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  adminController.getAllAdmins,
);

router.get(
  "/:adminId",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  adminController.getAdminById,
);

router.patch(
  "/:adminId",
  checkAuth(Role.SUPER_ADMIN),
  validateRequest(adminValidation.updateAdminValidationSchema),
  adminController.updateAdmin,
);

router.delete(
  "/:adminId",
  checkAuth(Role.SUPER_ADMIN),
  adminController.softDeleteAdmin,
);

export const adminRoutes = router;
