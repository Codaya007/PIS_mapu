const Joi = require("joi");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Definir el esquema de validación para la creación de un Reporte
const createReportSchema = Joi.object({
    //TODO: REFERENCIAR CON EL MODELO AL NODE Y SUBNODE
    node: Joi.number().optional().messages({
        "*": "El campo 'node' es opcional",
    }),
    subnode: Joi.number().optional().messages({
        "*": "El campo 'subnode' es opcional",
    }),
    comment: Joi.string().optional().default("").messages({
        "*": "El campo 'comment' es opcional",
    }),
    revised: Joi.boolean().required().messages({
        "*": "El campo 'revised' es opcional",
    }),
    lostPoint: Joi.string()
        .custom((value, helpers) => {
            if (!ObjectId.isValid(value)) {
                return helpers.error("any.invalid");
            }
            return value;
        })
        .required()
        .messages({
            "*": "El campo 'lostPoint' es requerido y debe ser un ID válido",
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
