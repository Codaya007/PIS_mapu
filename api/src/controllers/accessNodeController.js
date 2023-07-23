const accessNodeService = require("../services/accessNodeService");

module.exports = {
  getAccessNodeById: async (req, res) => {
    const { id } = req.params;
    const result = await accessNodeService.getAccessNodeById(id);

    res.json(result);
  },

  getAllAccessNode: async (req, res) => {
    let { skip, limit, ...where } = req.query;

    const totalCount = await accessNodeService.getCountAccessNodes(where);
    const result = await accessNodeService.getAccessNodes(where, skip, limit);

    res.json({ totalCount, result });
  },

  createAccessNode: async (req, res) => {
    const newAccessNode = await accessNodeService.createAccessNode(req.body);

    return res.json(newAccessNode);
  },

  updateAccessNode: async (req, res) => {
    const { id } = req.params;

    const updatedAccessNode = await accessNodeService.updateAccessNodeById(
      id,
      req.body
    );
    res.json(updatedAccessNode);
  },

  deleteAccessNode: async (req, res) => {
    const { id } = req.params;
    const deletedAccessNode = await accessNodeService.deleteAccessNodeById(id);

    res.json(deletedAccessNode);
  },
};
