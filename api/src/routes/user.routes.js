const { Router } = require("express");
const userController = require("../controllers/userController");
const { editUserSchema } = require("../validationSchemas/user");
const middlewares = require("../middlewares");
const isAdmin = require("../policies/isAdmin");

const userRouter = Router();

/**
 * @route GET /
 * @desc Obtener todos las usuarios
 * @access Private Admin
 */
userRouter.get("/", isAdmin, userController.getAllUsers);

/**
 * @route GET /:id
 * @desc Obtener usuario por id
 * @access Private Admin
 */
userRouter.get("/:id", isAdmin, userController.getUserById);

/**
 * @route PUT /:id
 * @desc Actualizar usuario por id
 * @access Private Admin
 */
userRouter.put(
  "/:id",
  middlewares.validateRequestBody(editUserSchema),
  isAdmin,
  userController.updateUser
);

// No se podrá borrar usuarios, solo bloquearlos/retringirlos
/**
 * @route DELETE /:id
 * @desc Bloquear usuario por id
 * @access Private Admin
 */
userRouter.delete("/:id", isAdmin, userController.deleteUser);

module.exports = userRouter;
