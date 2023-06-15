const mongoose = require("mongoose");
const Role = require("../models/role");

const getRole = async (name) => {
  const role = await Role.findOne(name);
  return role;
};

const getAllRoles = async () => {
  const allRoles = await Role.find();
  return allRoles;
};

const createRole = async (role) => {
  const roleCreated = await Role.create(role);
  return roleCreated;
};

const updateRole = async (id, role) => {
  const idObject = new mongoose.Types.ObjectId(id);
  const roleUpdated = await Role.findByIdAndUpdate(
    idObject,
    {
      $set: role,
    },
    { new: true }
  );
  return roleUpdated;
};

const deleteRole = async (id) => {
  const deleteRole = await Role.findByIdAndDelete(id);
  return deleteRole;
};
module.exports = { createRole, getRole, getAllRoles, updateRole, deleteRole };
