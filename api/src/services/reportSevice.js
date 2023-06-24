const Report = require("../models/Report");
const LostPointService = require("../services/lostPointService");
const FieldExistingError = require('../errors/FieldExistingError')
const NotExist = require('../errors/NotExist')

const createBlock = async (blockData) => {
    const existingBlock = await getBlockByNumber(blockData.number)
    const existingFaculty = await FacultyService.getFacultyById(blockData.faculty)
    if (existingBlock) throw new FieldExistingError(`El bloque número ${blockData.number} ya existe`)
    if (!existingFaculty) throw new NotExist(`La facultad no existe`)
    const block = await Block.create(blockData);

    return block;
};

const getBlocks = async (where = {}, skip, limit) => {
    const blocks = await Block.find(where).skip(skip).limit(limit);

    return blocks;
};

const getBlockByNumber = async (number) => {
    const block = await Block.findOne({ "number": number });

    return block;
};

const getCountBlocks = async (where = {}) => {
    return await Block.count(where);
};

const updateBlockByNumber = async (number, blockData) => {
    const existingBlock = await getBlockByNumber(number)
    if (existingBlock == null) throw new NotExist(`El bloque número ${number} no existe`)

    const block = await Block.findOneAndUpdate({ "number": number }, blockData, { new: true });

    return block;
};

const deleteBlockByNumber = async (number) => {
    const block = await Block.deleteOne({ "number": number });

    return block;
};

module.exports = { createBlock, getBlocks, getBlockByNumber, getCountBlocks, updateBlockByNumber, deleteBlockByNumber };
