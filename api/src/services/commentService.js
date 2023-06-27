const Comment = require("../models/Comment");
//TODO: IMPORTAR LOS SERVICIOS DE NODO Y USUARIO
const NotExist = require('../errors/NotExist');
const ValidationError = require("../errors/ValidationError");

const createComment = async (commentData) => {
    //TODO: VALIDAR LOS ID DE USUARIO Y NODO (LLAMAR A LOS SERVICIOS DE NODO Y USUARIO)

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

const getCommentById = async (_id) => {
    if (!isValidObjectId(_id))
        throw new ValidationError("El id debe ser un ObjectId");

    const comment = await Comment.findOne({ _id });

    if (!comment) {
        throw new NotExist("Comentario no encontrado");
    }

    return comment;
};

const getCommentByNodeId = async (nodeId) => {
    if (!isValidObjectId(nodeId)) throw new ValidationError("El id debe ser un ObjectId");

    //TODO: VALIDAR QUE EL ID DEL NODO EXISTA

    const comment = await Comment.find({ "node": nodeId });

    return comment;
};

const getCommentByUserId = async (userId) => {
    if (!isValidObjectId(userId)) throw new ValidationError("El id debe ser un ObjectId");

    //TODO: VALIDAR QUE EL ID DEL USUARIO EXISTA

    const comment = await Comment.find({ "user": userId });

    return comment;
};

const getCountComments = async (where = {}) => {
    return await Comment.count(where);
};

const updateCommentByNumber = async (_id, commentData) => {
    let comment = await getCommentById(_id);

    comment = await Comment.updateOne({ _id }, commentData);

    return comment;
};

const deleteCommentById = async (_id) => {
    if (!isValidObjectId(_id)) throw new ValidationError("El id debe ser un ObjectId");

    const deletedComment = await Comment.findByIdAndRemove(_id);

    if (!deletedComment) throw new NotExist("Comentario no encontrado");
};

module.exports = { createComment, getComments, getCommentById, getCommentByNodeId, getCommentByUserId, getCountComments, updateCommentByNumber, deleteCommentById };
