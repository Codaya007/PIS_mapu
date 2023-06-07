const facultyService = require("../services/facultyService.js");

module.exports = {
  getAllFaculties: async (req, res) => {
    const { skip = 0, limit = 10 } = req.query;

    const totalCount = await facultyService.getCountFaculties(req.query);
    const results = await facultyService.getFaculties(req.query, skip, limit);

    return res.json({ totalCount, results });
  },

  createFaculty: async (req, res, next) => {
    const newFaculty = await facultyService.createFaculty(req.body);

    return res.json(newFaculty);
  },
};
