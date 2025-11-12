import express from "express";
import areaController from "../controllers/areas.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { areaSchema, areaUpdateSchema } from "../schemas/area.schema.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", areaController.getAll);
router.get("/:id", areaController.getById);
router.get("/:id/components", areaController.getComponentsByAreaId);
router.post(
  "/",
  verifyToken,
  validateSchema(areaSchema),
  areaController.create
);
router.put(
  "/:id",
  verifyToken,
  validateSchema(areaUpdateSchema),
  areaController.update
);
router.delete("/:id", verifyToken, areaController.delete);

export default router;
