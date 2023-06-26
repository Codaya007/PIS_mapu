const Report = require("../models/Report");
const LostPointService = require("../services/lostPointService");
const NodeService = require("../services/nodeService.js")
//TODO FALTAN SERVICIOS SUBNODO   
const ValidationError = require("../errors/ValidationError");
const NotExist = require('../errors/NotExist')
const constants = require('../constants/index')


const createReport = async (reportData) => {
    const classifier = classifierReport(reportData)

    await validateClassifierReport(classifier);

    const report = await Report.create(reportData);

    return report;
};

const validateClassifierReport = async (classifier) => {
    if (classifier == constants.NODE) {
        existField(await NodeService.getNodeById(reportData.node))
    } else if (classifier == constants.SUBNODE) {
        // TODO: REALIZAR LOS MISMO PARA SUBNODO   
    } else if (classifier == constants.LOSTPOINT) {
        await LostPointService.findOrCreateLostPoint(reportData.lostPoint)
    } else {
        throw new ValidationError("El reporte debe ser de tipo actualización o punto perdido");
    }
}

const classifierReport = async (reportData) => {
    //* Si es de tipo Actualización, debe mandar ya sea un nodo o subnodo, y obligatoriamente el comentario
    if (reportData.subnode && reportData.comment) {
        return constants.SUBNODE
    } else if (reportData.nodo && reportData.comment) {
        return constants.NODE
    } else if (reportData.lostPoint) {
        return constants.LOSTPOINT
    } else {
        return null;
    }
}

const existField = async (field) => {
    if (!field) {
        throw new NotExist('El nodo o subnodo no existe')
    }
}

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

module.exports = { createReport, getReports, getReportById, getCountReports, updateReportById };
