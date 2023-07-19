const Node = require("../models/Node");
const ValidationError = require("../errors/ValidationError");
const NotExist = require("../errors/NotExist");
const campusService = require("../services/campusService");
const { isValidObjectId } = require("mongoose");
const { LIMIT_ACCESS_POINTS_BY_CAMPUS } = require("../constants");
const { ACCESS_NODO_TYPE } = require("../constants/index");
const {
  timeBetweenCoordinates,
  getDistanceBetweenCoordinates,
} = require("../helpers/index");

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
  const { latitude, longitude, adyacency = [], ...restData } = nodeData;
  const createdAdyacencies = [];
  await nodeAlreadyExists(latitude, longitude);

  const node = await Node.create({ latitude, longitude, ...restData });

  if (adyacency.length > 0) {
    for (let i = 0; i < adyacency.length; i++) {
      // Busco el nodo por si ya está creado
      let nodeAdyacency = await Node.findOne({
        latitude: adyacency[i].latitude,
        longitude: adyacency[i].longitude,
        deletedAt: null,
      });

      // Si no existe, la creo
      if (!nodeAdyacency) {
        nodeAdyacency = await Node.create({
          latitude: adyacency[i].latitude,
          longitude: adyacency[i].longitude,
        });
      }

      // Hallo la distancia entre los dos nodos
      const weight = getDistanceBetweenCoordinates(
        latitude,
        longitude,
        adyacency[i].latitude,
        adyacency[i].longitude
      );

      const adyacency = await Adyacency.create({
        origen: node.id,
        destination: nodeAdyacency.id,
        weight,
      });

      createdAdyacencies.push(adyacency);
    }
  }

  node.adyacency = createdAdyacencies;

  return node;
};

const getNodes = async (where = {}, skip, limit) => {
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

const getCountNodes = async (where = {}) => {
  const countNodes = await Node.count(where);

  return countNodes;
};

const getNodeById = async (_id) => {
  if (!isValidObjectId(_id))
    throw new ValidationError("El id debe ser un ObjectId");

  const node = await Node.findOne({ _id })
    .populate("type")
    .populate("campus")
    .populate("category")
    .populate("detail");

  if (!node) throw new NotExist("Nodo no encontrado");

  return node;
};

const updateNodeById = async (_id, nodeData) => {
  let node = await getNodeById(_id);

  node = await Node.updateOne({ _id }, nodeData);

  return node;
};

const deleteNodeById = async (_id) => {
  if (!isValidObjectId(_id))
    throw new ValidationError("El id debe ser un ObjectId");

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
  getNodes,
  getCountNodes,
  getNodeById,
  updateNodeById,
  deleteNodeById,
  timeCoordinates,
};
