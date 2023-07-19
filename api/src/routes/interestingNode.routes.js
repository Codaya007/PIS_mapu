const { Router } = require("express");
const interestingNodeController = require("../controllers/interestingNodeController");
const middlewares = require("../middlewares");
const {
  createInterstingNodeSchema,
  updateInterstingNodeSchema,
} = require("../validationSchemas/InterestingNode");

const interestingNodeRouter = Router();

/**
 * @route POST /
 * @desc Crea un nuevo nodo de interes con la información pasada por body
 * @access Admin
 */
interestingNodeRouter.post(
  "/",
  middlewares.validateRequestBody(createInterstingNodeSchema),
  interestingNodeController.createInterestingNode
);

/**
 * @route GET /
 * @desc Obtener todos los nodos
 * @access Public
 */
interestingNodeRouter.get(
  "/",
  interestingNodeController.getAllInterestingNodes
);

/**
 * @route GET /:id
 * @desc Obtener el nodo por id
 * @access Public
 */
interestingNodeRouter.get("/:id", interestingNodeController.getInterestingNode);

/**
 * @route PUT /
 * @desc Actualizar un nodo con la información pasada por body
 * @access Admin
 */
interestingNodeRouter.put(
  "/:id",
  middlewares.validateRequestBody(updateInterstingNodeSchema),
  interestingNodeController.updateInterestingNode
);

/**
 * @route DELETE /
 * @desc Eliminar un nodo por id
 * @access Admin
 */
interestingNodeRouter.delete(
  "/:id",
  interestingNodeController.deleteInterestingNode
);

module.exports = interestingNodeRouter;
