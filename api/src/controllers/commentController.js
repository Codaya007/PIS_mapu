const commentService = require("../services/commentService.js");

module.exports = {

    getComment: async (req, res) => {
        const { id } = req.params;

        const comment = await commentService.getCommentById(id)

        if (!comment) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }

        res.json(comment);
    },

    getAllComments: async (req, res) => {
        const { skip = 0, limit = 10, ...where } = req.query;

        const totalCount = await commentService.getCountComments(where);
        const results = await commentService.getComments(where, skip, limit);

        return res.json({ totalCount, results });
    },

    createComment: async (req, res, next) => {
        const newComment = await commentService.createComment(req.body);

        return res.json(newComment);
    },

    updateComment: async (req, res, next) => {
        const { id } = req.params;

        const comment = await commentService.updateCommentById(id, req.body);

        res.json(comment);
    },

    deleteComment: async (req, res, next) => {
        const { id } = req.params;

        const comment = await commentService.deleteCommentById(id);

        res.json(comment);
    },
};
