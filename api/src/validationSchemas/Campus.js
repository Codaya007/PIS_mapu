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
  //accessPoints: Joi.required()
  //  .custom((accessPoints, helpers) => {
  //    if (!Array.isArray(accessPoints)) return helpers.error("any.invalid");

  //    for (const accessPoint in accessPoints) {
  //verificar cada accesspoint
  //    }

  //    return accessPoints;
  //  })
  //  .messages({
  //    "*" : "El campo 'accessPoints' ",
  //  }),
}).external(nameIsUnique);

const updateCampusSchema = Joi.object({
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
  id: Joi.string().required().custom(isValidObjectId).messages({
    "*": "Id no válido",
  }),
  //accessPoints: Joi.optional()
  //  .custom((accessPoints, helpers) => {
  //    if (!Array.isArray(accessPoints)) return helpers.error("any.invalid");

  //    for (const accessPoint in accessPoints) {
  //verificar cada accesspoint
  //    }

  //    return accessPoints;
  //  })
  //  .messages({
  //    "*" : "El campo 'accessPoints' ",
  //  }),
}).external(nameIsUnique);

module.exports = {
  createCampusSchema,
  updateCampusSchema,
};
