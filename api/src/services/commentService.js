const Comment = require("../models/Comment");
const nodeService = require("../services/nodeService");
const userService = require("../services/userService");
const NotExist = require("../errors/NotExist");
const ValidationError = require("../errors/ValidationError");
const { isValidObjectId } = require("mongoose");

const createComment = async (commentData) => {
  validateNodeId(commentData.node);
  validateUserId(commentData.user);

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

const getComments = async (where = {}, skip, limit) => {
  const comments = await Comment.find(where).skip(skip).limit(limit);

  return comments;
};

const validateNodeId = async (nodeId) => {
  nodeService.getNodeById(nodeId);

  return true;
};

const validateUserId = async (userId) => {
  await userService.getUserById(userId);

  return true;
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

const getCountComments = async (where = {}) => {
  return await Comment.count(where);
};

const deleteCommentById = async (_id) => {
  if (!isValidObjectId(_id))
    throw new ValidationError("El id debe ser un ObjectId");

  const deletedComment = await Comment.findByIdAndRemove(_id);

  if (!deletedComment) throw new NotExist("Comentario no encontrado");
};

const updateCommentById = async (_id, newInfo) => {
  await getCommentById(_id);

  const updatedComment = await Comment.findByIdAndUpdate(id, newInfo, {
    new: true,
  });

  return updatedComment;
};

module.exports = {
  createComment,
  getComments,
  getCommentById,
  getCountComments,
  updateCommentById,
  deleteCommentById,
};
