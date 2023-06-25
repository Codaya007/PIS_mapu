const { NORMAL_ROLE_NAME } = require("../constants");
const ValidationError = require("../errors/ValidationError");
const User = require("../models/User");
const Role = require("../models/Role");
const { hashPassword } = require("../helpers/hashPassword");

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new ValidationError("Credenciales incorrectas");

  const compare = bcrypt.compareSync(password, user.password);

  if (!compare) {
    throw new ValidationError("Credenciales incorrectas");
  }
  return user;
};

const register = async ({ password, ...newInfo }) => {
  // Busco el rol del usuario normal
  const role = await Role.findOne({ name: NORMAL_ROLE_NAME });

  if (role) newInfo.role = role.name;

  const hashedPassword = await hashPassword(password);
  newInfo.password = hashedPassword;

  const user = await User.create({
    ...newInfo,
    settings: {
      nofitication: true,
      spam: true,
    },
  });

  return user;
};

module.exports = {
  login,
  register,
};
