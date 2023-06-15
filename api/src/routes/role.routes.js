const { Router } = require("express");
const roleController = require("../controllers/roleController");
const middlewares = require("../middlewares");
const { createRoleSchema } = require("../validationSchemas/role");
const roleRouter = Router();

roleRouter.post(
  "/",
  middlewares.validateRequestBody(createRoleSchema),
  roleController.createRole
);
roleRouter.get("/", roleController.getRole);
roleRouter.get("/all", roleController.getAllRoles);
roleRouter.put("/:id", roleController.updateRole);
roleRouter.delete("/:id", roleController.deleteRole);
module.exports = roleRouter;
