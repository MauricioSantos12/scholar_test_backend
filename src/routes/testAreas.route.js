import express from "express";
import { TestAreaController } from "../controllers/testAreaController.js";
import { testAreaSchema } from "../schemas/testArea.schema.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  "/:testId/areas/:areaId",
  TestAreaController.getAreasByTestIdAndAreaId
);
router.get("/areas/:areaId", TestAreaController.getAreasByAreaId);

router.post(
  "/tests/:testId/areas",
  verifyToken,
  validateSchema(testAreaSchema),
  TestAreaController.addAreaToTest
);

router.put(
  "/:id",
  verifyToken,
  validateSchema(testAreaSchema),
  TestAreaController.updateArea
);

router.delete(
  "/:testId/areas/:areaId",
  verifyToken,
  TestAreaController.deleteArea
);

export default router;
