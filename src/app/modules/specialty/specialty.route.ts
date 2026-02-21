import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { multerUpload } from "../../config/multer.config";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { specialtyController } from "./spacialty.controller";
import { specialtyValidation } from "./specialty.validation";

const router = Router();

router.post(
  "/",
  // checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.single("file"),
  validateRequest(specialtyValidation.createSpecialtyZodSchema),
  specialtyController.createSpecialty,
);

router.get("/", specialtyController.getAllSpecialties);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  specialtyController.deleteSpecialty,
);

export const specialtyRoutes = router;
