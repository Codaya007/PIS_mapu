const Joi = require("joi");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Definir el esquema de validación para la creación de un bloque
const createBlockSchema = Joi.object({
  number: Joi.number().required().messages({
    "*": "El campo 'number' es requerido",
  }),
  available: Joi.boolean().required().default(true).messages({
    "*": "El campo 'available' es requerido y por defecto es 'true'",
  }),
  faculty: Joi.string()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required()
    .messages({
      "*": "El campo 'faculty' es requerido y debe ser un ID válido",
    }),
});

// Definir el esquema de validación para la actualización de un bloque
const updateBlockSchema = Joi.object({
  number: Joi.number().optional().messages({
    "*": "El campo 'number' es opcional", //? Posible error por usar una palabra reservada
  }),
  available: Joi.boolean().optional().default(true).messages({
    "*": "El campo 'available' es opcional y por defecto es 'true'",
  }),
  faculty: Joi.string()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .optional()
    .messages({
      "*": "El campo 'faculty' es opcional y debe ser un ID válido",
    }),
});

module.exports = {
  createBlockSchema,
  updateBlockSchema,
};
