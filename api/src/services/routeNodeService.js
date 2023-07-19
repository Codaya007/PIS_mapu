const Node = require("../models/Node");
const ValidationError = require("../errors/ValidationError");
const NotExist = require("../errors/NotExist");
const typeService = require("./typeService");
const { isValidObjectId } = require("mongoose");
const { ROUTE_NODO_TYPE } = require("../constants/index");

const createRouteNode = async (node) => {
  const routeNode = await Type.findOne({ name: ROUTE_NODO_TYPE });

  node.type = routeNode.id;

  let createdNode = await nodeService.createNode(node);

  return createdNode;
};

const getRouteNodes = async (where = {}, skip, limit) => {
  const routeNode = await Type.findOne({ name: ROUTE_NODO_TYPE });

  where.type = routeNode.id;

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

const getCountRouteNodes = async (where = {}) => {
  const routeType = await typeService.getOneType({
    name: ROUTE_NODO_TYPE,
    deletedAt: null,
  });

  where.type = routeType.id;

  const countNodes = await Node.count(where);

  return countNodes;
};

const getRouteNodeById = async (id) => {
  const node = await nodeService.getNodeById(id);

  const routeType = await typeService.getOneType({
    name: ROUTE_NODO_TYPE,
    deletedAt: null,
  });

  if (node.type !== routeType.id)
    throw new NotExist("Nodo de acceso no encontrado");

  return node;
};

const updateRouteNodeById = async (id, nodeData) => {
  let node = await getRouteNodeById(id);

  node = await Node.updateOne({ id }, nodeData);

  return node;
};

const deleteRouteNodeById = async (id) => {
  if (!isValidObjectId(id))
    throw new ValidationError("El id debe ser un ObjectId");

  const deletedNode = await Node.findByIdAndRemove(id);

  if (!deletedNode) throw new ValidationError("Nodo de acceso no encontrado");

  return deletedNode;
};

module.exports = {
  getRouteNodes,
  getCountRouteNodes,
  getRouteNodeById,
  updateRouteNodeById,
  deleteRouteNodeById,
};
