import express from "express";
import userController from "../controllers/users.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { userUpdateSchema, userCreateSchema } from "../schemas/user.schema.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.post(
  "/",
  verifyToken,
  validateSchema(userCreateSchema),
  userController.createUser
);
router.put(
  "/:id",
  verifyToken,
  validateSchema(userUpdateSchema),
  userController.updateUser
);
router.delete("/:id", verifyToken, userController.delete);
export default router;
