import BaseService from "./base.service.js";
import userModel from "../models/users.model.js";

class UserService extends BaseService {
  constructor() {
    super(userModel);
  }
  async createUser(user) {
    return await userModel.createUser(user);
  }
  async updateUser(id, user) {
    return await userModel.updateUser(id, user);
  }
}

export default new UserService();
