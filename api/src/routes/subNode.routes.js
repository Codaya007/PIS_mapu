const { Router } = require("express");
const subNodeController = require("../controllers/subNodeController.js");
const middlewares = require("../middlewares");
const {
  createSubNodeSchema,
  updateSubNodeSchema,
} = require("../validationSchemas/SubNode.js");
const subNodeRouter = Router();

subNodeRouter.post(
  "/",
  middlewares.validateRequestBody(createSubNodeSchema),
  subNodeController.createSubNode
);

subNodeRouter.get("/", subNodeController.getAllSubNodes);

subNodeRouter.get("/:id", subNodeController.getSubNodeById);

subNodeRouter.put(
  "/:id",
  middlewares.validateRequestBody(updateSubNodeSchema),
  subNodeController.updateSubNode
);

subNodeRouter.delete("/:id", subNodeController.deleteSubNode);

module.exports = subNodeRouter;
