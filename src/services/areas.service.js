import BaseService from "./base.service.js";
import areaModel from "../models/areas.model.js";

class AreaService extends BaseService {
  constructor() {
    super(areaModel);
  }
  getComponentsByAreaId(id) {
    return this.model.getComponentsByAreaId(id);
  }
}

export default new AreaService();
