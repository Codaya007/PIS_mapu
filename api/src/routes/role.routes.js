const { Router } = require("express");
const roleController = require("../controllers/roleController");
const middlewares = require("../middlewares");
const { createRoleSchema } = require("../validationSchemas/Role");
const roleRouter = Router();

/**
 * @route GET /
 * @desc Obtener rol por id
 * @access Admin
 */
roleRouter.get("/:id", roleController.getRoleById);

/**
 * @route GET /
 * @desc Obtener todos los roles
 * @access Public
 */
roleRouter.get("/", roleController.getAllRoles);

/**
 * @route POST /
 * @desc Crear rol
 * @access Admin
 */
roleRouter.post(
  "/",
  middlewares.validateRequestBody(createRoleSchema),
  roleController.createRole
);

/**
 * @route GET /
 * @desc Actuaizar role por id
 * @access Public
 */
roleRouter.put("/:id", roleController.updateRole);

/**
 * @route GET /
 * @desc Eliminar rol por id
 * @access Public
 */
roleRouter.delete("/:id", roleController.deleteRole);

module.exports = roleRouter;
