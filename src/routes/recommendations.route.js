import express from "express";
import recommendationController from "../controllers/recommendations.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import {
  recommendationCreateSchema,
  recommendationUpdateSchema,
} from "../schemas/recommendation.schema.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", recommendationController.getAll);
router.get("/", recommendationController.getById);
router.get("/area/:id", recommendationController.getRecommendationsByArea);
router.post(
  "/",
  verifyToken,
  validateSchema(recommendationCreateSchema),
  recommendationController.create
);
router.put(
  "/:id",
  verifyToken,
  validateSchema(recommendationUpdateSchema),
  recommendationController.update
);
router.delete("/:id", verifyToken, recommendationController.delete);
export default router;
