const User = require("../models/User");
var mongoose = require("mongoose");

const getUser = async (name) => {
  const user = await User.findOne(name);
  return user;
};

const getAllUser = async () => {
  const allUser = await User.find();
  return allUser;
};

const updateUser = async (id, user) => {
  const idObject = new mongoose.Types.ObjectId(id);
  const userUpdate = await User.findByIdAndUpdate(
    idObject,
    {
      $set: user,
    },
    { new: true }
  );
  return userUpdate;
};

const deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};

module.exports = { getUser, getAllUser, updateUser, deleteUser };
