const Node = require("../models/Node");
const Type = require("../models/Type");
const ValidationError = require("../errors/ValidationError");
const NotExist = require("../errors/NotExist");
const typeService = require("./typeService");
const nodeService = require("./nodeService");
const detailService = require("./detailService");
const { isValidObjectId } = require("mongoose");
const { INTEREST_NODO_TYPE } = require("../constants/index");

const createInterestingNode = async (newNode) => {
  const { detail, ...node } = newNode;
  const interestingNode = await Type.findOne({ name: INTEREST_NODO_TYPE });

  node.type = interestingNode.id;

  let createdNode = await nodeService.createNode(node);
  const detailDB = detailService.createDetail(detail);
  await nodeService.updateNodeById(createdNode.id, { detail: detailDB.id });

  return createdNode;
};

const getInterestingNodes = async (where = {}, skip, limit) => {
  const interestingNode = await Type.findOne({ name: INTEREST_NODO_TYPE });

  where.type = interestingNode.id;

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

const getCountInterestingNodes = async (where = {}) => {
  const interestingType = await typeService.getOneType({
    name: INTEREST_NODO_TYPE,
    deletedAt: null,
  });

  where.type = interestingType.id;

  const countNodes = await Node.count(where);

  return countNodes;
};

const getInterestingNodeById = async (id) => {
  const node = await nodeService.getNodeById(id);

  const interestingType = await typeService.getOneType({
    name: INTEREST_NODO_TYPE,
    deletedAt: null,
  });

  if (node.type !== interestingType.id)
    throw new NotExist("Nodo de interés no encontrado");

  return node;
};

const updateInterestingNodeById = async (id, nodeData) => {
  let node = await getInterestingNodeById(id);

  node = await Node.updateOne({ id }, nodeData);

  return node;
};

const deleteInterestingNodeById = async (id) => {
  if (!isValidObjectId(id))
    throw new ValidationError("El id debe ser un ObjectId");

  const deletedNode = await Node.findByIdAndRemove(id);

  if (!deletedNode) throw new ValidationError("Nodo no encontrado");

  return deletedNode;
};

module.exports = {
  createInterestingNode,
  getInterestingNodes,
  getCountInterestingNodes,
  getInterestingNodeById,
  updateInterestingNodeById,
  deleteInterestingNodeById,
};
