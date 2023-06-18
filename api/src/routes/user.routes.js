const { Router } = require("express");
const userController = require("../controllers/userController");

const userRouter = Router();

/**
 * @route GET /
 * @desc Obtener todos los usuarios
 * @access Public
 */
userRouter.get("/", userController.getAllUsers);

/**
 * @route GET /:id
 * @desc Obtener usuario por id (/:id)
 * @access Public
 */
userRouter.get("/:id", userController.getUserById);

/**
 * @route PUT /:id
 * @desc Actualizar usuario por id (/:id)
 * @access Admin
 */
userRouter.put("/:id", userController.updateUser);

/**
 * @route DELETE /:id
 * @desc Eliminar usuario por id (/:id)
 * @access Admin
 */
userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;
