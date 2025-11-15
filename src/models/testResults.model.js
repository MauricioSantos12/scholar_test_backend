import BaseModel from "./base.model.js";
import knex from "../db/knex.js";

class TestResultModel extends BaseModel {
  constructor() {
    super("test_results");
  }
  async startTest(testId, userId) {
    const start_time = new Date();
    const [id] = await knex("test_results")
      .insert({
        test_id: testId,
        user_id: userId,
        start_time,
        score: 0,
        status: "in_progress",
      })
      .returning("*");
    const data = await knex("test_results").where({ id }).first();
    return data;
  }
  async findInProgressByUserAndTest(userId, testId) {
    return knex("test_results")
      .where({ user_id: userId, test_id: testId, status: "in_progress" })
      .first();
  }

  async updateStatus(id, status, endTime) {
    return knex("test_results")
      .where({ id })
      .update({ status, end_time: endTime });
  }

  async getAllResults({
    page = 1,
    pageSize = 10,
    startDate,
    endDate,
    filters = {},
  }) {
    const query = knex("test_results").select("*");
    if (Object.keys(filters).length > 0) {
      Object.keys(filters).forEach((key) => {
        query.where(key, filters[key]);
      });
    }
    if (startDate) query.where("created_at", ">=", startDate);
    if (endDate) query.where("created_at", "<=", endDate);
    const totalData = await query;
    const totalRows = totalData.length;
    const data = await query.offset((page - 1) * pageSize).limit(pageSize);

    return {
      data,
      totalPages: Math.ceil(totalRows / pageSize),
    };
  }
}

export default new TestResultModel();
