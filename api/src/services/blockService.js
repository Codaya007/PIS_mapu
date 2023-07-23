const Block = require("../models/Block");
const FieldExistingError = require("../errors/FieldExistingError");
const NotExist = require("../errors/NotExist");
const blockNodeServices = require("./blockNodeService");
const { isValidObjectId } = require("mongoose");

const populateNode = async (block) => {
  const formated = block.toJSON();

  if (block.node) {
    formated.node = await blockNodeServices.getBlockNodeById(block.node);
  }

  return formated;
};

const createBlock = async (blockData) => {
  const existingBlock = await Block.findOne({ number: blockData.number });

  if (existingBlock)
    throw new FieldExistingError(
      `El bloque número ${blockData.number} ya existe`
    );

  const { node, ...newBlock } = blockData;

  const blockNode = await blockNodeServices.createBlockNode(node);
  newBlock.node = blockNode._id;

  const block = await Block.create(newBlock);

  return block;
};

const getBlocks = async (where = {}, skip, limit) => {
  let blocks = await Block.find(where)
    .skip(skip)
    .limit(limit)
    .populate("faculty")
    .populate("campus")
    .sort({ number: -1 });

  // Añado el detalle
  blocks = await Promise.all(blocks.map(populateNode));

  return blocks;
};

const getBlockByNumber = async (number) => {
  let block = await Block.findOne({ number })
    .populate("faculty")
    .populate("campus");

  block = await populateNode(block);

  return block;
};

const getBlockById = async (id) => {
  if (!isValidObjectId(id))
    throw new ValidationError("El id debe ser un ObjectId");

  let block = await Block.findById(id).populate("faculty").populate("campus");

  if (!block) throw new NotExist("Nodo no encontrado");

  block = await populateNode(block);

  return block;
};

const getCountBlocks = async (where = {}) => {
  return await Block.count(where);
};

const updateBlockById = async (id, blockData) => {
  const existingBlock = await getBlockById(id);

  if (!existingBlock) throw new NotExist(`El bloque ${id} no existe`);

  const block = await Block.findByIdAndUpdate(id, blockData);

  return block;
};

const deleteBlockById = async (id) => {
  await getBlockById(id);

  const block = await Block.findByIdAndDelete(id);
  await blockNodeServices.deleteBlockNodeById(block.node);

  return block;
};

module.exports = {
  createBlock,
  getBlocks,
  getBlockByNumber,
  getCountBlocks,
  updateBlockById,
  deleteBlockById,
  getBlockById,
};
