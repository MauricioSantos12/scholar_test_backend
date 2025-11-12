import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/users.model.js";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

export const login = async ({ email, password }) => {
  const user = await userModel.findByEmail(email);
  if (!user) throw new Error("El usuario no se encuentra.");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Credenciales inválidas.");

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
    expiresIn: "2h",
  });

  const { password: _, ...safeUser } = user;
  return { user: safeUser, token };
};
