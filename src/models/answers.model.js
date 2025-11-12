import BaseModel from "./base.model.js";
import knex from "../db/knex.js";

class AnswerModel extends BaseModel {
  constructor() {
    super("answers");
  }
  findAllByQuestion = async (id) => {
    return await knex("answers").where({ question_id: id }).select("*");
  };
}

export default new AnswerModel();
