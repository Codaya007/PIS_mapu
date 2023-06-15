const { Router } = require("express");
const authController = require("../controllers/authController");
const middlewares = require("../middlewares");
const {
  loginSchema,
  registerUserSchema,
} = require("../validationSchemas/Auth");

const authRouter = Router();

/**
 * @route POST /login
 * @desc Iniciar sesión
 * @access Public
 */
authRouter.post(
  "/login",
  middlewares.validateRequestBody(loginSchema),
  authController.loginUser
);

/**
 * @route POST /register
 * @desc Registrar nuevo usuario normal
 * @access Public
 */
authRouter.post(
  "/register",
  middlewares.validateRequestBody(registerUserSchema),
  authController.registerUser
);

module.exports = authRouter;
