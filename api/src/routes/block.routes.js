const { Router } = require("express");
const blockController = require("../controllers/blockController");
const middlewares = require("../middlewares");
const { createBlockSchema, updateBlockSchema } = require("../validationSchemas/Block");

const blockRouter = Router();

/**
 * @route POST /
 * @desc Crea un nuevo bloque con la información pasada por body
 * @access Admin
 */
blockRouter.post(
    "/",
    middlewares.validateRequestBody(createBlockSchema),
    blockController.createBlock
);

/**
 * @route GET /
 * @desc Obtener todas los bloques
 * @access Public
 */
blockRouter.get("/", blockController.getAllBlocks);

/**
 * @route GET /
 * @desc Obtener el bloque por el numero
 * @access Public
 */
blockRouter.get("/:number", blockController.getBlock);

/**
 * @route PUT /
 * @desc Actualizar un bloque con la información pasada por body
 * @access Admin
 */
blockRouter.put( 
    "/:number",
    middlewares.validateRequestBody(updateBlockSchema),
    blockController.updateBlock
);

/**
 * @route DELETE /
 * @desc Eliminar un bloque mediante su numero de bloque
 * @access Admin
 */
blockRouter.delete( 
    "/:number",
    blockController.deleteBlock
);

module.exports = blockRouter;
