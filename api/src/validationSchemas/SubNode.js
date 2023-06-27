const Joi = require("joi");
const { isValidObjectId } = require("mongoose");

const createSubNodeSchema = Joi.object({
  latitude: Joi.string().required().messages({
    "*": "El campo latitude es requerido",
  }),
  longitude: Joi.string().required().messages({
    "*": "El campo latitude es requerido y debe ser string",
  }),
  name: Joi.string().required().messages({
    "*": "El campo name es requerido ",
  }),
  description: Joi.string().optional().messages({
    "*": "El campo description es requerido ",
  }),
  nomenclature: Joi.object({
    campus: Joi.string().required().messages({
      "*": "El campo nomenclature-campus es requerido ",
    }),
    floor: Joi.string().required().messages({
      "*": "El campo nomenclature-floor es requerido ",
    }),
    enviroment: Joi.string().required().messages({
      "*": "El campo nomenclature-enviroment es requerido ",
    }),
    subEnviroment: Joi.string().optional().messages({
      "*": "El campo nomenclature-subEnviroment es requerido ",
    }),
    block: Joi.string().required().messages({
      "*": "El campo description es requerido ",
    }),
  }),
});

const updateSubNodeSchema = Joi.object({
  id: Joi.string().required().custom(isValidObjectId).messages({
    "*": "Id no válido",
  }),
  latitude: Joi.string().required().messages({
    "*": "El campo latitude es requerido",
  }),
  longitude: Joi.string().required().messages({
    "*": "El campo latitude es requerido y debe ser string",
  }),
  name: Joi.string().required().messages({
    "*": "El campo name es requerido ",
  }),
  description: Joi.string().optional().messages({
    "*": "El campo description es requerido ",
  }),
  nomenclature: Joi.object({
    campus: Joi.string().required().messages({
      "*": "El campo nomenclature-campus es requerido ",
    }),
    floor: Joi.string().required().messages({
      "*": "El campo nomenclature-floor es requerido ",
    }),
    enviroment: Joi.string().required().messages({
      "*": "El campo nomenclature-enviroment es requerido ",
    }),
    subEnviroment: Joi.string().optional().messages({
      "*": "El campo nomenclature-subEnviroment es requerido ",
    }),
    block: Joi.string().required().messages({
      "*": "El campo description es requerido ",
    }),
  }),
});
module.exports = {
  createSubNodeSchema,
  updateSubNodeSchema,
};
