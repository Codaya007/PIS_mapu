const Campus = require("../models/Campus");
const mongoose = require("mongoose");

const createCampus = async (campusData) => {
  const campus = await Campus.create(campusData);

  return campus;
};

const getCampuses = async (where = {}, skip, limit) => {
  const campuses = await Campus.find(where).skip(skip).limit(limit);

  return campuses;
}

const getCampusById = async (id) => {
  const campus = await Campus.findById(id).exec();

  return campus;
}

const getCountCampuses = async (where = {}) => {
  const numberCampuses = await Campus.count(where);

  return numberCampuses;
}

const updateCampusById = async (id, campusData) => {
  const updateCampus = await Campus.findByIdAndUpdate(id, campusData, { new: true });

  return updateCampus;
}

const deleteCampusById = async (id) => {
  const campusDeleted = await Campus.findByIdAndDelete(id);

  return campusDeleted;
}

const deleteCampus = async (where = {}) => {
  const numberCampusesDeleted = await Campus.deleteOne(where);

  return numberCampusesDeleted;
}

module.exports = { 
  createCampus, 
  getCampuses, 
  getCampusById, 
  getCountCampuses, 
  updateCampusById, 
  deleteCampusById, 
  deleteCampus 
};