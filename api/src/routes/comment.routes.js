const { Router } = require("express");
const commentController = require("../controllers/commentController");
const middlewares = require("../middlewares");
const { createCommentSchema, updateCommentSchema } = require("../validationSchemas/Comment");

const commentRouter = Router();

/**
 * @route POST /
 * @desc Crea un nuevo comentario con la información pasada por body
 * @access User
 */
commentRouter.post(
    "/",
    middlewares.validateRequestBody(createCommentSchema),
    commentController.createComment
);

/**
 * @route GET /
 * @desc Obtener todas los comentarios
 * @access Public
 */
commentRouter.get("/", commentController.getAllComments);

/**
 * @route GET /
 * @desc Obtener el comentario por el id
 * @access Admin
 */
commentRouter.get("/:id", commentController.getComment);

/**
 * @route PUT /
 * @desc Actualizar un commentario con la información pasada por body
 * @access User
 */
commentRouter.put(
    "/:id",
    middlewares.validateRequestBody(updateCommentSchema),
    commentController.updateComment
);

/**
 * @route DELETE /
 * @desc Eliminar un comentario mediante su id
 * @access Public
 */
commentRouter.delete(
    "/:id",
    commentController.deleteComment
);

module.exports = commentRouter;
