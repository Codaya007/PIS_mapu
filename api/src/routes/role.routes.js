const {Router} = require('express');
const roleController = require("../controllers/roleController");
const middlewares = require("../middlewares");
const {createRoleSchema} =require("../validationSchemas/role");
const roleRouter = Router();

roleRouter.post("/",
    middlewares.validateRequestBody(createRoleSchema),
    roleController.createRole);

module.exports = roleRouter;