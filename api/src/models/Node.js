const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
    ref: "type",
    required: true,
  },
});

const campusSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
    ref: "type",
    required: true,
  },
});

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
    required: false,
  },
  type: typeSchema,
  campus: campusSchema,
  category: {
    type: String,
    required: false,
    minLength: 2,
    maxLength: 30,
  },
  // type: {
  //   type: String,
  //   required: true,
  //   minLength: 2,
  //   maxLength: 20,
  // },
  adyacency: [
    {
      origin: { type: String, required: false, minLength: 2, maxLength: 20 },
      destinity: { type: String, required: false, minLength: 2, maxLength: 20 },
      weight: { type: Number, required: false, min: 1 },
    },
  ],
});

module.exports = mongoose.model("Node", nodeSchema);
