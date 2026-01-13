import express from "express";
import testController from "../controllers/tests.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { testCreateSchema, testUpdateSchema } from "../schemas/test.schema.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import testResultsController from "../controllers/testResults.controller.js";

const router = express.Router();

router.get("/", testController.getAll);
router.get("/:id/full", verifyToken, testController.getFullTestById);
router.get("/:id/areas", verifyToken, testController.getTestAreas);
router.get("/availableByUser/:userId", testController.getAvailableTests);
router.post(
  "/",
  verifyToken,
  validateSchema(testCreateSchema),
  testController.create
);
router.post("/:testId/start", verifyToken, testResultsController.startTest);
router.post(
  "/:testId/result/:resultId/finish",
  verifyToken,
  testResultsController.finishTest
);
router.put(
  "/:id",
  verifyToken,
  validateSchema(testUpdateSchema),
  testController.update
);
router.delete("/:id", verifyToken, testController.delete);

export default router;
