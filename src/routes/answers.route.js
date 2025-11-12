import express from "express";
import answerController from "../controllers/answers.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import {
  answerCreateSchema,
  answerUpdateSchema,
} from "../schemas/answers.schema.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", answerController.getAll);
router.get("/:id", answerController.getById);
router.get("/question/:questionId", answerController.getAnswersByQuestion);
router.post(
  "/",
  verifyToken,
  validateSchema(answerCreateSchema),
  answerController.create
);
router.put(
  "/:id",
  verifyToken,
  validateSchema(answerUpdateSchema),
  answerController.update
);
router.delete("/:id", verifyToken, answerController.delete);

export default router;
