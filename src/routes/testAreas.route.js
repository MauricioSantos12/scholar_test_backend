import express from "express";
import { TestAreaController } from "../controllers/testAreaController.js";
import {
  testAreaSchema,
  testUpdateSomeAreas,
} from "../schemas/testArea.schema.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", TestAreaController.getAll);
router.get(
  "/:testId/areas/:areaId",
  TestAreaController.getAreasByTestIdAndAreaId
);
router.get("/tests/:testId", TestAreaController.getAreasByTestId);
router.get("/areas/:areaId", TestAreaController.getAreasByAreaId);

// to add area to test
router.post(
  "/tests/:testId/areas",
  verifyToken,
  validateSchema(testAreaSchema),
  TestAreaController.addAreaToTest
);

// to update content of area
router.put(
  "/:id",
  verifyToken,
  validateSchema(testAreaSchema),
  TestAreaController.updateArea
);

// to update areas of test
router.put(
  "/tests/:testId/areas",
  verifyToken,
  validateSchema(testUpdateSomeAreas),
  TestAreaController.updateAreasOfTest
);

// to delete area
router.delete(
  "/:testId/areas/:areaId",
  verifyToken,
  TestAreaController.deleteArea
);

export default router;
