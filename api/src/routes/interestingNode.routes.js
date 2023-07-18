const { Router } = require("express");
const nodeController = require("../controllers/nodeController");
const middlewares = require("../middlewares");
const {
  createInterstingNodeSchema,
  updateInterstingNodeSchema,
} = require("../validationSchemas/InterestingNode");

const nodeRouter = Router();

/**
 * @route POST /
 * @desc Crea un nuevo nodo de interes con la información pasada por body
 * @access Admin
 */
nodeRouter.post(
  "/",
  middlewares.validateRequestBody(createInterstingNodeSchema),
  nodeController.createNode
);

nodeRouter.post("/time", nodeController.timeBetween);

/**
 * @route GET /
 * @desc Obtener todos los nodos
 * @access Public
 */
nodeRouter.get("/", nodeController.getAllNodes);

/**
 * @route GET /
 * @desc Obtener el nodo por id
 * @access Public
 */
nodeRouter.get("/:id", nodeController.getNode);

/**
 * @route PUT /
 * @desc Actualizar un nodo con la información pasada por body
 * @access Admin
 */
nodeRouter.put(
  "/:id",
  middlewares.validateRequestBody(updateInterstingNodeSchema),
  nodeController.updateNode
);

/**
 * @route DELETE /
 * @desc Eliminar un nodo por id
 * @access Admin
 */
nodeRouter.delete("/:id", nodeController.deleteNode);

module.exports = nodeRouter;
