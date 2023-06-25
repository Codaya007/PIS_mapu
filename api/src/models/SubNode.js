const mongoose = require("mongoose");
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
  nomenclature: {
    campus: {
      type: String,
      required: true,
      minLength: 1,
    },
    floor: {
      type: String,
      required: true,
      minLength: 1,
    },
    enviroment: {
      type: String,
      required: true,
      minLength: 1,
    },
    subEnviroment: {
      type: String,
      required: false,
      minLength: 1,
    },
    block: {
      type: String,
      required: true,
      minLength: 1,
    },
  },
});

const SubNode = mongoose.model("subnode", subNodeSchema);
module.exports = SubNode;
