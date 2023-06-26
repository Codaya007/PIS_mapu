const bcrypt = require("bcrypt");
const { NORMAL_ROLE_NAME } = require("../constants");
const ValidationError = require("../errors/ValidationError");
const User = require("../models/User");
const { generateUrlFriendlyToken } = require("../helpers");
const InvalidToken = require("../errors/InvalidToken");

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new ValidationError("Credenciales incorrectas");

  const compare = Bcrypt.compareSync(password, user.password);

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

const hashPassword = async (password) => {
  const salt = 10;

  const passwordHashed = await bcrypt.hash(password, salt);

  return passwordHashed;
};

const generatePasswordRecoveryToken = async (email) => {
  const user = await User.findOne({ email });

  if (!user) throw new ValidationError("El usuario no existe");

  const token = generateUrlFriendlyToken();

  user.token = token;
  user.tokenExpiresAt = new Date(Date.now() + 3 * 60 * 60 * 1000);
  await user.save();

  return token;
};

const validateToken = async (token) => {
  const user = await User.findOne({ token });
  
  if(!user){
    throw new InvalidToken("Token no válido");
  }

  if(Date.now() > user.tokenExpiresAt){
    throw new InvalidToken("El token a expirado");
  }

  return user;
}

module.exports = {
  login,
  register,
  hashPassword,
  generatePasswordRecoveryToken,
  validateToken,
};
