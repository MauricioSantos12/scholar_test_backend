import BaseService from "./base.service.js";
import testResultModel from "../models/testResults.model.js";
import areaResultModel from "../models/areaResults.model.js";
import componentResultModel from "../models/componentResults.model.js";
import knex from "../db/knex.js";

class ResultsService extends BaseService {
  constructor() {
    super(testResultModel);
  }

  async createFullResult({ test_id, user_id, answers }) {
    // Obtener preguntas y verificar respuestas
    const questionIds = answers.map((a) => a.question_id);
    const questions = await knex("questions")
      .whereIn("id", questionIds)
      .select("id", "component_id");

    const correctAnswers = await knex("answers")
      .whereIn("question_id", questionIds)
      .andWhere("is_correct", true);

    const resultsByComponent = {};
    const resultsByArea = {};

    for (const ans of answers) {
      const question = questions.find((q) => q.id === ans.question_id);
      if (!question) continue;
      const component = await knex("components")
        .where("id", question.component_id)
        .first();
      if (!component) continue;
      const areaId = component.area_id;
      const isCorrect = correctAnswers.some((ca) => {
        return ca.question_id === ans.question_id && ca.id === ans.answer_id;
      });
      // Component
      if (!resultsByComponent[component.id]) {
        resultsByComponent[component.id] = {
          correct: 0,
          total: 0,
          area_id: areaId,
        };
      }
      resultsByComponent[component.id].total++;
      if (isCorrect) resultsByComponent[component.id].correct++;

      // Area
      if (!resultsByArea[areaId]) {
        resultsByArea[areaId] = { correct: 0, total: 0 };
      }
      resultsByArea[areaId].total++;
      if (isCorrect) resultsByArea[areaId].correct++;
    }

    // Calcular totales
    const totalCorrect = Object.values(resultsByComponent).reduce(
      (sum, c) => sum + c.correct,
      0
    );
    const totalQuestions = Object.values(resultsByComponent).reduce(
      (sum, c) => sum + c.total,
      0
    );
    const totalScore = ((totalCorrect / totalQuestions) * 100).toFixed(2);
    // Guardar test_result
    const [testResultId] = await knex("test_results").insert({
      test_id,
      user_id,
      score: totalScore,
      correct_answers: totalCorrect,
      incorrect_answers: totalQuestions - totalCorrect,
    });

    // Guardar area_results
    for (const [areaId, data] of Object.entries(resultsByArea)) {
      const score = ((data.correct / data.total) * 100).toFixed(2);
      resultsByArea[areaId].score = score;
      const [areaResultId] = await knex("area_results").insert({
        test_result_id: testResultId,
        area_id: areaId,
        score: score,
        correct_answers: data.correct,
        incorrect_answers: data.total - data.correct,
      });

      // Guardar component_results
      for (const [compId, compData] of Object.entries(resultsByComponent)) {
        const score = ((compData.correct / compData.total) * 100).toFixed(2);
        resultsByComponent[compId].score = score;
        if (compData.area_id === parseInt(areaId)) {
          await knex("component_results").insert({
            area_result_id: areaResultId,
            component_id: compId,
            score: score,
            correct_answers: compData.correct,
            incorrect_answers: compData.total - compData.correct,
          });
        }
      }
    }

    return {
      message: "Resultados guardados exitosamente",
      testResultId,
      totalScore,
      totalCorrect,
      totalQuestions,
      totalIncorrect: totalQuestions - totalCorrect,
      resultsByArea,
      resultsByComponent,
    };
  }
}

export default new ResultsService();
