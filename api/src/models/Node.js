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
    type: Schema.Types.ObjectId,
    ref: "Type",
    required: true,
  },
  campus: {
    type: Schema.Types.ObjectId,
    ref: "Campus",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    // required: true,
  },
  detail: {
    type: Schema.Types.ObjectId,
    ref: "Detail",
  },
});

const Node = mongoose.model("Node", nodeSchema);

module.exports = Node;
