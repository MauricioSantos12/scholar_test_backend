import express from "express";
import resultsController from "../controllers/results.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Guardar todos los resultados del test
router.post("/", verifyToken, resultsController.createFullResult);

// Obtener todos los resultados
router.get("/", verifyToken, resultsController.getAllResults);

// Obtener resultado por ID
router.get("/:id", verifyToken, resultsController.getByFullResultId);

export default router;
