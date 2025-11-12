import BaseController from "./base.controller.js";
import questionService from "../services/questions.service.js";

class QuestionController extends BaseController {
  constructor() {
    super(questionService);
  }
  getAnswersByQuestionId = async (req, res, next) => {
    try {
      const data = await this.service.getAnswersByQuestionId(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default new QuestionController();
