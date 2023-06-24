const Node = require("../models/Node");
const ValidationError = require("../errors/ValidationError");
const NotExist = require('../errors/NotExist')

const getNodeById = async (_id) => {
    if (!isValidObjectId(_id)) throw new ValidationError("El id debe ser un ObjectId");
  
    const node = await Node.findOne({ _id });
  
    if (!node) throw new NotExist("Nodo no encontrado");
  
    return node;
  };

module.exports = { getNodeById };
