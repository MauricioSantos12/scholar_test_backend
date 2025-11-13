import BaseModel from "./base.model.js";

class AreaResultModel extends BaseModel {
  constructor() {
    super("area_results");
  }

  findByTestResultId(testResultId) {
    return this.findAll({ testResultId });
  }
}

export default new AreaResultModel();
