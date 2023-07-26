const nodeService = require("./nodeService");
const helpers = require("../helpers/index");
const Adyacency = require("../models/Adyacency");
const validateAdyacenciesExcelFile = require("../helpers/validateAdyacenciesFile");
const { uploadImageToS3 } = require("../helpers/s3Helpers");

const createAdyacencies = async (nodes) => {
  const results = [];

  await Promise.all(
    nodes.map(async (nodeDB) => {
      // Cada adyacencia
      const { adyacencies = [], node: originId } = nodeDB;
      const createdAdyacencies = [];

      await Promise.all(
        adyacencies.map(async (destinationId) => {
          const newAdyacency = await createAdyacency(originId, destinationId);

          createdAdyacencies.push(newAdyacency);
        })
      );

      results.push({ node: originId, adyacencies: createdAdyacencies });
    })
  );

  return results;
};

const createAdyacency = async (originId, destinationId) => {
  const originNode = await nodeService.getNodeById(originId);
  const destinityNode = await nodeService.getNodeById(destinationId);

  const weight = helpers.getDistanceBetweenCoordinates(
    originNode.latitude,
    originNode.longitude,
    destinityNode.latitude,
    destinityNode.longitude
  );

  const adyacency = await Adyacency.create({
    origin: originId,
    destination: destinationId,
    weight,
  });

  return adyacency;
};

const getNodeAdyacencies = async (node, populate = false) => {
  const adyacencies = populate
    ? await Adyacency.find({
        $or: [{ origin: node }, { destination: node }],
      })
        .populate("origin")
        .populate("destination")
        .lean()
    : await Adyacency.find({
        $or: [{ origin: node }, { destination: node }],
      }).lean();

  return adyacencies;
};

const getNodeAdyacenciesCount = async (node) => {
  const count = await Adyacency.count({
    $or: [{ origin: node }, { destination: node }],
  });

  return count;
};

const getAllAdyacencies = async (where = {}, populate = false) => {
  where.deletedAt = null;

  const adyacencies = populate
    ? await Adyacency.find(where)
        .populate("origin")
        .populate("destination")
        .lean()
    : await Adyacency.find(where).lean();

  return adyacencies;
};

const getAllAdyacenciesCount = async (where = {}) => {
  const count = await Adyacency.count(where);

  return count;
};

const deleteAdyacencies = async (adyacencies) => {
  const deleted = await Promise.all(
    adyacencies.map(
      async (adyacency) => await Adyacency.deleteOne({ _id: adyacency })
    )
  );

  return deleted;
};

const masiveUpload = async (file) => {
  const { valid, errorsFile, rows } = await validateAdyacenciesExcelFile(file);

  // Si el archivo es válido, creo los bloques
  if (valid) {
    const results = await Promise.all(
      rows.map(async (row) => {
        return await createAdyacency(row.ORIGEN, row.DESTINO);
      })
    );

    return { valid, results };
  } else {
    // Sino devuelvo el error
    const { Location: errorsURL } = await uploadImageToS3(
      errorsFile,
      "xlsx",
      "validations",
      true
    );

    return { valid, errorsURL };
  }
};

module.exports = {
  createAdyacencies,
  createAdyacency,
  getNodeAdyacencies,
  getAllAdyacencies,
  getNodeAdyacenciesCount,
  getAllAdyacenciesCount,
  deleteAdyacencies,
  masiveUpload,
};
