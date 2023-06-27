const Comment = require("../models/Comment");
const NodeService = require("../services/nodeService")
const UserService = require("../services/userService")
const NotExist = require('../errors/NotExist');
const ValidationError = require("../errors/ValidationError");
const { isValidObjectId } = require("mongoose");

const createComment = async (commentData) => {
    validateNodeId(commentData.node)
    validateUserId(commentData.user)

    const userComments = await getCommentByUserId(commentData.user);
    const comment = userComments.find((comment) => comment.node == commentData.node);
    if (comment) throw new ValidationError("El usuario ya escribio un commentario a este nodo");

    const newComment = Comment.create(commentData);

    return newComment;

};

const getComments = async (where = {}, skip, limit) => {
    const comments = await Comment.find(where).skip(skip).limit(limit);

    return comments;
};

const validateNodeId = async (nodeId) => {
    NodeService.getNodeById(nodeId);

    return true;
}

const validateUserId = async (userId) => {
    UserService.getUserById(userId);

    return true;
}

const getCommentById = async (_id) => {
    if (!isValidObjectId(_id))
        throw new ValidationError("El id debe ser un ObjectId");

    const comment = await Comment.findOne({ _id });

    if (!comment) {
        throw new NotExist("Comentario no encontrado");
    }

    return comment;
};

const getCountComments = async (where = {}) => {
    return await Comment.count(where);
};

const updateCommentById = async (_id, commentData) => {
    let comment = await getCommentById(_id);

    comment = await Comment.updateOne({ _id }, commentData);

    return comment;
};

const deleteCommentById = async (_id) => {
    if (!isValidObjectId(_id)) throw new ValidationError("El id debe ser un ObjectId");

    const deletedComment = await Comment.findByIdAndRemove(_id);

    if (!deletedComment) throw new NotExist("Comentario no encontrado");
};

module.exports = { createComment, getComments, getCommentById, getCountComments, updateCommentById, deleteCommentById };
