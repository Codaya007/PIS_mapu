const { Router } = require("express");
const nodeController = require("../controllers/nodeController");
const middlewares = require("../middlewares");
const { createInterstingNodeSchema } = require("../validationSchemas/InterstingNode");

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

// /**
//  * @route PUT /
//  * @desc Actualizar un bloque con la información pasada por body
//  * @access Admin
//  */
// nodeRouter.put( 
//     "/:number",
//     middlewares.validateRequestBody(updateBlockSchema),
//     nodeController.updateBlock
// );

// /**
//  * @route DELETE /
//  * @desc Eliminar un bloque mediante su numero de bloque
//  * @access Admin
//  */
// nodeRouter.delete( 
//     "/:number",
//     nodeController.deleteBlock
// );

module.exports = nodeRouter;
