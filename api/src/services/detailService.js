const { isValidObjectId } = require("mongoose");
const ValidationError = require("../errors/ValidationError");
const Detail = require("../models/Detail");

const createDetail = async (detailData) => {
  const detail = await Detail.create(detailData);

  return detail;
};

const getDetailes = async (where = {}, skip, limit) => {
  const detailes = await Detail.find(where).skip(skip).limit(limit);

  return detailes;
};

const getDetailById = async (id) => {
  if (!isValidObjectId(id))
    throw new ValidationError("El id debe ser un objectId");

  const detail = await Detail.findById(id).exec();

  return detail;
};

const getCountDetailes = async (where = {}) => {
  const numberDetailes = await Detail.count(where);

  return numberDetailes;
};

const updateDetailById = async (id, detailData) => {
  if (!isValidObjectId(id))
    throw new ValidationError("El id debe ser un objectId");

  const updateDetail = await Detail.findByIdAndUpdate(id, detailData);

  return updateDetail;
};

const deleteDetailById = async (id) => {
  if (!isValidObjectId(id))
    throw new ValidationError("El id debe ser un objectId");

  const detailDeleted = await Detail.findByIdAndDelete(id);

  return detailDeleted;
};

const deleteDetails = async (where = {}) => {
  if (Object.keys(where).lenght <= 0)
    throw new ValidationError("Proporcione un criterio de filtrado");

  const numberDetailesDeleted = await Detail.deleteOne(where);

  return numberDetailesDeleted;
};

module.exports = {
  createDetail,
  getDetailes,
  getDetailById,
  getCountDetailes,
  updateDetailById,
  deleteDetailById,
  deleteDetails,
};
