const Joi = require("joi");
const { isValidPolygon } = require("../helpers");

// Definir el esquema de validación
const createFacultySchema = Joi.object({
  name: Joi.string().required().min(5).max(150).messages({
    "*": "El campo 'name' es requerido y debe tener entre 5 y 150 caracteres",
  }),
  description: Joi.string().optional().max(200).messages({
    "*": "El campo 'description' debe tener un máximo de 200 caracteres",
  }),
  dean: Joi.string().optional().max(150).messages({
    "*": "El campo 'dean' debe tener un máximo de 150 caracteres",
  }),
  polygons: Joi.required()
    .custom((polygons, helpers) => {
      if (!Array.isArray(polygons)) return helpers.error("any.invalid");

      for (const polygon of polygons) {
        if (!isValidPolygon(polygon)) return helpers.error("any.invalid");
      }

      return polygons;
    })
    .messages({ "*": "El campo 'polygons' debe ser un array de polígonos" }),
});

// Definir el esquema de validación
const updateFacultySchema = Joi.object({
  name: Joi.string().optional().min(5).max(150).messages({
    "*": "El campo 'name' debe ser un string de entre 5 y 150 caracteres",
  }),
  description: Joi.string().optional().max(200).messages({
    "*": "El campo 'description' debe tener un máximo de 200 caracteres",
  }),
  dean: Joi.string().optional().max(150).messages({
    "*": "El campo 'dean' debe tener un máximo de 150 caracteres",
  }),
  polygons: Joi.optional()
    .custom((polygons, helpers) => {
      if (!Array.isArray(polygons)) return helpers.error("any.invalid");

      for (const polygon of polygons) {
        if (!isValidPolygon(polygon)) return helpers.error("any.invalid");
      }

      return polygons;
    })
    .messages({
      "*": "El campo 'polygons' debe ser un array de polígonos geográficos",
    }),
});

module.exports = {
  createFacultySchema,
  updateFacultySchema,
};
