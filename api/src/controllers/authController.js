const authService = require("../services/authService");
const { generateNewToken } = require("../helpers/tokenCreation");

module.exports = {
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    const user = authService.login(email, password);

    if (user) {
      const payload = { id: user.id };
      const token = await generateNewToken(payload);

      return res.json({ user, token });
    }

    next({ status: 401, message: "Credenciales incorrectas" });
  },

  registerUser: async (req, res) => {
    const user = await authService.register(req.body);

    const payload = { id: user.id };
    const token = await generateNewToken(payload);

    return res.json({ user, token });
  },
};
