const Joi = require("joi");
const Node = require("../models/Node");
const Type = require("../models/Type");
const Category = require("../models/Category");
const { isValidObjectId } = require("mongoose");

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
const validateCategory = async (value, helpers) => {
    const { category } = value;
    let result;
    if (category) {
        result = await Category.findOne({ "name": category })
    }

    if (!result) {
        return helpers.error("any.invalid", {
            message: "La categoria no existe",
        });
    }
    return value;
}


// Definir el esquema de validación para la creación de un Nodo de interes
const createInterstingNodeSchema = Joi.object({
    latitude: Joi.number().required().min(-200).max(200).messages({
        "*": "El campor 'latitude' es requerido y debe ser de tipo number con un valor entre -200 y 200"
    }),
    longitude: Joi.number().required().min(-200).max(200).messages({
        "*": "El campor 'longitude' es requerido y debe ser de tipo number con un valor entre -200 y 200"
    }),
    available: Joi.boolean().required().messages({
        "*": "El campor 'available' es requerido"
    }),
    type: Joi.string().required().messages({
        "*": "El campor 'available' es requerido"
    }),
    category: Joi.string().optional().messages({
        "*": "El campor 'available' es requerido"
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
}).external(validateType).external(validateCategory)

// Definir el esquema de validación
// const updateFacultySchema = Joi.object({
//     name: Joi.string()
//         .optional()
//         .min(5)
//         .max(150)
//         .external(nameIsUnique)
//         .messages({
//             "name.external": "Ya existe una facultad con este nombre",
//             "*": "El campo 'name' debe ser un string de entre 5 y 150 caracteres",
//         }),
//     description: Joi.string().allow("", null).optional().max(200).messages({
//         "*": "El campo 'description' debe tener un máximo de 200 caracteres",
//     }),
//     dean: Joi.string().allow("", null).optional().max(150).messages({
//         "*": "El campo 'dean' debe tener un máximo de 150 caracteres",
//     }),
//     id: Joi.string()
//         .required()
//         .custom(isValidObjectId)
//         .messages({ "*": "Id no válido" }),
//     polygons: Joi.optional()
//         .custom((polygons, helpers) => {
//             if (!Array.isArray(polygons)) return helpers.error("any.invalid");

//             for (const polygon of polygons) {
//                 if (!isValidPolygon(polygon)) return helpers.error("any.invalid");
//             }

//             return polygons;
//         })
//         .messages({
//             "*": "El campo 'polygons' debe ser un array de polígonos geográficos",
//         }),
// }).external(nameIsUnique);

module.exports = {
    createInterstingNodeSchema,
    // updateFacultySchema,
};
