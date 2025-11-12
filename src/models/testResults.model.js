import BaseModel from "./base.model.js";

class TestResultModel extends BaseModel {
  constructor() {
    super("test_results");
  }
}

export default new TestResultModel();
