const nodeService = require("../services/nodeService");
const { ROUTE_NODO_TYPE } = require("../constants/index");

module.exports = {
  getRouteNodeById: async (req, res) => {
    const { id } = req.params;
    const result = await nodeService.getAccesNodeById(id);

    res.json({ result });
  },

  getAllRouteNode: async (req, res) => {
    let { skip = 0, limit = 10, ...where } = req.query;
    where = { type: ROUTE_NODO_TYPE };

    const totalCount = await nodeService.getCountNodes(where);
    const result = await nodeService.getNodes(where, skip, limit, type);

    res.json({ totalCount, result });
  },

  createRouteNode: async (req, res) => {
    req.body.type = ROUTE_NODO_TYPE;

    const newRouteNode = await nodeService.createRouteNode(req.body);
    return res.json({ newRouteNode });
  },

  updateRouteNode: async (req, res) => {
    const { id } = req.params;
    req.body.type = ROUTE_NODO_TYPE;
    const updatedRouteNode = await nodeService.updateRouteNode(id, req.body);
    res.json({ updatedRouteNode });
  },

  deleteRouteNode: async (req, res) => {
    const { id } = req.params;
    const deletedRouteNode = await nodeService.deleteRouteNode(id);
    res.json({ deletedRouteNode });
  },
};
