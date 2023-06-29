const Node = require("../models/Node");
const ValidationError = require("../errors/ValidationError");
const NotExist = require("../errors/NotExist");
const { isValidObjectId } = require("mongoose");

const getNodeById = async (_id) => {
  if (!isValidObjectId(_id))
    throw new ValidationError("El id debe ser un ObjectId");

  const node = await Node.findOne({ _id });

  if (!node) throw new NotExist("Nodo no encontrado");

  return node;
};

const getAccesNodeById = async (_id) => {
  if (!isValidObjectId(_id)) {
    throw new ValidationError("El id debe ser de tipo ObjectId");
  }
  const accessNode = await Node.findOne({ _id });
  if (accessNode.type != "Acceso") {
    throw new ValidationError("El nodo no es de tipo Acceso");
  } else {
    return accessNode;
  }
};

const getAllNodes = async (where = {}, skip, limit) => {
  const nodes = await Node.find(where).skip(skip).limit(limit);
  return nodes;
};

const getCountNodes = async (where = {}) => {
  const countNodes = await Node.count(where);
  return countNodes;
};

const createNode = async (node) => {
  const nodeCreated = await Node.create(node);
  return nodeCreated;
};

const updateNode = async (_id, node) => {
  if (!isValidObjectId(_id)) {
    throw new ValidationError("El id no es de tipo Object id");
  }
  const updatedNode = await Node.updateOne({ _id }, node);
  if (!updatedNode) {
    throw new NotExist("No hay nodo a actualizar");
  }
  return updatedNode;
};

const updateAccessNode = async (_id, node) => {
  if (!isValidObjectId(_id)) {
    throw new ValidationError("El id no es de tipo ObjectId");
  }
  await getAccesNodeById(_id);
  return await Node.updateOne({ _id }, node);
};

const deleteNode = async (_id) => {
  if (!isValidObjectId(_id)) {
    throw new ValidationError("El id no es de tipo ObjectId");
  }
  const deletedNode = await Node.deleteOne({ _id });
  if (!deletedNode) {
    throw new NotExist("No se encontro el nodo");
  }
  return deletedNode;
};

const deleteAccessNode = async (_id) => {
  if (!isValidObjectId(_id)) {
    throw new ValidationError("El id debe ser de tipo ObjetId");
  }
  await getAccesNodeById(_id);
  return await Node.deleteOne({ _id });
};

module.exports = {
  getNodeById,
  getAllNodes,
  updateNode,
  updateAccessNode,
  deleteNode,
  createNode,
  getCountNodes,
  getAccesNodeById,
  deleteAccessNode,
};
