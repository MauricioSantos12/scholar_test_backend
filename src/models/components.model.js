import knex from "../db/knex.js";
import BaseModel from "./base.model.js";

class ComponentModel extends BaseModel {
  constructor() {
    super("components");
  }
  getQuestionsByComponentId(id) {
    return knex("questions").where("component_id", id);
  }
}

export default new ComponentModel();
