import BaseService from "./base.service.js";
import testModel from "../models/tests.model.js";

class TestService extends BaseService {
  constructor() {
    super(testModel);
  }
  getFullTestById(id) {
    return testModel.getFullTestById(id);
  }

  getTestAreas(id) {
    return testModel.getTestAreas(id);
  }
  getAvailableTests(userId) {
    return testModel.getAvailableTests(userId);
  }
}

export default new TestService();
