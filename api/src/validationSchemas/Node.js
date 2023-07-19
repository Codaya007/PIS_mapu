const Joi = require("joi");
// const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;
const Campus = require("../models/Campus");
const Category = require("../models/Category");

const validateCampus = async (value, helpers) => {
  const { campus } = value;

  if (campus) {
    const result = await Campus.findOne({ _id: campus });

    console.log({ campus, result });

    if (!result) {
      return helpers.error("any.invalid", {
        message: "El campus no existe",
      });
    }
  }

  return value;
};

const validateCategory = async (value, helpers) => {
  const { category } = value;

  if (category) {
    const result = await Category.findOne({ _id: category });

    if (!result) {
      return helpers.error("any.invalid", {
        message: "La categoria no existe",
      });
    }
  }

  return value;
};

// Definir el esquema de validación para la creación de un Nodo de interes
const createInterstingNodeSchema = Joi.object({
  latitude: Joi.number().required().min(-200).max(200).messages({
    "*": "El campo 'latitude' es requerido y debe ser de tipo number con un valor entre -200 y 200",
  }),
  longitude: Joi.number().required().min(-200).max(200).messages({
    "*": "El campo 'longitude' es requerido y debe ser de tipo number con un valor entre -200 y 200",
  }),
  available: Joi.boolean().required().messages({
    "*": "El campo 'available' es requerido",
  }),
  category: Joi.string().optional().messages({
    "*": "El campo 'category' es requerido",
  }),
  campus: Joi.string().required().messages({
    "*": "El campo 'campus' es requerido",
  }),
  adyacency: Joi.array()
    .optional()
    .items(
      Joi.object({
        latitude: Joi.number().min(-200).max(200).required(),
        longitude: Joi.number().min(-200).max(200).required(),
        // weight: Joi.number().optional().min(1).max(400),
      })
    ),
})
  .external(validateCampus)
  .external(validateCategory);

// Definir el esquema de validación para la actualización de un Nodo de interés
const updateInterstingNodeSchema = Joi.object({
  id: Joi.string().strip().messages({
    "*": "El campo 'id' presente en la ruta de la petición. Se valida y se elimina el id",
  }),
  latitude: Joi.number().optional().min(-200).max(200).messages({
    "*": "El campo 'latitude' es requerido y debe ser de tipo number con un valor entre -200 y 200",
  }),
  longitude: Joi.number().optional().min(-200).max(200).messages({
    "*": "El campo 'longitude' es requerido y debe ser de tipo number con un valor entre -200 y 200",
  }),
  available: Joi.boolean().optional().messages({
    "*": "El campo 'available' es requerido",
  }),
  campus: Joi.string().optional().messages({
    "*": "El campo 'campus' es requerido",
  }),
  category: Joi.string().optional().messages({
    "*": "El campo 'category' es requerido",
  }),
  adyacency: Joi.array()
    .optional()
    .items(
      Joi.object({
        latitude: Joi.number().min(-200).max(200).required(),
        longitude: Joi.number().min(-200).max(200).required(),
        // weight: Joi.number().optional().min(1).max(400),
      })
    ),
})
  .external(validateCategory)
  .external(validateCampus);

module.exports = {
  createInterstingNodeSchema,
  updateInterstingNodeSchema,
};
