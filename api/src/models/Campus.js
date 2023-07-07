const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campusSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  description: {
    type: String,
    required: false,
    default: null,
    maxlength: 200,
  },
  address: {
    type: String,
    required: true,
    maxlength: 300,
  },
  polygon: {
    // Cada array representa un polígono geográfico, cada polígono geográfico está compuesto de arrays del coordenadas del tipo [latitud, longitud]
    type: [[Number, Number]],
    required: true,
  },
  // accessPoints: {
  //   type: [[String]],
  //   required: true,
  // },
});

const Campus = mongoose.model("Campus", campusSchema);

module.exports = Campus;
