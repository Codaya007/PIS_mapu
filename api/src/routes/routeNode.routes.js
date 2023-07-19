const { Router } = require("express");
const routeNodeController = require("../controllers/routeNodeController");
const middlewares = require("../middlewares");
const {
  createInterstingNodeSchema,
  updateInterstingNodeSchema,
} = require("../validationSchemas/RouteNode");

const routeNodeRouter = Router();

/**
 * @route POST /
 * @desc Crea un nuevo nodo de interes con la información pasada por body
 * @route Admin
 */
routeNodeRouter.post(
  "/",
  middlewares.validateRequestBody(createInterstingNodeSchema),
  routeNodeController.createRouteNode
);

/**
 * @route GET /
 * @desc Obtener todos los nodos
 * @route Public
 */
routeNodeRouter.get("/", routeNodeController.getAllRouteNode);

/**
 * @route GET /:id
 * @desc Obtener el nodo por id
 * @route Public
 */
routeNodeRouter.get("/:id", routeNodeController.getRouteNodeById);

/**
 * @route PUT /
 * @desc Actualizar un nodo con la información pasada por body
 * @route Admin
 */
routeNodeRouter.put(
  "/:id",
  middlewares.validateRequestBody(updateInterstingNodeSchema),
  routeNodeController.updateRouteNode
);

/**
 * @route DELETE /
 * @desc Eliminar un nodo por id
 * @route Admin
 */
routeNodeRouter.delete("/:id", routeNodeController.deleteRouteNode);

module.exports = routeNodeRouter;
