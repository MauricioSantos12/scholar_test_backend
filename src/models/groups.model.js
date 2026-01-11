import BaseModel from "./base.model.js";

class GroupModel extends BaseModel {
  constructor() {
    super("groups");
  }
}

export default new GroupModel();
