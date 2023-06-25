const userService = require("../services/userService");

module.exports = {
  getAllUsers: async (req, res) => {
    const { skip = 0, limit = 10, ...where } = req.query;

    const result = await userService.getAllUser(where, skip, limit);
    const totalCount = await userService.getCountUser(where);

    res.json({ totalCount, result });
  },

  getUserById: async (req, res, next) => {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    res.json(user);
  },

  updateUser: async (req, res) => {
    const { id } = req.params;

    const user = await userService.updateUser(id, req.body);

    res.json(user);
  },

  deleteUser: async (req, res) => {
    const deletedUser = await userService.deleteUser(req.params.id);

    res.json(deletedUser);
  },
};
