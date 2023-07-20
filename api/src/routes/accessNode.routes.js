const { Router } = require("express");
const accessNodeController = require("../controllers/accessNodeController");
const middlewares = require("../middlewares");
const {
  createNodeWithDetailSchema,
  updateNodeWithDetailSchema,
} = require("../validationSchemas/NodeWithDetail");

const accessNodeRouter = Router();

/**
 * @route POST /
 * @desc Crea un nuevo nodo de interes con la información pasada por body
 * @access Admin
 */
accessNodeRouter.post(
  "/",
  middlewares.validateRequestBody(createNodeWithDetailSchema),
  accessNodeController.createAccessNode
);

/**
 * @route GET /
 * @desc Obtener todos los nodos
 * @access Public
 */
accessNodeRouter.get("/", accessNodeController.getAllAccessNode);

/**
 * @route GET /:id
 * @desc Obtener el nodo por id
 * @access Public
 */
accessNodeRouter.get("/:id", accessNodeController.getAccessNodeById);

/**
 * @route PUT /
 * @desc Actualizar un nodo con la información pasada por body
 * @access Admin
 */
accessNodeRouter.put(
  "/:id",
  middlewares.validateRequestBody(updateNodeWithDetailSchema),
  accessNodeController.updateAccessNode
);

/**
 * @route DELETE /
 * @desc Eliminar un nodo por id
 * @access Admin
 */
accessNodeRouter.delete("/:id", accessNodeController.deleteAccessNode);

module.exports = accessNodeRouter;
