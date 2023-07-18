const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const typeSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   _id: {
//     type: String,
//     ref: "type",
//     required: true,
//   },
// });

// const campusSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   _id: {
//     type: String,
//     ref: "type",
//     required: true,
//   },
// });

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
  type: {
    type: String,
    ref: "Type",
    required: true,
  },
  campus: {
    type: String,
    ref: "Campus",
    required: true,
  },
  category: {
    type: String,
    ref: "Category",
    required: true,
  },
  // type: typeSchema,
  // campus: campusSchema,
  // category: {
  //   type: String,
  //   required: false,
  // },
  // adyacency: [
  //   {
  //     latitude: { type: Number, required: false, min: -200, max: 200 },
  //     longitude: {
  //       type: Number,
  //       required: false,
  //       minLength: -200,
  //       maxLength: 20,
  //     },
  //     weight: { type: Number, required: false, min: 1, max: 400 },
  //   },
  // ],
});
const Node = mongoose.model("Node", nodeSchema);

module.exports = Node;
