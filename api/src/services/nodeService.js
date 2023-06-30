const Node = require("../models/Node");
const ValidationError = require("../errors/ValidationError");
const NotExist = require('../errors/NotExist')
const { isValidObjectId } = require("mongoose");


const createNode = async (nodeData) => {
  
  const sameCoor = await Node.find({"latitude": nodeData.latitude, "longitude": nodeData.longitude});
  
  if(sameCoor.length > 0) throw new ValidationError("La latitud y longitud ya existen", sameCoor)
  
  const node = await Node.create(nodeData);
  
  return node;
};

const getNodes = async (where = {}, skip, limit) => {
  const nodes = await Node.find(where).skip(skip).limit(limit);

  return nodes;
};

const getCountNodes = async (where = {}) => {
  return await Node.count(where);
};

const getNodeById = async (_id) => {
  if (!isValidObjectId(_id)) throw new ValidationError("El id debe ser un ObjectId");

  const node = await Node.findOne({ _id });

  if (!node) throw new NotExist("Nodo no encontrado");

  return node;
};

module.exports = { createNode, getNodes, getCountNodes, getNodeById };
