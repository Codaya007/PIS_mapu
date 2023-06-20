const Campus = require("../models/Campus");
const ValidationError = require("../errors/ValidationError");
const { isValidObjectId } = require("mongoose");

const createCampus = async (campusData) => {
  const campus = await Campus.create(campusData);

  return campus;
};

const getCampuses = async (where = {}, skip, limit) => {
  const campuses = await Campus.find(where).skip(skip).limit(limit);

  return campuses;
}

const getCampusById = async (id) => {
  if(!isValidObjectId(id)){
    throw new ValidationError("El dato enviado debe ser un ObjectId");  
  }
  const campus = await Campus.findById(id).exec();

  if(!campus){
    throw new ValidationError("Campus no encontrado");
  }
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
  if(!isValidObjectId(id)){
    throw new ValidationError("El dato enviado debe ser un ObjectId");
  }

  const campusDeleted = await Campus.findByIdAndDelete(id);

  if(!campusDeleted){
    throw new ValidationError("Campus no encontrado");
  }

  return campusDeleted;
}

module.exports = { 
  createCampus, 
  getCampuses, 
  getCampusById, 
  getCountCampuses, 
  updateCampusById, 
  deleteCampusById
};