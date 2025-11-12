import BaseModel from "./base.model.js";
import knex from "../db/knex.js";
class UserModel extends BaseModel {
  constructor() {
    super("users");
  }
  findByEmail(email) {
    return knex("users").where({ email }).first();
  }
  findByIdNumber(identification_number) {
    return knex("users").where({ identification_number }).first();
  }
  async createUser(user) {
    const [id] = await knex("users").insert(user).select("*");
    const { password, ...safeUser } = user;
    return { id, ...safeUser };
  }
}

export default new UserModel();
