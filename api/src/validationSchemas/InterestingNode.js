const Joi = require("joi");
const Node = require("../models/Node");
const Type = require("../models/Type");
const Category = require("../models/Category");
const { isValidObjectId } = require("mongoose");

const validateType = async (value, helpers) => {
  const { type } = value;
  let result;
  if (type) {
    result = await Type.findOne({ name: type });
  }

  if (!result) {
    return helpers.error("any.invalid", {
      message: "El tipo de nodo no existe",
    });
  }
  return value;
};
const validateCategory = async (value, helpers) => {
  const { category } = value;
  let result;
  if (category) {
    result = await Category.findOne({ name: category });
  }

  if (!result) {
    return helpers.error("any.invalid", {
      message: "La categoria no existe",
    });
  }
  return value;
};

// Definir el esquema de validación para la creación de un Nodo de interes
const createInterestingNodeSchema = Joi.object({
  latitude: Joi.number().required().min(-200).max(200).messages({
    "*": "El campor 'latitude' es requerido y debe ser de tipo number con un valor entre -200 y 200",
  }),
  longitude: Joi.number().required().min(-200).max(200).messages({
    "*": "El campor 'longitude' es requerido y debe ser de tipo number con un valor entre -200 y 200",
  }),
  available: Joi.boolean().required().messages({
    "*": "El campor 'available' es requerido",
  }),
  type: Joi.string().required().messages({
    "*": "El campor 'type' es requerido",
  }),
  category: Joi.string().optional().messages({
    "*": "El campor 'category' es requerido",
  }),
  sector: Joi.string()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .optional() //TODO: CAMBIAR A REQUIERED CUANDO SE ARREGLE LO DE SECTOR
    .messages({
      "*": "El campo 'sector' es requerido y debe ser un ID válido",
    }),
})
  .external(validateType)
  .external(validateCategory);

// Definir el esquema de validación para la actualización de un Nodo de interés
const updateInterestingNodeSchema = Joi.object({
  id: Joi.string().strip().messages({
    "*": "El campo 'id' presente en la ruta de la petición. Se valida y se elimina el id",
  }),
  latitude: Joi.number().optional().min(-200).max(200).messages({
    "*": "El campor 'latitude' es requerido y debe ser de tipo number con un valor entre -200 y 200",
  }),
  longitude: Joi.number().optional().min(-200).max(200).messages({
    "*": "El campor 'longitude' es requerido y debe ser de tipo number con un valor entre -200 y 200",
  }),
  available: Joi.boolean().optional().messages({
    "*": "El campor 'available' es requerido",
  }),
  category: Joi.string().optional().messages({
    "*": "El campor 'category' es requerido",
  }),
  sector: Joi.string()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .optional()
    .messages({
      "*": "El campo 'sector' es requerido y debe ser un ID válido",
    }),
}).external(validateCategory);

module.exports = {
  createInterestingNodeSchema,
  updateInterestingNodeSchema,
};
