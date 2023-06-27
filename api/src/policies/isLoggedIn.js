const { default: mongoose } = require("mongoose");
const ValidationError = require("../errors/ValidationError");
const { validateToken } = require("../helpers/tokenCreation");
const { ADMIN_ROLE_NAME } = require("../constants");
const isAdmin = require("./isAdmin");

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.header("Authorization");
    const user = await validateToken(bearerToken);
    req.user = user;

    if (user.id !== req.params.id) {
      throw new ValidationError("Token no coincide");
    }

    return next();
  } catch (error) {
    console.log({ error });

    next({
      status: 401,
      message: error.message,
    });
  }
};
