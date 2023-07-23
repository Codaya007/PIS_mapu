const blockServices = require("../services/blockService.js");

module.exports = {
  getBlock: async (req, res) => {
    const { id } = req.params;
    const result = await blockServices.getBlockById(id);

    return res.json(result);
  },

  getAllBlocks: async (req, res) => {
    const { skip, limit, ...where } = req.query;

    const totalCount = await blockServices.getCountBlocks(where);
    const results = await blockServices.getBlocks(where, skip, limit);

    return res.json({ totalCount, results });
  },

  createBlock: async (req, res, next) => {
    const newBlock = await blockServices.createBlock(req.body);

    return res.json(newBlock);
  },

  updateBlock: async (req, res, next) => {
    const { id } = req.params;

    const updateBlock = await blockServices.updateBlockById(id, req.body);

    return res.json(updateBlock);
  },

  deleteBlock: async (req, res, next) => {
    const { id } = req.params;

    const deleteBlock = await blockServices.deleteBlockById(id);

    return res.json(deleteBlock);
  },
};
