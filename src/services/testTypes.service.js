import testTypesModel from "../models/testTypes.model.js";
import BaseService from "./base.service.js";

class TestTypeService extends BaseService {
  constructor() {
    super(testTypesModel);
  }
}

export default new TestTypeService();
