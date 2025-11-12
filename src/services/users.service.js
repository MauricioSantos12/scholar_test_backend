import BaseService from "./base.service.js";
import userModel from "../models/users.model.js";

class UserService extends BaseService {
  constructor() {
    super(userModel);
  }
  async createUser(user) {
    return await this.model.createUser(user);
  }
}

export default new UserService();
