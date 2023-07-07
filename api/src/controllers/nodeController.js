const nodeService = require("../services/nodeService.js");

module.exports = {

    getNode: async (req, res) => {
        const id = req.params.id;
        const results = await nodeService.getNodeById(id);

        return res.json(results);
    },

    getAllNodes: async (req, res) => {
        const { type, skip = 0, limit = 10, ...where } = req.query;

        const totalCount = await nodeService.getCountNodes(where, type);
        const results = await nodeService.getNodes(where, skip, limit, type);

        return res.json({ totalCount, results });
    },

    createNode: async (req, res, next) => {
        const newNode = await nodeService.createNode(req.body);
        return res.json(newNode);
    },

    updateNode: async (req, res, next) => {
        const id = req.params.id;
        const updateNode = await nodeService.updateNodeById(id, req.body);
        return res.json(updateNode);
    },

    deleteNode: async (req, res, next) => {
        const id = req.params.id;
        const deleteNode = await nodeService.deleteNodeById(id);

        return res.json(deleteNode);
    },

    timeBetween: async (req, res) => {
        const origin = req.body.origin;
        const destination = req.body.destination;
        const speed = req.body.speed;
        const time = await nodeService.timeCoordinates(origin, destination, speed);

        return res.json(time);
    }
};
