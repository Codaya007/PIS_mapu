const Joi = require("joi");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Definir el esquema de validación para la creación de un comentario
const createCommentSchema = Joi.object({
    content: Joi.string().required().messages({
        "*": "El campo 'content' es requerido",
    }),
    user: Joi.string()
        .custom((value, helpers) => {
            if (!ObjectId.isValid(value)) {
                return helpers.error("any.invalid");
            }
            return value;
        })
        .required()
        .messages({
            "*": "El campo 'user' es requerido y debe ser un ID válido",
        }),
    node: Joi.string()
        .custom((value, helpers) => {
            if (!ObjectId.isValid(value)) {
                return helpers.error("any.invalid");
            }
            return value;
        })
        .required()
        .messages({
            "*": "El campo 'user' es requerido y debe ser un ID válido",
        }),
});

module.exports = {
    createCommentSchema
};
