const Node = require("../models/Node");
const Adyacency = require("../models/Adyacency");
const ValidationError = require("../errors/ValidationError");
const NotExist = require("../errors/NotExist");
const detailService = require("../services/detailService");
const { isValidObjectId } = require("mongoose");
const {
  timeBetweenCoordinates,
  getDistanceBetweenCoordinates,
} = require("../helpers/index");
const SubNode = require("../models/SubNode");
const { ROUTE_NODO_TYPE, COLORS_DICTIONARY } = require("../constants");

const populateDetail = async (node) => {
  const formated = node.toJSON();

  if (node.detail)
    formated.detail = await detailService.getDetailById(node.detail);

  return formated;
};

const nodeAlreadyExists = async (latitude, longitude) => {
  const sameCoor = await Node.find({
    latitude,
    longitude,
    deletedAt: null,
  });

  if (sameCoor.length)
    throw new ValidationError(
      "Ya existe un nodo con la misma latitud y longitud"
    );
};

const createNode = async (nodeData = {}) => {
  // adyacency debe ser un array de ids de nodos (de cualquier tipo)
  const { latitude, longitude, adyacency = [], ...restData } = nodeData;
  const createdAdyacencies = [];
  await nodeAlreadyExists(latitude, longitude);

  const node = await Node.create({ latitude, longitude, ...restData });

  if (adyacency.length > 0) {
    for (let i = 0; i < adyacency.length; i++) {
      // Busco el documento del nodo creado
      let nodeAdyacency = await Node.findOne({
        latitude: adyacency[i].latitude,
        longitude: adyacency[i].longitude,
        deletedAt: null,
      });

      // Hallo la distancia entre los dos nodos
      const weight = getDistanceBetweenCoordinates(
        latitude,
        longitude,
        nodeAdyacency.latitude,
        nodeAdyacency.longitude
      );

      const adyacency = await Adyacency.create({
        origin: node.id,
        destination: nodeAdyacency.id,
        weight,
      });

      createdAdyacencies.push(adyacency);
    }
  }

  node.adyacency = createdAdyacencies;

  return node;
};

const createNodeWithDetail = async (newNode) => {
  const { detail = {}, ...node } = newNode;

  let createdNode = await createNode(node);
  const detailDB = await detailService.createDetail(detail);

  createdNode.detail = detailDB._id;
  await updateNodeById(createdNode._id, { detail: detailDB._id });

  return createdNode;
};

const getNodes = async (where = {}, skip, limit, populate = true) => {
  let nodes = [];

  if (skip || limit)
    nodes = populate
      ? await Node.find(where)
          .skip(skip ?? 0)
          .limit(limit ?? 10)
          .populate("type")
          .populate("campus")
          .populate("category")
          .sort({ createdAt: -1 })
      : await Node.find(where)
          .skip(skip ?? 0)
          .limit(limit ?? 10)
          .sort({ createdAt: -1 });
  else {
    nodes = populate
      ? await Node.find(where)
          .populate("type")
          .populate("campus")
          .populate("category")
          // .populate("block")
          // .populate("detail")
          .sort({ createdAt: -1 })
      : await Node.find(where).sort({ createdAt: -1 });
  }

  if (populate) nodes = await Promise.all(nodes.map(populateDetail));

  return nodes;
};

const getAllNodesCoordinates = async (where = {}, skip, limit) => {
  const nodes = await Node.find(where)
    .select(["latitude", "longitude", "type", "available"])
    .populate("type", ["name"])
    .populate("detail", ["title"])
    .sort({ createdAt: -1 })
    .lean();

  nodes.map((node) => {
    node.type = node.type?.name || null;
    node.name =
      node.type === ROUTE_NODO_TYPE
        ? "Nodo ruta"
        : node?.detail?.title || "Sin datos";
    node.color = COLORS_DICTIONARY[node.type];
    node.coordinates = [node.latitude, node.longitude];
    node.detail = undefined;
  });

  return nodes;
};

const getCountNodes = async (where = {}) => {
  const countNodes = await Node.count(where);

  return countNodes;
};

const getNodeById = async (_id) => {
  if (!isValidObjectId(_id))
    throw new ValidationError("El id debe ser un ObjectId");

  let node = await Node.findOne({ _id })
    .populate("type")
    .populate("campus")
    .populate("category");
  // .populate("block")
  // .populate("detail");

  if (!node) throw new NotExist("Nodo no encontrado");

  node = await populateDetail(node);

  return node;
};

const updateNodeById = async (_id, nodeData) => {
  let node = await getNodeById(_id);

  node = await Node.findByIdAndUpdate(_id, nodeData);

  return node;
};

const updateNodeWithDetailById = async (_id, nodeData) => {
  let node = await getNodeById(_id);

  const { detail, ...newData } = nodeData;
  node = await Node.findByIdAndUpdate(_id, newData);

  if (detail) {
    const { _id: detailId, ...newDetail } = detail;
    node.detail = await detailService.updateDetailById(detailId, newDetail);
  }

  return node;
};

const deleteNodeById = async (_id) => {
  const toDelete = await getNodeById(_id);
  const detail = toDelete.detail?._id;

  // Elimino los detalles y subnodos que tiene una relación fuerte
  if (detail) {
    await detailService.deleteDetailById(detail);
    await SubNode.deleteMany({ detail });
  }

  const deletedNode = await Node.findByIdAndRemove(_id);

  if (!deletedNode) throw new ValidationError("Nodo no encontrado");

  return deletedNode;
};

const timeCoordinates = async (origin, destination, speed) => {
  if (speed <= 0) {
    throw new ValidationError("La velocidad tiene que ser mayor a 0");
  }

  const secondsStimate = await timeBetweenCoordinates(
    origin,
    destination,
    speed
  );

  const minutes = Math.floor(secondsStimate / 60);
  const seconds = Math.round(secondsStimate % 60);

  return (time = { minutes, seconds });
};

module.exports = {
  nodeAlreadyExists,
  createNode,
  createNodeWithDetail,
  updateNodeWithDetailById,
  getNodes,
  getAllNodesCoordinates,
  getCountNodes,
  getNodeById,
  updateNodeById,
  deleteNodeById,
  timeCoordinates,
};
