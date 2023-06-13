const { Router } = require("express");
const userController = require("../controllers/userController");
const { createUserSchema } = require("../validationSchemas/user");
const middlewares = require("../middlewares");

const userRouter = Router();

userRouter.post("/login", middlewares.isLoggedIn, userController.validateLogin);
userRouter.post(
  "/",
  middlewares.validateRequestBody(createUserSchema),
  userController.registerUser
);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;
