const Bcrypt = require("bcrypt");
const userService = require("../services/userService");
const registerService = require("../services/registerService");
const User = require("../models/User");
const { generateNewToken } = require("../helpers/tokenCreation");

//TODO: Determinate the correct paramether on userController.getUser
//TODO: Determinate password
module.exports = {
  validateLogin: async (req, res) => {
    try {
      let user = await userService.getUser({ name: req.body.name });
      // let hola = await generateNewToken(req.body);
      // res.status(200).json(hola);
      let compare = Bcrypt.compareSync(req.body.password, user.password);
      if (compare) {
        res.status(200).json(user);
      } else {
        res.status(401).json("Wrong credentials");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  registerUser: async (req, res) => {
    try {
      const salt = 5;
      const passwordHashed = await Bcrypt.hash(req.body.password, salt);
      let user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        avatar: req.body.avatar,
        password: passwordHashed,
      });
      let saveUser = await registerService.createUser(user);
      res.status(201).json(saveUser);
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },

  getAllUser: async (req, res) => {
    try {
      const totalUser = await userService.getAllUser();
      res.status(200).json(totalUser);
    } catch (error) {
      res.status(400).json(`Error ${error}`);
    }
  },

  updateUser: async (req, res) => {
    try {
      if (req.params.id) {
        const updateUser = await userService.updateUser(
          req.params.id,
          req.body
        );
        res.status(200).json(updateUser);
      }
    } catch (error) {
      res.status(500).json(`Error ${error}`);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await userService.deleteUser(req.params.id);
      res.status(200).json(deletedUser);
    } catch (error) {}
  },
};
