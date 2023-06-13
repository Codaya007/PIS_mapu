const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const User = require("../models/User");
const userService = require("../services/userService");

module.exports = async (req, res, next) => {
  // get token from header
  const [_, token] = req.header("Authorization")?.split(" ") || [];

  // check if no token
  if (!token) {
    return next({
      status: 401,
      message: "No se ha encontrado un token de autenticación",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userService.getUser({ name: decoded.name });

    if (!user) {
      return next({ status: 401, message: "Usuario no válido" });
    }

    // set user id in req.user
    req.user = user;

    return next();
  } catch (error) {
    next({
      status: 401,
      message: "Autenticación no válida",
    });
  }
};
