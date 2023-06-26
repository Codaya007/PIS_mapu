const nodemailer = require("nodemailer");

const EARTH_RADIUS_M = 6371e3;

const NORMAL_ROLE_NAME = "Normal";

const ADMIN_ROLE_NAME = "Administrador";

const TRANSPORTER = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "correo@gmail.com", //correo con el que se va a enviar los mensajes
      pass: "contrasenia",
    },
});

module.exports = { EARTH_RADIUS_M, NORMAL_ROLE_NAME, ADMIN_ROLE_NAME, TRANSPORTER };
