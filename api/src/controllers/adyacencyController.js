const adyacencyService = require("../services/adyacencyService");
const BadRequestError = require("../errors/BadRequestError");

module.exports = {
  getAdyacenciesByNode: async (req, res) => {
    const { node } = req.params;
    const results = await adyacencyService.getNodeAdyacencies(node);

    res.json({ totalCount: result.length, results });
  },

  getAllAdyacencies: async (req, res) => {
    let { skip, limit, populate, ...where } = req.query;

    const totalCount = await adyacencyService.getAllAdyacenciesCount(where);
    const results = await adyacencyService.getAllAdyacencies(
      where,
      populate === "true"
    );

    res.json({ totalCount, results });
  },

  createAdyacency: async (req, res) => {
    const { origin, destination, nodes } = req.body;

    if (!nodes?.length && (!origin || !destination)) {
      throw new BadRequestError(
        "Cuando no se envía el campo 'nodes', los campos 'origin' y 'destination' son requeridos"
      );
    }

    if (nodes?.length && (origin || destination)) {
      throw new BadRequestError(
        "Cuando se envía el campo 'nodes', el campo 'origin' y 'destination' deben ir a null o no enviarse"
      );
    }

    let adyacencies = [];

    if (nodes?.length) {
      adyacencies = await adyacencyService.createAdyacencies(nodes);
    } else {
      const newAdyacency = await adyacencyService.createAdyacency(
        origin,
        destination
      );

      adyacencies.push(newAdyacency);
    }

    return res.json(adyacencies);
  },

  deleteAdyacencies: async (req, res) => {
    const { adyacencies } = req.body;

    const deletedAdyacencies = await adyacencyService.deleteAdyacencies(
      adyacencies
    );

    res.json(deletedAdyacencies);
  },

  masiveUpload: async (req, res, next) => {
    const { valid, errorsURL, results } = await adyacencyService.masiveUpload(
      req.file
    );

    if (valid) return res.json({ success: true, results });

    return res.json({ success: false, results: errorsURL });
  },
};
