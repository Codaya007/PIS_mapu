const { Router } = require("express");
const nodeController = require("../controllers/nodeController");

const nodeRouter = Router();

/**
 * @route GET /
 * @desc Obtener todos los nodos
 * @access Public
 */
nodeRouter.get("/", nodeController.getAllNodes);

/**
 * @route GET /coordinates
 * @desc Obtener todas las coordenadas de nodos
 * @access Public
 */
nodeRouter.get("/coordinates", nodeController.getAllCoordinates);

/**
 * @route GET /:id
 * @desc Obtener el nodo por id
 * @access Public
 */
nodeRouter.get("/:id", nodeController.getNode);

module.exports = nodeRouter;
