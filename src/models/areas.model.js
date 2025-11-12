import BaseModel from "./base.model.js";
import knex from "../db/knex.js";

class AreaModel extends BaseModel {
  constructor() {
    super("areas");
  }
  getComponentsByAreaId(id) {
    return knex("components").where("area_id", id);
  }
}

export default new AreaModel();
