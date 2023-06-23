const Joi = require("joi");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Definir el esquema de validación para la creación de un Punto perdido
const createLostPointSchema = Joi.object({
    latitude: Joi.string()
        .custom((value, helpers) => {
            if (!ObjectId.isValid(value)) {
                return helpers.error("any.invalid");
            }
            return value;
        })
        .required()
        .messages({
            "*": "El campo 'latitude' es requerido y debe ser un ID válido",
        }),
    length: Joi.string()
        .custom((value, helpers) => {
            if (!ObjectId.isValid(value)) {
                return helpers.error("any.invalid");
            }
            return value;
        })
        .required()
        .messages({
            "*": "El campo 'length' es requerido y debe ser un ID válido",
        }),
});

module.exports = {
    createLostPointSchema
};
