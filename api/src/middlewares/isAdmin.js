const { ADMIN_ROLE_NAME } = require("../constants");
const { validateToken } = require("../helpers/tokenCreation");

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.header("Authorization");

    const user = await validateToken(bearerToken);
    req.user = user;

    if (user.role !== ADMIN_ROLE_NAME) {
      return next({
        status: 401,
        message: "El acceso está restringido al administrador",
      });
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
