const campusService = require("../services/campusService.js");

module.exports = {
  createCampus: async (req, res, next) => {
    const newCampus = await campusService.createCampus(req.body);

    return res.json(newCampus);
  },
  
  getAllCampus: async (req, res) => {
    const { skip = 0, limit = 10 } = req.query;

    const totalCount = await campusService.getCountCampuses(req.query);
    const results = await campusService.getCampuses(req.query, skip, limit);

    return res.json({ totalCount, results });
  },

  getCampusById: async (req, res) => {
    const campus = await campusService.getCampusById(req.params.id);

    return res.json(campus);
  },

  updateCampusById: async (req, res) => {
    console.log(req.query);
    const updateCampus = await campusService.updateCampusById(req.params.id, req.body);

    return res.json(updateCampus);
  },

  deleteCampusById: async (req, res) => {
    const campusDeleted = await campusService.deleteCampusById(req.params.id);
  
    return res.json(campusDeleted);
  },

  deleteCampus: async (req, res) => {
    const numberCampusesDeleted = await campusService.deleteCampus(req.body);

    return res.json(numberCampusesDeleted);
  }
};