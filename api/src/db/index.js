const process = require("../../config/index.js");
const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (err) {
    console.log("No ha sido posible realizar una conexión con la BBDD");
    console.log(` Error: ${err.message} `);
  }
};

module.exports = connectDB;
