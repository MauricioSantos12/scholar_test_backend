import BaseService from "./base.service.js";
import componentModel from "../models/components.model.js";

class ComponentService extends BaseService {
  constructor() {
    super(componentModel);
  }
  getQuestionsByComponentId(id) {
    return this.model.getQuestionsByComponentId(id);
  }
}

export default new ComponentService();
