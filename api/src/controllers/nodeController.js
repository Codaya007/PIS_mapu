const nodeService = require("../services/nodeService.js");

module.exports = {

    getNode: async (req, res) => {
        const id = req.params.id;
        const results = await nodeService.getNodeById(id);

        return res.json(results);
    },

    getAllNodes: async (req, res) => {
        const { skip = 0, limit = 10, ...where } = req.query;

        const totalCount = await nodeService.getCountNodes(where);
        const results = await nodeService.getNodes(where, skip, limit);

        return res.json({ totalCount, results });
    },

    createNode: async (req, res, next) => {
        const newNode = await nodeService.createNode(req.body);
        return res.json(newNode);
    },

    // updateBlock: async (req, res, next) => {
    //     const number = req.params.number;
    //     const updateBlock = await nodeService.updateBlockByNumber(number, req.body);
    //     return res.json(updateBlock);
    // },

    // deleteBlock: async (req, res, next) => {
    //     const number = req.params.number;
    //     const deleteBlock = await nodeService.deleteBlockByNumber(number);

    //     return res.json(deleteBlock);
    // },
};
