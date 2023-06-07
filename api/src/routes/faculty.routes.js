const { Router } = require("express");
const facultyController = require("../controllers/facultyController");
const middlewares = require("../middlewares");
const { createFacultySchema } = require("../ValidationSchemas/Faculty");

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
 * @route GET /
 * @desc Obtener todas las facultades
 * @access Public
 */
facultyRouter.get("/", facultyController.getAllFaculties);

module.exports = facultyRouter;
