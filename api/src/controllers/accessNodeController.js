const nodeService = require("../services/nodeService");
const { ACCESS_NODO_TYPE } = require("../constants/index");

module.exports = {
  getAccessNodeById: async (req, res) => {
    const { id } = req.params;
    const result = await nodeService.getAccesNodeById(id);

    res.json({ result });
  },

  getAllAccessNode: async (req, res) => {
    let { skip = 0, limit = 10, ...where } = req.query;
    where = { type: ACCESS_NODO_TYPE };

    const totalCount = await nodeService.getCountNodes(where);
    const result = await nodeService.getNodes(where, skip, limit, type);

    res.json({ totalCount, result });
  },

  createAccessNode: async (req, res) => {
    req.body.type = ACCESS_NODO_TYPE;

    const newAccessNode = await nodeService.createAccessNode(req.body);
    return res.json({ newAccessNode });
  },

  updateAccessNode: async (req, res) => {
    const { id } = req.params;
    req.body.type = ACCESS_NODO_TYPE;
    const updatedAccessNode = await nodeService.updateAccessNode(id, req.body);
    res.json({ updatedAccessNode });
  },

  deleteAccessNode: async (req, res) => {
    const { id } = req.params;
    const deletedAccessNode = await nodeService.deleteAccessNode(id);
    res.json({ deletedAccessNode });
  },
};
