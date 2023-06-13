const Joi = require("joi");

const createCampusSchema = Joi.object({
  name: Joi.string().required().max(20).messages({
    "*": "El campo 'name' es requerido y debe tener un largo máximo de 20 caracteres",
  }),
  description: Joi.string().optional().max(200).messages({
    "*" : "El campo 'description' debe tener un largo máximo de 200 caracteres",
  }),
  address: Joi.string().required().max(300).messages({
    "*" : "El campo 'address' es requerido y debe tener un largo máximo de 300 caracteres",
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
});

const updateCampusSchema = Joi.object({
  name: Joi.string().optional().max(20).messages({
    "*": "El campo 'name' debe tener un largo máximo de 20 caracteres",
  }),
  description: Joi.string().optional().max(200).messages({
    "*" : "El campo 'description' debe tener un largo máximo de 200 caracteres",
  }),
  address: Joi.string().optional().max(300).messages({
    "*" : "El campo 'address' debe tener un largo máximo de 300 caracteres",
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
});

module.exports = {
  createCampusSchema,
  updateCampusSchema
};