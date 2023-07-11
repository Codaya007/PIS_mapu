const Node = require("../models/Node");
const ValidationError = require("../errors/ValidationError");
const NotExist = require("../errors/NotExist");
const campusService = require("../services/campusService");
const { isValidObjectId } = require("mongoose");
const { LIMIT_ACCESS_POINTS_BY_CAMPUS } = require("../constants");
const { timeBetweenCoordinates } = require("../helpers/index");

const applyRegex = async (type, where) => {
  if (type && typeof type === 'string') {
    where.$or = [
      { type: { $regex: type, $options: 'i' } },
    ];
  }
}

const createNode = async (nodeData) => {
  await sameCoordenates(nodeData);

  const node = await Node.create(nodeData);

  return node;
};

const sameCoordenates = async (nodeData) => {
  const sameCoor = await Node.find({
    latitude: nodeData.latitude,
    longitude: nodeData.longitude,
  });

  if (sameCoor.length)
    throw new ValidationError("La latitud y longitud ya existen");
};

const getNodes = async (where = {}, skip, limit, type) => {
  await applyRegex(type, where);
  const nodes = await Node.find(where).skip(skip).limit(limit);

  return nodes;
};

const getNodeById = async (_id) => {
  if (!isValidObjectId(_id))
    throw new ValidationError("El id debe ser un ObjectId");

  const node = await Node.findOne({ _id });

  if (!node) throw new NotExist("Nodo no encontrado"); 

  return node;
};

const updateNodeById = async (_id, nodeData) => {
  await sameCoordenates(nodeData);

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

const getAccesNodeById = async (_id) => {
  if (!isValidObjectId(_id)) {
    throw new ValidationError("El id debe ser de tipo ObjectId");
  }
  const accessNode = await Node.findOne({ _id });

  if (accessNode.type != "Acceso") {
    throw new ValidationError("El nodo no es de tipo Acceso");
  }

  return accessNode;
};

const getAllNodes = async (where = {}, skip, limit) => {
  const nodes = await Node.find(where).skip(skip).limit(limit);

  return nodes;
};

const getCountNodes = async (where = {}, type) => {
  await applyRegex(type, where);
  const countNodes = await Node.count(where);

  return countNodes;
};

const createAccessNode = async (node) => {
  const campus = await campusService.getCampusByName(node.campus);
  let isAccessPoint = false;

  for (let i = 0; i < campus.accessPoints.length; i++) {
    for (let j = 0; j < 1; j++) {
      if (
        campus.accessPoints[i][j] === node.latitude &&
        campus.accessPoints[i][j + 1] === node.longitude
      ) {
        isAccessPoint = true;
      }
    }
  }

  if (isAccessPoint) {
    throw new ValidationError("El nodo ya está en el campus");
  }

  campus.accessPoints.push([node.latitude, node.longitude]);

  if (campus.accessPoints.length > 4) {
    throw new ValidationError(
      `El campus no puede tener más de ${LIMIT_ACCESS_POINTS_BY_CAMPUS} puntos de acceso`
    );
  }

  const campusUpdated = await campusService.updateCampusById(
    campus._id,
    campus
  );

  if (!campusUpdated) {
    throw new ValidationError("No existe ese campus");
  }

  delete node.campus;
  const nodeModel = node;
  const nodeCreated = await Node.create(nodeModel);

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

  delete node.campus;
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

const timeCoordinates = async (origin, destination, speed) => {
  if(speed <= 0){
    throw new ValidationError("La velocidad tiene que ser mayor a 0");
  }

  const secondsStimate = await timeBetweenCoordinates(origin, destination, speed);

  const minutes = Math.floor(secondsStimate / 60);
  const seconds = Math.round(secondsStimate % 60);

  return time={minutes, seconds};
};

module.exports = {
  getAllNodes,
  getCountNodes,
  getNodeById,
  updateNode,
  updateAccessNode,
  deleteNode,
  createNode,
  getAccesNodeById,
  deleteAccessNode,
  createAccessNode,
  getNodes,
  updateNodeById,
  deleteNodeById,
  timeCoordinates
};
