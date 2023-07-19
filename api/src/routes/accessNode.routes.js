const { Router } = require("express");
const accessNodeController = require("../controllers/accessNodeController");
const middlewares = require("../middlewares");
const {
  createInterstingNodeSchema,
  updateInterstingNodeSchema,
} = require("../validationSchemas/AccessNode");

const accessNodeRouter = Router();

/**
 * @route POST /
 * @desc Crea un nuevo nodo de interes con la información pasada por body
 * @access Admin
 */
accessNodeRouter.post(
  "/",
  middlewares.validateRequestBody(createInterstingNodeSchema),
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
  middlewares.validateRequestBody(updateInterstingNodeSchema),
  accessNodeController.updateAccessNode
);

/**
 * @route DELETE /
 * @desc Eliminar un nodo por id
 * @access Admin
 */
accessNodeRouter.delete("/:id", accessNodeController.deleteAccessNode);

module.exports = accessNodeRouter;
