const interestingnodeService = require("../services/interestingNodeService.js");
const nodeService = require("../services/nodeService.js");

module.exports = {
  getInterestingNode: async (req, res) => {
    const { id } = req.params;

    const results = await nodeService.getNodeById(id);

    return res.json(results);
  },

  getAllInterestingNodes: async (req, res) => {
    const { skip, limit, ...where } = req.query;

    const totalCount = await interestingnodeService.getCountInterestingNodes(
      where
    );
    const results = await interestingnodeService.getInterestingNodes(
      where,
      skip,
      limit
    );

    return res.json({ totalCount, results });
  },

  createInterestingNode: async (req, res, next) => {
    const newInterestingNode =
      await interestingnodeService.createInterestingNode(req.body);

    return res.json(newInterestingNode);
  },

  updateInterestingNode: async (req, res, next) => {
    const { id } = req.params;

    const updateInterestingNode =
      await interestingnodeService.updateInterestingNodeById(id, req.body);

    return res.json(updateInterestingNode);
  },

  deleteInterestingNode: async (req, res, next) => {
    const { id } = req.params;

    const deleteInterestingNode =
      await interestingnodeService.deleteInterestingNodeById(id);

    return res.json(deleteInterestingNode);
  },
};
