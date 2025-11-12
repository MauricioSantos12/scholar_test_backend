// src/models/base.model.js
import knex from "../db/knex.js";

export default class BaseModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async findAll(filters) {
    const query = knex(this.tableName).select("*");
    if (filters) {
      Object.keys(filters).forEach((key) => {
        query.where(key, filters[key]);
      });
    }
    return await query;
  }

  async findById(id) {
    return await knex(this.tableName).where({ id }).first();
  }

  async create(data) {
    const [id] = await knex(this.tableName).insert(data);
    return { id, ...data };
  }

  async update(id, data) {
    await knex(this.tableName).where({ id }).update(data);
    return await this.findById(id);
  }

  async delete(id) {
    return await knex(this.tableName).where({ id }).del();
  }
}
