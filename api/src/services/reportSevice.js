const Report = require("../models/Report");
const LostPointService = require("../services/lostPointService");
const nodeService = require("../services/nodeService.js");
const SubNodeService = require("../services/subNodeService");
const ValidationError = require("../errors/ValidationError");
const { isValidObjectId } = require("mongoose");
const constants = require("../constants/index");

//TODO: FALTA QUE JHAIR TERMINE BIEN LO DEL NODO EN EL CONTROLADOR
const createReport = async (reportData) => {
  const classifier = await classifierReport(reportData);

  await validateClassifierReport(classifier, reportData);

  const report = await Report.create(reportData);

  return report;
};

const validateClassifierReport = async (classifier, reportData) => {
  if (classifier === constants.NODE) {
    await nodeService.getNodeById(reportData.node);
  } else if (classifier === constants.SUBNODE) {
    await SubNodeService.getSubNodeById(reportData.subnode);
  } else if (classifier === constants.LOSTPOINT) {
    const res = await LostPointService.findOrCreateLostPoint(
      reportData.lostPoint
    );
    reportData.lostPoint = res._id;
  } else {
    throw new ValidationError(
      "El reporte debe ser de tipo actualización o punto perdido"
    );
  }
};

const classifierReport = async (reportData) => {
  //* Si es de tipo Actualización, debe mandar ya sea un nodo o subnodo, y obligatoriamente el comentario
  if (reportData.subnode && reportData.comment) {
    return constants.SUBNODE;
  } else if (reportData.nodo && reportData.comment) {
    return constants.NODE;
  } else if (reportData.lostPoint) {
    return constants.LOSTPOINT;
  } else {
    return null;
  }
};

const getReports = async (where = {}, skip, limit) => {
  const reports = await Report.find(where).skip(skip).limit(limit);

  return reports;
};

const getReportById = async (_id) => {
  if (!isValidObjectId(_id))
    throw new ValidationError("El id debe ser un ObjectId");

  const report = await Report.findOne({ _id });

  if (!report) {
    throw new ValidationError("Reporte no encontrado");
  }

  return report;
};

const getCountReports = async (where = {}) => {
  return await Report.count(where);
};

const updateReportById = async (_id, reportData) => {
  let report = await getReportById(_id);

  report = await Report.updateOne({ _id }, reportData);

  return report;
};

module.exports = {
  createReport,
  getReports,
  getReportById,
  getCountReports,
  updateReportById,
};
