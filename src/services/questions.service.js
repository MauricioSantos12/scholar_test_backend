import BaseService from "./base.service.js";
import questionModel from "../models/questions.model.js";

class QuestionService extends BaseService {
  constructor() {
    super(questionModel);
  }
  getAnswersByQuestionId(questionId) {
    return this.model.getAnswersByQuestionId(questionId);
  }
}

export default new QuestionService();
