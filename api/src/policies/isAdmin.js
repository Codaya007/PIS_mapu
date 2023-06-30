const { ADMIN_ROLE_NAME } = require("../constants");
const { validateToken } = require("../helpers/tokenCreation");

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.header("Authorization");

    const user = await validateToken(bearerToken);

    if (user.deletedAt) {
      return next({
        status: 403,
        message:
          "Su usuario fue dado de baja, contáctese con el administrador.",
      });
    }

    if (user.bloqued) {
      return next({
        status: 403,
        message: "Usuario bloqueado, contáctese con el administrador",
      });
    }
    req.user = user;

    if (user.role !== ADMIN_ROLE_NAME) {
      return next({
        status: 401,
        message: "El acceso está restringido al administrador",
      });
    }

    return next();
  } catch (error) {
    next({
      status: 401,
      message: error.message,
    });
  }
};
