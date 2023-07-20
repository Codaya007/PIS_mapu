const NotExist = require("../errors/NotExist");
const typeService = require("./typeService");
const nodeService = require("./nodeService");
const { INTEREST_NODO_TYPE } = require("../constants/index");

const getInterestingNodeTypeId = async () => {
  const accessType = await typeService.getOneType({
    name: INTEREST_NODO_TYPE,
    deletedAt: null,
  });

  return accessType._id;
};

const createInterestingNode = async (newNode) => {
  newNode.type = await getInterestingNodeTypeId();

  const createdNode = await nodeService.createNodeWithDetail(newNode);

  return createdNode;
};

const getInterestingNodes = async (where = {}, skip, limit) => {
  where.type = await getInterestingNodeTypeId();

  const nodes = await nodeService.getNodes(where, skip, limit);

  return nodes;
};

const getCountInterestingNodes = async (where = {}) => {
  where.type = await getInterestingNodeTypeId();

  const countNodes = await nodeService.getCountNodes(where);

  return countNodes;
};

const getInterestingNodeById = async (id) => {
  const node = await nodeService.getNodeById(id);

  const interestingTypeID = await getInterestingNodeTypeId();

  if (node.type?._id?.toString() !== interestingTypeID.toString())
    throw new NotExist("Nodo de interés no encontrado");

  return node;
};

const updateInterestingNodeById = async (id, nodeData) => {
  let node = await getInterestingNodeById(id);

  node = await nodeService.updateNodeWithDetailById(id, nodeData);

  return node;
};

const deleteInterestingNodeById = async (id) => {
  await getInterestingNodeById(id);

  const deletedNode = await nodeService.deleteNodeById(id);

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
