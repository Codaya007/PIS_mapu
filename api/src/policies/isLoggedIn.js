const { validateToken } = require("../helpers/tokenCreation");

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.header("Authorization");

    const user = await validateToken(bearerToken);
    req.user = user;

    return next();
  } catch (error) {
    console.log({ error });

    next({
      status: 401,
      message: error.message,
    });
  }
};
