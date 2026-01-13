import BaseController from "./base.controller.js";
import testService from "../services/tests.service.js";

class TestController extends BaseController {
  constructor() {
    super(testService);
  }
  getFullTestById = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await testService.getFullTestById(id);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching full test:", error);
      res.status(500).json({ message: "Error obteniendo el test completo" });
    }
  };

  getTestAreas = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await testService.getTestAreas(id);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching test areas:", error);
      res.status(500).json({ message: "Error obteniendo las áreas del test" });
    }
  };

  getAvailableTests = async (req, res) => {
    const { userId } = req.params;
    try {
      const data = await testService.getAvailableTests(userId);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching available tests:", error);
      res
        .status(500)
        .json({ message: "Error obteniendo los tests disponibles" });
    }
  };
}

export default new TestController();
