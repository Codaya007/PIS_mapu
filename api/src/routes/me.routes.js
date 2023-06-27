const { Router } = require("express");
const isLoggedIn = require("../policies/isLoggedIn");
const meController = require("../controllers/meController");

const meRouter = Router();

/**
 * @route GET /
 * @desc Obtener perfil personal
 * @access Private User
 */
meRouter.get("/", isLoggedIn, meController.getMyProfile);

/**
 * @route PUT /
 * @desc Actualizar perfil de usuario
 * @access Private User
 */
meRouter.put("/", isLoggedIn, meController.updateProfile);

module.exports = meRouter;
