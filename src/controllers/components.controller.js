import BaseController from "./base.controller.js";
import componentService from "../services/components.service.js";

class ComponentController extends BaseController {
  constructor() {
    super(componentService);
  }
  getQuestionsByComponentId = async (req, res, next) => {
    try {
      const data = await this.service.getQuestionsByComponentId(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default new ComponentController();
