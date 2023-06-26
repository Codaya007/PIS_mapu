const authService = require("../services/authService");
const { generateNewToken } = require("../helpers/tokenCreation");
const { TRANSPORTER } = require("../constants/index");
const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const { use } = require("../routes/auth.routes");

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

  generatePasswordRecoveryToken: async (req, res) => {
    const { email } = req.body;
    const token = await authService.generatePasswordRecoveryToken(email);
    
    const mailOptions = {
      from: TRANSPORTER.options.auth.user,
      to: email,
      subject: "Recuperación de contraseña",
      text: `Enlace para recuperar contraseña: http://localhost:3000/recovery-password?token=${token}`,
    };

    await TRANSPORTER.sendMail(mailOptions);

    return res.json({ token });
  },

  recoverPassword: async (req, res) => {
    const token = req.query.token;
    const user = await authService.validateToken(token);
    user.password = await authService.hashPassword(req.body.password);
    user.save();

    return res.json({ user });
  },
};
