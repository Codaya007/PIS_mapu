const Joi = require("joi");

const createUserSchema = Joi.object({
    name: Joi.string().required().min(3).max(25).messages({
        "*": "El campo name es requerido y debe tener entre 3 y 25 caracteres",
    }),
    lastname: Joi.string().required().min(3).max(25).messages({
        "*": "El campo lastname es requerido y debe tener entre 3 y 25 caracteres",
    }),
    email: Joi.string().required().min(5).max(30).messages({
        "*": "El campo email es requerido y debe tener entre 5 y 30 caracteres",
    }),
    avatar: Joi.string().optional().messages({
        "*" : "El campo avatar es invalido",
    }),
    password: Joi.string().required().min(5).max(30).messages({
        "*": "El campo password es requerido y debe tener entre 5 y 30 caracteres",
    }),
    role: Joi.string().optional().messages({
        "*" : "El campo role debe ser de Object tipe Id",
    })
});

module.exports = { createUserSchema };