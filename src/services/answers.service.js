import BaseService from "./base.service.js";
import answerModel from "../models/answers.model.js";

class AnswerService extends BaseService {
  constructor() {
    super(answerModel);
  }
  getAnswersByQuestion = async (id) => {
    return await answerModel.findAllByQuestion(id);
  };
}

export default new AnswerService();
