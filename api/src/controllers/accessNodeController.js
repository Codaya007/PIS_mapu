const accessNodeService = require("../services/accessNodeService");

module.exports = {
  getAccessNodeById: async (req, res) => {
    const { id } = req.params;
    const result = await accessNodeService.getNodeById(id);

    res.json({ result });
  },

  getAllAccessNode: async (req, res) => {
    let { skip, limit, ...where } = req.query;

    const totalCount = await accessNodeService.getCountNodes(where);
    const result = await accessNodeService.getNodes(where, skip, limit, type);

    res.json({ totalCount, result });
  },

  createAccessNode: async (req, res) => {
    const newAccessNode = await accessNodeService.createAccessNode(req.body);
    return res.json({ newAccessNode });
  },

  updateAccessNode: async (req, res) => {
    const { id } = req.params;

    const updatedAccessNode = await accessNodeService.updateAccessNode(
      id,
      req.body
    );
    res.json({ updatedAccessNode });
  },

  deleteAccessNode: async (req, res) => {
    const { id } = req.params;
    const deletedAccessNode = await accessNodeService.deleteAccessNode(id);
    res.json({ deletedAccessNode });
  },
};
