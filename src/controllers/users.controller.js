import BaseController from "./base.controller.js";
import userService from "../services/users.service.js";
import bcrypt from "bcrypt";
import usersModel from "../models/users.model.js";

class UserController extends BaseController {
  constructor() {
    super(userService);
  }

  async createUser(req, res, next) {
    try {
      const { password, ...user } = req.body;
      const userAlreadyExists = await usersModel.findByEmail(user.email);
      const userAlreadyExistsByIdNumber = await usersModel.findByIdNumber(
        user.identification_number
      );
      if (userAlreadyExists || userAlreadyExistsByIdNumber)
        throw new Error("El usuario ya se encuentra registrado.");
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      const createdUser = await userService.createUser(user);
      res.status(201).json(createdUser);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
