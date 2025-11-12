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
}

export default new TestModel();
