import BaseController from "./base.controller.js";
import recommendationService from "../services/recommendations.service.js";

class RecommendationController extends BaseController {
  constructor() {
    super(recommendationService);
  }

  async getRecommendationsByArea(req, res, next) {
    try {
      const id = req.params.id;
      const data = await recommendationService.getRecommendationsByArea(id);
      if (!data || data.length === 0) {
        return res
          .status(404)
          .json({ message: "No se encontraron respuestas para esta pregunta" });
      }
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new RecommendationController();
