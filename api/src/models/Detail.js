const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detailSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,
    required: false,
    default: null,
    maxlength: 200,
  },
  img: {
    type: String,
    required: false,
  },
  nomenclature: {
    campus: {
      type: Schema.Types.ObjectId, // Tipo ObjectId para referencia
      ref: "campus", // Nombre del modelo referenciado
      required: true,
    },
    block: {
      type: Schema.Types.ObjectId, // Tipo ObjectId para referencia
      ref: "block", // Nombre del modelo referenciado
      required: true,
    },
    floor: {
      type: Number,
      required: false,
    },
    environment: {
      type: Number,
      required: false,
    },
    subEnvironment: {
      type: Number,
      required: false,
    },
    id: {
      type: String,
      ref: "Nomenclature",
      required: true,
    },
  },
  // category: {
  //   ref: "category",
  // },
  // subnodes: {
  //   type: Array,
  // },
});

const Detail = mongoose.model("Detail", detailSchema);

module.exports = Detail;
