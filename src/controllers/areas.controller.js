import BaseController from "./base.controller.js";
import areaService from "../services/areas.service.js";

class AreaController extends BaseController {
  constructor() {
    super(areaService);
  }
  getComponentsByAreaId = async (req, res, next) => {
    try {
      const data = await this.service.getComponentsByAreaId(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default new AreaController();
