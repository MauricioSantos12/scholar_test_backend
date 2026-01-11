import express from "express";
import { validateSchema } from "../middlewares/validate.middleware.js";
import groupController from "../controllers/groups.controller.js";
import {
  groupCreateSchema,
  groupUpdateSchema,
} from "../schemas/group.schema.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", groupController.getAll);
router.get("/:id", groupController.getById);
router.get("/:id/users", verifyToken, groupController.getGroupUsers);
router.get("/:id/tests", verifyToken, groupController.getGroupTests);
router.get("/:id/configTest", verifyToken, groupController.getGroupTestConfigs);

router.post(
  "/",
  verifyToken,
  validateSchema(groupCreateSchema),
  groupController.create
);

router.put("/:id/users", verifyToken, groupController.syncGroupUsers);
router.put("/:id/tests", verifyToken, groupController.syncGroupTests);
router.put(
  "/:id",
  verifyToken,
  validateSchema(groupUpdateSchema),
  groupController.update
);
router.delete("/:id", verifyToken, groupController.delete);

export default router;
