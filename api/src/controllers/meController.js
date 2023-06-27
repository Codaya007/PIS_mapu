const userService = require("../services/userService");

module.exports = {
  getMyProfile: async (req, res) => {
    const id = req.me?._id;

    const user = await userService.getUserById(id);

    return res.json(user);
  },

  updateProfile: async (req, res) => {
    const id = req.me?._id;

    const user = await userService.updateUser(id, req.body);

    return res.json(user);
  },
};
