const { Router } = require("express");
const campusController = require("../controllers/campusController");
const middlewares = require("../middlewares");
const { createCampusSchema, updateCampusSchema } = require("../validationSchemas/Campus");

const campusRouter = Router();

/**
 * @route POST /
 * @desc Crea un campus con la información pasada por body
 * @access Admin
 */
campusRouter.post(
  "/",
  middlewares.validateRequestBody(createCampusSchema),
  campusController.createCampus
);

/**
 * @route PUT /:id
 * @desc Actualiza el campus con la información pasada por el body
 * donde el id coincide con el brindado
 * @access Admin
 */
campusRouter.put(
  "/:id",
  middlewares.validateRequestBody(updateCampusSchema),
  campusController.updateCampusById
);

/**
 * @route DELETE /:id
 * @desc Elimina un campus donde el id brindado coincida
 * @access Admin
 */
campusRouter.delete(
  "/:id",
  campusController.deleteCampusById
);

/**
 * @route DELETE /
 * @desc Elimina un campus donde coincida la Query pasada por body
 * @access Admin
 */
campusRouter.delete(
  "/",
  campusController.deleteCampus
);

/**
 * @route GET /
 * @desc Obtiene todos los campos registrados
 * @access Public
 */
campusRouter.get(
  "/",
  campusController.getAllCampus
);

/**
 * @route GET /:id
 * @desc Obtiene el campus que coincide con el id brindado
 * @access Public
 */
campusRouter.get(
  "/:id",
  campusController.getCampusById
);

module.exports = campusRouter;