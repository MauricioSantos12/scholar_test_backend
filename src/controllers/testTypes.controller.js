import BaseController from "./base.controller.js";
import testTypeService from "../services/testTypes.service.js";
class TestTypeController extends BaseController {
  constructor() {
    super(testTypeService);
  }
}

export default new TestTypeController();
