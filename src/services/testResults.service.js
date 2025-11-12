import BaseService from "./base.service.js";
import testResultModel from "../models/testResults.model.js";
import testsModel from "../models/tests.model.js";

class TestService extends BaseService {
  constructor() {
    super(testResultModel);
  }
  startTest(testId, userId) {
    return testResultModel.startTest(testId, userId);
  }
  async finishTest(testId, resultId) {
    // 1. Buscar test result activo
    const testResult = await testResultModel.findById(resultId);
    if (!testResult) {
      throw new Error("No se encontró un test en progreso para este usuario");
    }

    // 2. Buscar datos del test
    const test = await testsModel.findById(testId);
    if (!test) {
      throw new Error("El test no existe");
    }

    // 3. Calcular tiempo transcurrido
    const now = new Date();
    const elapsedMinutes =
      (now - new Date(testResult.start_time)) / (1000 * 60);

    // 4. Determinar estado final
    const newStatus =
      elapsedMinutes > test.max_time_minutes ? "expired" : "completed";

    // 5. Actualizar registro
    await testResultModel.updateStatus(testResult.id, newStatus, now);

    // 6. Retornar resultado
    return {
      message:
        newStatus === "expired"
          ? "El tiempo del test expiró automáticamente"
          : "Test finalizado correctamente",
      status: newStatus,
      end_time: now,
      id: testResult.id,
    };
  }
}

export default new TestService();
