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

  async getAllResults({ page = 1, pageSize = 10, filters = {} }) {
    const totalCount = await knex("test_results").count("*").first();
    const query = knex("test_results").select("*");
    if (Object.keys(filters).length > 0) {
      Object.keys(filters).forEach((key) => {
        query.where(key, filters[key]);
      });
    }
    const data = await query.offset((page - 1) * pageSize).limit(pageSize);
    return {
      data,
      totalPages: Math.ceil(totalCount["count(*)"] / pageSize),
    };
  }

  // const query = knex("test_results as tr")
  //   .select(
  //     "tr.*",
  //     knex.raw(`
  //       JSON_OBJECT(
  //         'id', u.id,
  //         'name', u.name,
  //         'email', u.email
  //       ) as userInfo
  //     `),

  //     knex.raw(`
  //       JSON_OBJECT(
  //         'id', t.id,
  //         'name', t.name,
  //         'description', t.description
  //         /* Add any other columns from the 'tests' table here */
  //       ) as testInfo
  //     `)
  //   )
  //   .join("users as u", "tr.user_id", "u.id")
  //   .join("tests as t", "tr.test_id", "t.id");
}

export default new TestResultModel();
