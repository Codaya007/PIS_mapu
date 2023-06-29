const Joi = require("joi");
const Campus = require("../models/Campus");
const { isValidObjectId } = require("mongoose");

const nameIsUnique = async (value, helpers) => {
  const { name, id } = value;
  if (name) {
    const where = { name };
    if (id) where.id = { "!=": id };

    const campus = await Campus.findOne(where);

    if (campus)
      return helpers.error("any.invalid", {
        message: "Ya existe un Campus con este nombre",
      });
  }

  return value;
};

const createCampusSchema = Joi.object({
  name: Joi.string().required().max(20).messages({
    "string.external": "Ya existe un Campus con ese nombre",
    "*": "El campo 'name' es requerido y debe tener un largo máximo de 20 caracteres",
  }),
  description: Joi.string().optional().max(200).messages({
    "*": "El campo 'description' debe tener un largo máximo de 200 caracteres",
  }),
  address: Joi.string().required().max(300).messages({
    "*": "El campo 'address' es requerido y debe tener un largo máximo de 300 caracteres",
  }),
  accessPoints: Joi.array()
    .required()
    .min(1)
    .max(4)
    .items(
      Joi.array()
        .length(2)
        .items(Joi.string().required(), Joi.string().required())
    )
    .messages({
      "*": "El campo 'accessPoint' es requerido y debe tener una longitud entre 1-4 ",
    }),
}).external(nameIsUnique);

const updateCampusSchema = Joi.object({
  id: Joi.string().required().custom(isValidObjectId).messages({
    "*": "Id no válido",
  }),
  name: Joi.string().optional().max(20).external(nameIsUnique).messages({
    "name.external": "Ya existe un campus con este nombre",
    "*": "El campo 'name' debe tener un largo máximo de 20 caracteres",
  }),
  description: Joi.string().optional().max(200).messages({
    "*": "El campo 'description' debe tener un largo máximo de 200 caracteres",
  }),
  address: Joi.string().optional().max(300).messages({
    "*": "El campo 'address' debe tener un largo máximo de 300 caracteres",
  }),
  accessPoints: Joi.array()
    .required()
    .min(1)
    .max(4)
    .items(
      Joi.array()
        .length(2)
        .items(Joi.string().required(), Joi.string().required())
    )
    .messages({
      "*": "El campo 'accessPoint' es requerido y debe tener una longitud entre 1-4 con los valores de latitud y longitud",
    }),
}).external(nameIsUnique);

module.exports = {
  createCampusSchema,
  updateCampusSchema,
};
