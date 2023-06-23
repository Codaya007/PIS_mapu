const { Router } = require("express");
const userController = require("../controllers/userController");
const isAdmin = require("../middlewares/isAdmin");

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
userRouter.put("/:id", isAdmin, userController.updateUser);

// No se podrá borrar usuarios, solo bloquearlos/retringirlos
/**
 * @route DELETE /:id
 * @desc Bloquear usuario por id
 * @access Private Admin
 */
// userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;
