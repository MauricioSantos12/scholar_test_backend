import express from "express";
import testTypesController from "../controllers/testTypes.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import {
  testTypesUpdateSchema,
  testTypesCreateSchema,
} from "../schemas/testTypes.schema.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const route = express.Router();

route.get("/", testTypesController.getAll);
route.get("/:id", testTypesController.getById);
route.post(
  "/",
  verifyToken,
  validateSchema(testTypesCreateSchema),
  testTypesController.create
);
route.put(
  "/:id",
  verifyToken,
  validateSchema(testTypesUpdateSchema),
  testTypesController.update
);
route.delete("/:id", verifyToken, testTypesController.delete);

export default route;
