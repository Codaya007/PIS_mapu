const { Router } = require("express");
const typeController = require("../controllers/typeController");
const middlewares = require("../middlewares");
const typeRouter = Router();

const {
  createTypeSchema,
  updateTypeSchema,
} = require("../validationSchemas/Type");

/**
 * @route POST/
 * @desc Crear Type
 * @access Admin
 */
typeRouter.post(
  "/",
  middlewares.validateRequestBody(createTypeSchema),
  typeController.createType
);

/**
 * @route GET/
 * @des Obtener todos los tipos
 * @access Public
 */
typeRouter.get("/", typeController.getAllTypes);

/**
 * @route GET/:id
 * @des Obtener tipo por Id (/:id)
 * @access Public
 */
typeRouter.get("/:id", typeController.getTypeById);

/**
 * @route PUT/:id
 * @des Actualizar typo por id (/:id)
 * @access Admin
 */
typeRouter.put(
  "/:id",
  middlewares.validateRequestBody(updateTypeSchema),
  typeController.updateType
);

/**
 * @route DELETE/:id
 * @des Eliminar por id (/:id)
 * @access Admin
 */
typeRouter.delete("/:id", typeController.deleteType);

module.exports = typeRouter;