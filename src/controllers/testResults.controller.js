import BaseController from "./base.controller.js";
import testResults from "../services/testResults.service.js";

class TestController extends BaseController {
  constructor() {
    super(testResults);
  }
  startTest = async (req, res) => {
    const { testId } = req.params;
    const { userId } = req.body;
    try {
      const data = await testResults.startTest(testId, userId);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching start test:", error);
      res.status(500).json({ message: "Error realizando start" });
    }
  };
  finishTest = async (req, res) => {
    try {
      const { resultId, testId } = req.params;
      const result = await testResults.finishTest(testId, resultId);
      return res.json(result);
    } catch (error) {
      console.error("Error al finalizar el test:", error.message);
      return res.status(400).json({ message: error.message });
    }
  };
}

export default new TestController();
