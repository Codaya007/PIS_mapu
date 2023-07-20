const Joi = require("joi");
const {
  createNodeSchema,
  validateCampus,
  validateCategory,
  updateNodeSchema,
} = require("./Node");

// Definir el esquema de validación para la creación de un Nodo de interes
const createNodeWithDetailSchema = createNodeSchema
  .keys({
    detail: Joi.object()
      .required()
      .keys({
        title: Joi.string().required().max(50).messages({
          "*": "El campo 'title' es requerido y debe tener hasta 50 caracteres",
        }),
        description: Joi.string().required().max(150).messages({
          "*": "El campo 'description' es requerido y debe tener hasta 150 caracteres",
        }),
        img: Joi.string().required().uri().messages({
          "*": "El campo 'img' es requerido y debe ser una url válida",
        }),
      })
      .messages({ "*": "El campo detail es requerido" }),
  })
  .external(validateCampus)
  .external(validateCategory);

// Definir el esquema de validación para la actualización de un Nodo de interés
const updateNodeWithDetailSchema = updateNodeSchema
  .keys({
    detail: Joi.object()
      .optional()
      .keys({
        _id: Joi.string().required().messages({
          "*": "El campo '_id' del detalle es requerido",
        }),
        title: Joi.string().optional().max(50).messages({
          "*": "El campo 'title' debe tener hasta 50 caracteres",
        }),
        description: Joi.string().optional().max(150).messages({
          "*": "El campo 'description' debe tener hasta 150 caracteres",
        }),
        img: Joi.string().optional().uri().messages({
          "*": "El campo 'img' debe ser una url válida",
        }),
      }),
  })
  .external(validateCategory)
  .external(validateCampus);

module.exports = {
  createNodeWithDetailSchema,
  updateNodeWithDetailSchema,
};
