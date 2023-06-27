const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nodeSchema = new Schema({
  latitude: {
    type: String,
    required: true,
    minLength: 1,
    unique: true,
  },
  longitude: {
    type: String,
    required: true,
    minLength: 1,
    unique: true,
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
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  sector: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  adyacency: [
    {
      origin: { type: String, required: false, minLength: 2, maxLength: 20 },
      destinity: { type: String, required: false, minLength: 2, maxLength: 20 },
      weight: { type: Number, required: false, min: 1 },
    },
  ],
});

module.exports = mongoose.model("Node", nodeSchema);
