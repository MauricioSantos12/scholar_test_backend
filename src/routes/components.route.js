import express from "express";
import componentController from "../controllers/components.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import {
  componentSchema,
  componentUpdateSchema,
} from "../schemas/component.schema.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", componentController.getAll);
router.get("/:id", componentController.getById);
router.get("/:id/questions", componentController.getQuestionsByComponentId);
router.post(
  "/",
  verifyToken,
  validateSchema(componentSchema),
  componentController.create
);
router.put(
  "/:id",
  verifyToken,
  validateSchema(componentUpdateSchema),
  componentController.update
);

router.delete("/:id", verifyToken, componentController.delete);

export default router;
