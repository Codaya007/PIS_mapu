const { Router } = require("express");
const accessNodeController = require("../controllers/accessNodeController");
const middlewares = require("../middlewares");
const isAdmin = require("../policies/isAdmin");
const isLoggedIn = require("../policies/isLoggedIn");

// const { acc } = require("../validationSchemas/");

const accessNodeRouter = Router();

/**
 * @route POST /
 * @desc Crear subnodo
 * @access Administrador
 */

accessNodeRouter.post(
  "/",
  isAdmin,
  accessNodeController.createAccessNode
  // middlewares.validateRequestBody()
);

/**
 * @route GET /
 * @desc Obtener nodoDeAcceso
 * @access Administrador
 */

accessNodeRouter.get("/:id", isAdmin, accessNodeController.getAccessNodeById);

/**
 * @route GET /
 * @route Obtener todos los nodos de acceso
 * @access Public
 */

accessNodeRouter.get("/", isLoggedIn, accessNodeController.getAllAccessNode);

/**
 * @route PUT /:id
 * @desc Actualizar nodo de entrada
 * @access Admin
 */
accessNodeRouter.put("/:id", isAdmin, accessNodeController.updateAccessNode);

/**
 * @route DELETE /:id
 * @desc Eliminar nodo
 * @access Admin
 */
accessNodeRouter.delete("/:id", isAdmin, accessNodeController.deleteAccessNode);

module.exports = accessNodeRouter;
