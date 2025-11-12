import express from "express";
import testController from "../controllers/tests.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { testCreateSchema, testUpdateSchema } from "../schemas/test.schema.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", testController.getAll);
router.get("/:id/full", verifyToken, testController.getFullTestById);
router.get("/:id/areas", verifyToken, testController.getTestAreas);
router.post(
  "/",
  verifyToken,
  validateSchema(testCreateSchema),
  testController.create
);
router.put(
  "/:id",
  verifyToken,
  validateSchema(testUpdateSchema),
  testController.update
);
router.delete("/:id", verifyToken, testController.delete);

export default router;
