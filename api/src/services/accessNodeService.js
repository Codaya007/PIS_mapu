const Node = require("../models/Node");
const ValidationError = require("../errors/ValidationError");
const NotExist = require("../errors/NotExist");
const typeService = require("./typeService");
const { isValidObjectId } = require("mongoose");
const { ACCESS_NODO_TYPE } = require("../constants/index");

const createAccessNode = async (node) => {
  const accessNode = await Type.findOne({ name: ACCESS_NODO_TYPE });

  node.type = accessNode.id;

  let createdNode = await nodeService.createNode(node);

  return createdNode;
};

const getAccessNodes = async (where = {}, skip, limit) => {
  const accessNode = await Type.findOne({ name: ACCESS_NODO_TYPE });

  where.type = accessNode.id;

  const nodes =
    skip || limit
      ? await Node.find(where)
          .skip(skip)
          .limit(limit)
          .populate("type")
          .populate("campus")
          .populate("category")
          .populate("detail")
      : await Node.find(where)
          .populate("type")
          .populate("campus")
          .populate("category")
          .populate("detail");

  return nodes;
};

const getCountAccessNodes = async (where = {}) => {
  const accessType = await typeService.getOneType({
    name: ACCESS_NODO_TYPE,
    deletedAt: null,
  });

  where.type = accessType.id;

  const countNodes = await Node.count(where);

  return countNodes;
};

const getAccessNodeById = async (id) => {
  const node = await nodeService.getNodeById(id);

  const accessType = await typeService.getOneType({
    name: ACCESS_NODO_TYPE,
    deletedAt: null,
  });

  if (node.type !== accessType.id)
    throw new NotExist("Nodo de acceso no encontrado");

  return node;
};

const updateAccessNodeById = async (id, nodeData) => {
  let node = await getAccessNodeById(id);

  node = await Node.updateOne({ id }, nodeData);

  return node;
};

const deleteAccessNodeById = async (id) => {
  if (!isValidObjectId(id))
    throw new ValidationError("El id debe ser un ObjectId");

  const deletedNode = await Node.findByIdAndRemove(id);

  if (!deletedNode) throw new ValidationError("Nodo de acceso no encontrado");

  return deletedNode;
};

module.exports = {
  createAccessNode,
  getAccessNodes,
  getCountAccessNodes,
  getAccessNodeById,
  updateAccessNodeById,
  deleteAccessNodeById,
};
