const suscriptionService = require("../services/suscriptionService");

module.exports = {
  createSuscription: async (req, res) => {
    const newSuscription = await suscriptionService.createSuscription(
      req.user.email,
      req.body.eventName
    );
    return res.json({ newSuscription });
  },

  getAllSuscriptions: async (req, res) => {
    const { skip = 0, limit = 10 } = req.query;
    const suscriptions = await suscriptionService.getAllSuscriptions(req.query);
    const totalSuscriptions = await suscriptionService.getCountSuscriptions(
      req.query,
      skip,
      limit
    );
    return res.json({ totalSuscriptions, suscriptions });
  },

  getSuscriptionById: async (req, res) => {
    const { id } = req.params;
    const suscription = await suscriptionService.getSuscriptionById(id);
    return res.json(suscription);
  },

  updateSuscription: async (req, res) => {
    const { id } = req.params;
    const updatedSuscription = await suscriptionService.updateSuscription(
      id,
      req.user.email,
      req.body
    );
    return res.json(updatedSuscription);
  },

  deleteSuscription: async (req, res) => {
    const { id } = req.params;
    const deletedSuscription = await suscriptionService.deleteSuscription(
      id,
      req.user.email
    );
    return res.json({ deletedSuscription });
  },
};
