// src/controllers/answers.controller.js
import BaseController from "./base.controller.js";
import answerService from "../services/answers.service.js";

class AnswerController extends BaseController {
  constructor() {
    super(answerService);
  }

  getAnswersByQuestion = async (req, res, next) => {
    try {
      const { questionId } = req.params;
      const data = await answerService.getAnswersByQuestion(questionId);

      if (!data || data.length === 0) {
        return res
          .status(404)
          .json({ message: "No se encontraron respuestas para esta pregunta" });
      }

      res.json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default new AnswerController();
