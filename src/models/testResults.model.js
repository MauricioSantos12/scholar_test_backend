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
    console.log({ id });
    return knex("test_results")
      .where({ id })
      .update({ status, end_time: endTime });
  }
}

export default new TestResultModel();
