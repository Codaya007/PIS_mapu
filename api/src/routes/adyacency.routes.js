const { Router } = require("express");
const adyacencyController = require("../controllers/adyacencyController");
const middlewares = require("../middlewares");
const {
  createAdyacencySchema,
  deleteAdyacenciesSchema,
} = require("../validationSchemas/Adyacency");
const isAdmin = require("../policies/isAdmin");

const adyacencyRouter = Router();

/**
 * @route POST /
 * @desc Crear nueva adyacencies
 * @access Private Admin
 */
adyacencyRouter.post(
  "/",
  isAdmin,
  middlewares.validateRequestBody(createAdyacencySchema),
  adyacencyController.createAdyacency
);

/**
 * @route GET /
 * @desc Obtener todas las adyacencies
 * @access Public
 */
adyacencyRouter.get("/", adyacencyController.getAllAdyacencies);

/**
 * @route GET /
 * @desc Obtener todas las adyacencias de un nodo
 * @access Public
 */
adyacencyRouter.get("/:node", adyacencyController.getAdyacenciesByNode);

/**
 * @route DELETE /
 * @desc Eliminar las adyacencias
 * @access Private Admin
 */
adyacencyRouter.delete(
  "/",
  isAdmin,
  middlewares.validateRequestBody(deleteAdyacenciesSchema),
  adyacencyController.deleteAdyacencies
);

module.exports = adyacencyRouter;
