const { where } = require("../models/SubNode");
const subNodeService = require("../services/subNodeService.js");
module.exports = {
  createSubNode: async (req, res) => {
    const newSubNode = await subNodeService.createSubNode(req.body);
    res.json(newSubNode);
  },

  getAllSubNodes: async (req, res) => {
    const { skip = 0, limit = 10, ...where } = req.query;
    const result = await subNodeService.getAllSubNodes(where, skip, limit);
    const totalCount = await subNodeService.getCountSubNodes(where);

    res.json({ totalCount, result });
  },

  getSubNodeById: async (req, res) => {
    const { id } = req.params;
    const subNode = await subNodeService.getSubNodeById(id);
    console.log(subNode);

    res.json(subNode);
  },

  updateSubNode: async (req, res) => {
    const { id } = req.params;
    const subNode = await subNodeService.updateSubNode(id, req.body);
    res.json(subNode);
  },

  deleteSubNode: async (req, res) => {
    const { id } = req.params;
    const deletedUser = await subNodeService.deleteSubNode(id);
    res.json(deletedUser);
  },
};
