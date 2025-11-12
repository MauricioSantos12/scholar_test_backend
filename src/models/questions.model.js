import BaseModel from "./base.model.js";
import knex from "../db/knex.js";

class QuestionModel extends BaseModel {
  constructor() {
    super("questions");
  }
  getAnswersByQuestionId(questionId) {
    return knex("answers").where({ question_id: questionId });
  }
}

export default new QuestionModel();
