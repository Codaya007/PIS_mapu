const mongoose = require("mongoose");
const { nomenclatureSchema } = require("./Nomenclature");
const Schema = mongoose.Schema;

const subNodeSchema = new Schema({
  latitude: {
    type: String,
    required: true,
    minLength: 1,
  },
  longitude: {
    type: String,
    required: true,
    minLength: 1,
  },
  name: {
    type: String,
    required: true,
    minLength: 1,
  },
  description: {
    type: String,
    required: false,
    minLength: 1,
  },
  nomenclature: nomenclatureSchema,
});

const SubNode = mongoose.model("subnode", subNodeSchema);

module.exports = SubNode;
