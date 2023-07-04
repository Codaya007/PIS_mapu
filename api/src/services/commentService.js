const Comment = require("../models/Comment");
const nodeService = require("../services/nodeService");
const userService = require("../services/userService");
const NotExist = require("../errors/NotExist");
const ValidationError = require("../errors/ValidationError");
const { isValidObjectId } = require("mongoose");
const constants = require("../constants/index")

const createComment = async (commentData) => {
  validateNode(commentData.node);
  validateUser(commentData.user);

  const userComments = await getCountComments({
    user: commentData.user,
    node: commentData.node,
  });

  if (userComments) {
    throw new ValidationError(
      "Ya se escribió un comentario para este punto de interés"
    );
  }

  const newComment = await Comment.create(commentData);

  return newComment;
};

const getComments = async (where = {}, skip, limit, mobile) => {
  await applyRegex(where, mobile);
  const comments = await Comment.find(where).skip(skip).limit(limit);

  return comments;
};

const validateNode = async (nodeId) => {
  const node = await nodeService.getNodeById(nodeId);
  if (node.type != constants.INTEREST_NODO_TYPE) {
    throw new ValidationError("El comentario debe escribirse en un Nodo de Interes")
  }

  return true;
};

const validateUser = async (userId) => {
  const user = await userService.getUserById(userId);
  if (user.bloqued == true) {
    throw new ValidationError('El usuario se encuentra bloqueado')
  }

  return true;
};

const applyRegex = async (where, mobile) => {
  if (mobile === 'true') {
    where.hide = false
  }
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

const getCountComments = async (where = {}, mobile) => {
  await applyRegex(where, mobile);
  return await Comment.count(where);
};

const updateCommentById = async (_id, newInfo) => {
  await getCommentById(_id);

  const updatedComment = await Comment.findByIdAndUpdate(_id, newInfo, {
    new: true,
  });

  return updatedComment;
};

const deleteCommentById = async (_id) => {
  if (!isValidObjectId(_id))
    throw new ValidationError("El id debe ser un ObjectId");

  const deletedComment = await Comment.findByIdAndRemove(_id);

  if (!deletedComment) throw new NotExist("Comentario no encontrado");
  
  return deletedComment;
};

module.exports = {
  createComment,
  getComments,
  getCommentById,
  getCountComments,
  updateCommentById,
  deleteCommentById,
};
