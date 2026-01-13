import BaseModel from "./base.model.js";
import knex from "../db/knex.js";

class TestModel extends BaseModel {
  constructor() {
    super("tests");
  }
  async getFullTestById(testId) {
    //Obtenemos el tipo de del test
    const testType = await knex("tests as t")
      .join("test_types as tt", "t.type_id", "tt.id")
      .where("t.id", testId)
      .select("*");
    // Obtenemos las áreas del test
    const areas = await knex("test_areas as ta")
      .join("areas as a", "ta.area_id", "a.id")
      .where("ta.test_id", testId)
      .select("a.id", "a.name");

    // Recorremos cada área para traer sus competencias, preguntas y respuestas
    const areasWithData = await Promise.all(
      areas.map(async (area) => {
        const components = await knex("components")
          .where("area_id", area.id)
          .select("id", "name");

        const componentsWithQuestions = await Promise.all(
          components.map(async (component) => {
            const questions = await knex("questions")
              .where("component_id", component.id)
              .select("*");

            const questionsWithAnswers = await Promise.all(
              questions.map(async (question) => {
                const answers = await knex("answers")
                  .where("question_id", question.id)
                  .select("*");

                return { ...question, answers };
              })
            );
            return {
              ...component,
              questions: questionsWithAnswers,
            };
          })
        );
        const questionsByAreaFlat = [];
        componentsWithQuestions.forEach((component) => {
          component.questions.forEach((question) => {
            questionsByAreaFlat.push(question);
          });
        });
        return {
          ...area,
          questionsByArea: questionsByAreaFlat,
          components: componentsWithQuestions,
        };
      })
    );

    // Información base del test
    const test = await knex("tests").where("id", testId).select("*").first();

    return { ...test, areas: areasWithData, testType };
  }

  async getTestAreas(testId) {
    const areas = await knex("test_areas as ta")
      .join("areas as a", "ta.area_id", "a.id")
      .where("ta.test_id", testId)
      .select("*");
    return areas;
  }

  async getAvailableTests(userId) {
    const rows = await knex("group_users")
      .join("groups", "groups.id", "group_users.group_id")
      .join("group_tests", "group_tests.group_id", "groups.id")
      .join("tests", "tests.id", "group_tests.test_id")

      // 👇 LEFT JOIN attempts
      .leftJoin("test_results", function () {
        this.on("test_results.test_id", "=", "tests.id")
          .andOn("test_results.user_id", "=", knex.raw("?", [userId]))
          .andOnIn("test_results.status", ["completed", "expired"]);
      })

      .where("group_users.user_id", userId)
      .where("groups.is_active", true)
      .where("tests.is_active", true)

      .groupBy("groups.id", "group_tests.id", "tests.id")

      .select(
        // ----- GROUP -----
        "groups.id as group_id",
        "groups.name as group_name",
        "groups.description as group_description",

        // ----- TEST -----
        "tests.id as test_id",
        "tests.type_id as test_type_id",
        "tests.name as test_name",
        "tests.description as test_description",
        "tests.max_time_minutes",

        // ----- GROUP_TEST -----
        "group_tests.max_attempts",
        "group_tests.available_from",
        "group_tests.available_until",

        // ----- ATTEMPTS -----
        knex.raw("COUNT(test_results.id) as attempts_used")
      );
    console.log({ rows });
    const result = Object.values(
      rows.reduce((acc, row) => {
        if (!acc[row.group_id]) {
          acc[row.group_id] = {
            id: row.group_id,
            name: row.group_name,
            description: row.group_description,
            tests: [],
          };
        }

        acc[row.group_id].tests.push({
          id: row.test_id,
          type_id: row.test_type_id,
          name: row.test_name,
          description: row.test_description,
          max_time_minutes: row.max_time_minutes,

          max_attempts: row.max_attempts,
          attempts_used: Number(row.attempts_used),
          attempts_left: Math.max(
            row.max_attempts - Number(row.attempts_used),
            0
          ),

          available_from: row.available_from,
          available_until: row.available_until,
        });

        return acc;
      }, {})
    );

    return result;
  }
}

export default new TestModel();
