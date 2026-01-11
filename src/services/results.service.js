import BaseService from "./base.service.js";
import testResultModel from "../models/testResults.model.js";
import knex from "../db/knex.js";

class ResultsService extends BaseService {
  constructor() {
    super(testResultModel);
  }

  async createFullResult({
    test_id,
    user_id,
    test_result_id: testResultId,
    answers,
  }) {
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
    await knex("test_results")
      .where({
        id: testResultId,
      })
      .update({
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

  async getByFullResultId(testResultId) {
    const testResult = await testResultModel.findById(testResultId);
    const areasByTestResult = await knex("area_results").where({
      test_result_id: testResultId,
    });
    const resultsByArea = areasByTestResult.reduce((obj, area) => {
      obj[area.area_id] = {
        correct: area.correct_answers,
        score: area.score,
        total: area.correct_answers + area.incorrect_answers,
        result_area_id: area.id,
      };
      return obj;
    }, {});
    const idsResultArea = [];
    for (const [areaId, data] of Object.entries(resultsByArea)) {
      idsResultArea.push(data.result_area_id);
    }

    const componentsByTestResult = await Promise.all(
      idsResultArea.map(async (areaResultId) => {
        const components = await knex("component_results").where({
          area_result_id: areaResultId,
        });
        return components;
      })
    );
    componentsByTestResult.map((components) => {
      components.reduce((obj, component) => {
        obj[component.component_id] = {
          correct: component.correct_answers,
          score: component.score,
          total: component.correct_answers + component.incorrect_answers,
        };
        return obj;
      }, {});
    });
    const resultsByComponent = {};
    const resultByAreaIds = Object.keys(resultsByArea);
    componentsByTestResult.map((components, i) => {
      components.map((component) => {
        const areaId = resultByAreaIds[i];
        resultsByComponent[component.component_id] = {
          correct: component.correct_answers,
          total: component.correct_answers + component.incorrect_answers,
          area_id: areaId,
          score: component.score,
        };
      });
    });
    return {
      testResultId,
      totalScore: testResult.score,
      totalQuestions: testResult.correct_answers + testResult.incorrect_answers,
      totalCorrect: testResult.correct_answers,
      totalIncorrect: testResult.incorrect_answers,
      resultsByArea,
      resultsByComponent,
      test_id: testResult.test_id,
    };
  }

  async getAllResults(page, pageSize, startDate, endDate, filters) {
    return await testResultModel.getAllResults({
      page,
      pageSize,
      startDate,
      endDate,
      filters,
    });
  }
}

export default new ResultsService();
