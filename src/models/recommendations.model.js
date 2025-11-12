import BaseModel from "./base.model.js";
import knex from "../db/knex.js";

class RecommendationModel extends BaseModel {
  constructor() {
    super("recommendations");
  }
  async findAllByArea(id) {
    return await knex("recommendations").where("area_id", id).select("*");
  }
}

export default new RecommendationModel();
