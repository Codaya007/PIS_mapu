// Para poder usar las variables de entorno en windows
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./src/db/index.js");
const config = require("./config/index.js");
const { errorHandler, errorNotFound } = require("./src/middlewares");

const app = express();
// MongoDB
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/", require("./src/routes/example.routes.js"));
app.use("/faculty", require("./src/routes/faculty.routes.js"));

// errorhandlers
app.use("*", errorNotFound);
app.use(errorHandler);

// listen
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
