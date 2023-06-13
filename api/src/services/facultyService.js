const Faculty = require("../models/Faculty");

const createFaculty = async (facultyData) => {
  const faculty = await Faculty.create(facultyData);

  return faculty;
};

const getFaculties = async (where = {}, skip, limit) => {
  const faculties = await Faculty.find(where).skip(skip).limit(limit);

  return faculties;
};

const getFaculty = async (id) => {
  const faculty = await Faculty.findById(id);

  return faculty;
};

const getCountFaculties = async (where = {}) => {
  return await Faculty.count(where);
};

const getFacultyById = async (_id) => {
  return await Faculty.findOne({ _id });
};

const updateFacultyById = async (_id, newInfo) => {
  return await Faculty.findByIdAndUpdate(_id, newInfo);
};

module.exports = {
  createFaculty,
  getFaculties,
  getFaculty,
  getCountFaculties,
  getFacultyById,
  updateFacultyById,
};
