import express from "express";
import { validateSchema } from "../middlewares/validate.middleware.js";
import questionController from "../controllers/questions.controller.js";
import {
  questionUpdateSchema,
  questionCreateSchema,
} from "../schemas/question.schema.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", questionController.getAll);
router.get("/:id", questionController.getById);
router.get("/:id/answers", questionController.getAnswersByQuestionId);

router.post(
  "/",
  verifyToken,
  validateSchema(questionCreateSchema),
  questionController.create
);
router.put(
  "/:id",
  verifyToken,
  validateSchema(questionUpdateSchema),
  questionController.update
);
router.delete("/:id", verifyToken, questionController.delete);

export default router;
