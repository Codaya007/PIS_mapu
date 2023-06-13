const { Router } = require("express");
const facultyController = require("../controllers/facultyController");
const middlewares = require("../middlewares");
const {
  createFacultySchema,
  updateFacultySchema,
} = require("../ValidationSchemas/Faculty");

const facultyRouter = Router();

/**
 * @route POST /
 * @desc Crea una nueva facultad con la información pasada por body
 * @access Admin
 */
facultyRouter.post(
  "/",
  middlewares.validateRequestBody(createFacultySchema),
  facultyController.createFaculty
);

/**
 * @route PUT /:id
 * @desc Actualizar una facultad existente por id
 * @access Admin
 */
facultyRouter.put(
  "/:id",
  middlewares.validateRequestBody(updateFacultySchema),
  facultyController.createFaculty
);

/**
 * @route GET /
 * @desc Obtener todas las facultades
 * @access Public
 */
facultyRouter.get("/", facultyController.getAllFaculties);

/**
 * @route GET /:id
 * @desc Obtener detalle de una facultad por id
 * @access Public
 */
facultyRouter.get("/:id", facultyController.getFacultyById);

module.exports = facultyRouter;
