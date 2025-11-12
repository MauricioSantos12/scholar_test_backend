import BaseService from "./base.service.js";
import recommendationModel from "../models/recommendations.model.js";

class RecommendationService extends BaseService {
  constructor() {
    super(recommendationModel);
  }
  async getRecommendationsByArea(id) {
    return await recommendationModel.findAllByArea(id);
  }
}

export default new RecommendationService();
