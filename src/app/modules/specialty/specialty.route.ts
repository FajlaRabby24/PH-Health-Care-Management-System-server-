import { Router } from "express";
import { specialtyController } from "./spacialty.controller";

const router = Router();

router.post("/", specialtyController.createSpecialty);
router.get("/", specialtyController.getAllSpecialties);
router.delete("/:id", specialtyController.deleteSpecialty);

export const specialtyRoutes = router;
