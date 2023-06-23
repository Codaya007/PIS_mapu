const blockServices = require("../services/blockService.js");

module.exports = {

    getBlock: async (req, res) => {        
            const number = req.params.number;
            const results = await blockServices.getBlockByNumber(number);

            return res.json({ totalCount, results });
    },

    getAllBlocks: async (req, res) => {
        const { skip = 0, limit = 10, ...where } = req.query;

        const totalCount = await blockServices.getCountBlocks(where);
        const results = await blockServices.getBlocks(where, skip, limit);

        return res.json({ totalCount, results });
    },

    createBlock: async (req, res, next) => {
            const newBlock = await blockServices.createBlock(req.body);
            return res.json(newBlock);
    },

    updateBlock: async (req, res, next) => {
            const number = req.params.number;
            const updateBlock = await blockServices.updateBlockByNumber(number, req.body);
            return res.json(updateBlock);
    },

    deleteBlock: async (req, res, next) => {
        const number = req.params.number;
        const deleteBlock = await blockServices.deleteBlockByNumber(number);

        return res.json(deleteBlock);
    },
};
