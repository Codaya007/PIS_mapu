const Joi = require("joi");

const createRoleSchema = Joi.object({
    name: Joi.string().required().min(2).max(30).messages({
        "*": "El campo 'name' es requierido y debe contener entre 2-30 caracteres",
    }),
})

module.exports = { 
    createRoleSchema,
};