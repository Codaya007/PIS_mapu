const Joi = require("joi");

// Definir el esquema de validación para la creación de un Evento
const createEventSchema = Joi.object({
    name: Joi.string().required().messages({
        "*": "El campo 'name' es requerido",
    }),
    sinceDate: Joi.date().required().messages({
        "*": "El campo 'sinceDate' es requerido",
    }),
    untilDate: Joi.date().required().messages({
        "*": "El campo 'untilDate' es requerido",
    }),
    description: Joi.string().optional().messages({
        "*": "El campo 'description' es opcional",
    }),
    price: Joi.number().precision(2).required().messages({
        "*": "El campo 'price' es requerido y tiene una precisión de 2 (por ejemplo, 10.99, 5.50)",
    }),
});

// Definir el esquema de validación para la actualización de un Event
const updateEventSchema = Joi.object({
    id: Joi.string().strip().messages({
        "*": "El campo 'id' presente en la ruta de la petición. Se valida y se elimina el id",
    }),
    name: Joi.string().optional().messages({
        "*": "El campo 'name' es optional",
    }),
    sinceDate: Joi.date().optional().messages({
        "*": "El campo 'sinceDate' es optional",
    }),
    untilDate: Joi.date().optional().messages({
        "*": "El campo 'untilDate' es optional",
    }),
    description: Joi.string().optional().messages({
        "*": "El campo 'description' es opcional",
    }),
    price: Joi.number().precision(2).optional().messages({
        "*": "El campo 'price' es optional y tiene una precisión de 2 (por ejemplo, 10.99, 5.50)",
    }),
});

module.exports = {
    createEventSchema,
    updateEventSchema
};
