const Joi = require("joi");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Definir el esquema de validación para la creación de un Reporte
const createReportSchema = Joi.object({
    node: Joi.string()
        .custom((value, helpers) => {
            if (!ObjectId.isValid(value)) {
                return helpers.error("any.invalid");
            }
            return value;
        })
        .optional()
        .messages({
            "*": "El campo 'node' es opcional y debe ser un ID válido",
        }),
    subnode: Joi.string()
        .custom((value, helpers) => {
            if (!ObjectId.isValid(value)) {
                return helpers.error("any.invalid");
            }
            return value;
        })
        .optional()
        .messages({
            "*": "El campo 'subnode' es opcional y debe ser un ID válido",
        }),
    comment: Joi.string().optional().default("").messages({
        "*": "El campo 'comment' es opcional",
    }),
    revised: Joi.boolean().required().messages({
        "*": "El campo 'revised' es opcional",
    }),
    lostPoint: Joi.object({
        latitude: Joi.number().min(-200).max(200).required(),
        length: Joi.number().min(-200).max(200).required(),
    }).optional().messages({
        "*": "El campo 'lostPoint' es opcional y debe ser un objeto con las propiedades 'latitude' y 'length'",
    }),
});

// Definir el esquema de validación para la actualización de un Reporte
const updateReportSchema = Joi.object({
    id: Joi.string().strip().messages({
        "*": "El campo 'id' presente en la ruta de la petición. Se valida y se elimina el id",
    }),
    revised: Joi.boolean().required().messages({
        "*": "El campo 'revised' es requerido",
    }),
});

module.exports = {
    createReportSchema,
    updateReportSchema
};
