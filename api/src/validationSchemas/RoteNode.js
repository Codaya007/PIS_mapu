const Joi = require("joi");
const Type = require("../models/Type");

const validateType = async (value, helpers) => {
    const { type } = value;
    let result;
    if (type) {
        result = await Type.findOne({ "name": type })
    }

    if (!result) {
        return helpers.error("any.invalid", {
            message: "El tipo de nodo no existe",
        });
    }
    return value;
}


// Definir el esquema de validación para la creación de un Nodo de ruta
const createRouteNodeSchema = Joi.object({
    latitude: Joi.number().required().min(-200).max(200).messages({
        "*": "El campor 'latitude' es requerido y debe ser de tipo number con un valor entre -200 y 200"
    }),
    longitude: Joi.number().required().min(-200).max(200).messages({
        "*": "El campor 'longitude' es requerido y debe ser de tipo number con un valor entre -200 y 200"
    }),
    type: Joi.string().required().messages({
        "*": "El campor 'type' es requerido"
    }),
    sector: Joi.string()
        .custom((value, helpers) => {
            if (!ObjectId.isValid(value)) {
                return helpers.error("any.invalid");
            }
            return value;
        })
        .optional() //TODO: CAMBIAR A REQUIERED CUANDO SE ARREGLE LO DE SECTOR
        .messages({
            "*": "El campo 'sector' es requerido y debe ser un ID válido",
        }),
}).external(validateType)

// Definir el esquema de validación para la actualización de un Nodo de ruta
const updateRouteNodeSchema = Joi.object({
    id: Joi.string().strip().messages({
        "*": "El campo 'id' presente en la ruta de la petición. Se valida y se elimina el id",
    }),
    latitude: Joi.number().optional().min(-200).max(200).messages({
        "*": "El campor 'latitude' es requerido y debe ser de tipo number con un valor entre -200 y 200"
    }),
    longitude: Joi.number().optional().min(-200).max(200).messages({
        "*": "El campor 'longitude' es requerido y debe ser de tipo number con un valor entre -200 y 200"
    }),
    sector: Joi.string()
        .custom((value, helpers) => {
            if (!ObjectId.isValid(value)) {
                return helpers.error("any.invalid");
            }
            return value;
        })
        .optional() 
        .messages({
            "*": "El campo 'sector' es requerido y debe ser un ID válido",
        }),
})

module.exports = {
    createRouteNodeSchema,
    updateRouteNodeSchema,
};
