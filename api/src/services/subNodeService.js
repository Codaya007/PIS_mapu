const SubNode = require("../models/SubNode.js");
const ValidationError = require("../errors/ValidationError.js");
const { isValidObjectId } = require("mongoose");

const getSubNodeById = async (_id) => {
  if (!isValidObjectId(_id)) {
    throw new ValidationError("El id debe ser un ObjectId");
  }

  const subNode = await SubNode.findOne({ _id }).populate("category");

  if (!subNode) {
    throw new ValidationError("Subnodo no encontrado");
  }

  return subNode;
};

const getAllSubNodes = async (where = {}, skip, limit) => {
  const allSubNodes =
    skip || limit
      ? await SubNode.find(where).skip(skip).limit(limit).populate("category")
      : await SubNode.find(where).populate("category");

  return allSubNodes;
};

const getCountSubNodes = async (where = {}) => {
  return SubNode.count(where);
};

const createSubNode = async (subNode) => {
  const subNodeCreated = await SubNode.create(subNode);

  return subNodeCreated;
};

const updateSubNode = async (_id, newInformatiion) => {
  if (!isValidObjectId(_id)) {
    throw new ValidationError("El id debe ser un ObjectId");
  }
  const subNode = await SubNode.updateOne({ _id }, newInformatiion);
  return subNode;
};

const deleteSubNode = async (_id) => {
  if (!isValidObjectId(_id)) {
    throw new ValidationError("El id debe ser un Object id");
  }
  const deleteSubNode = SubNode.deleteOne({ _id });
  if (!deleteSubNode) throw ValidationError("Subnodo no encontrado");

  return deleteSubNode;
};

module.exports = {
  getAllSubNodes,
  getSubNodeById,
  updateSubNode,
  createSubNode,
  deleteSubNode,
  getCountSubNodes,
};
