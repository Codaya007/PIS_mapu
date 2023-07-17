const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nodeSchema = new Schema({
  latitude: {
    type: Number,
    required: true,
    min: -200,
    max: 200,
  },
  longitude: {
    type: Number,
    required: true,
    min: -200,
    max: 200,
  },
  available: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  category: {
    type: String,
    required: false,
    minLength: 2,
    maxLength: 30,
  },
  sector: {
    type: String,
    required: false,
    // minLength: 2,
    // maxLength: 30,
  },
  adyacency: [
    {
      latitude: { type: Number, required: false, min: -200, max: 200 },
      longitude: {
        type: Number,
        required: false,
        minLength: -200,
        maxLength: 20,
      },
      weight: { type: Number, required: false, min: 1, max: 400 },
    },
  ],
});
const Node = mongoose.model("Node", nodeSchema);
module.exports = Node;
