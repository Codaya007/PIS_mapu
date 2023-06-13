const roleService = require("../services/roleServices");

module.exports = {
  createRole: async (req, res, next) => {
    console.log('first')
    console.log(req.query);
    const newRole = await roleService.createRole(req.body);
    // res.status(201).json(newRole);
    return res.json(newRole);
  },
};
