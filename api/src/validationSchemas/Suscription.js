const Joi = require("joi");
const mongoose = require("mongoose");
const ObjecId = mongoose.Types.ObjectId;

const createSuscriptionSchema = Joi.object({
  userEmail: Joi.string().min(3).max(30).messages({
    "*": "El campo 'userEmail' es requerido y debe ser de tipo string",
  }),
  eventName: Joi.string().messages({
    "*": "El campo 'eventName' es requerido y debe ser de tipo String",
  }),
});

const updateSuscriptionSchema = Joi.object({
  id: Joi.string().messages({
    "*": "El campo 'id' debe ser requerido",
  }),
  userEmail: Joi.string().required().min(5).max(30).messages({
    "*": "El campo 'userEmail' es requerido y debe ser de tipo string entre 3-30",
  }),
  eventName: Joi.string().required().messages({
    "*": "El campo 'eventName' es requerido y debe ser de tipo String",
  }),
});

module.exports = {
  createSuscriptionSchema,
  updateSuscriptionSchema,
};
