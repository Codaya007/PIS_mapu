const { isValidObjectId } = require("mongoose");

const ValidationError = require("../errors/ValidationError");
const User = require("../models/User");
const { hashPassword } = require("../helpers/hashPassword");

const getAllUser = async (where = {}, skip = 10, limit = 10) => {
  const allUser = await User.find(where).skip(skip).limit(limit);

  return allUser;
};

const getCountUser = async (where = {}) => {
  return await User.count(where);
};

const getUserById = async (_id) => {
  const user = await User.findOne({ _id });

  if (!user) throw new ValidationError("Usuario no encontrado");

  return user;
};

const createUser = async (newUser) => {
  const user = await User.create(newUser);

  return user;
};

const updateUser = async (_id, newInfo) => {
  if (!isValidObjectId(_id))
    throw new ValidationError("El id debe ser un ObjectId");

  const hashedPassword = await hashPassword(newInfo.password);
  newInfo.password = hashedPassword ? hashedPassword : newInfo.password;

  let user = await User.updateOne({ _id }, newInfo);

  if (!user) throw new ValidationError("Usuario no encontrada");

  return user;
};

const deleteUser = async (_id) => {
  if (!isValidObjectId(_id))
    throw new ValidationError("El id debe ser un ObjectId");

  const deletedUser = await User.findByIdAndRemove(_id);

  if (!deletedUser) throw new ValidationError("Usuario no encontrada");
};

module.exports = {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  getCountUser,
  createUser,
};
