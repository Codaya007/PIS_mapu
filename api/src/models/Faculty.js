const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facultySchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 150,
  },
  description: {
    type: String,
    required: false,
    default: null,
    max: 200,
  },
  dean: {
    type: String,
    required: false,
    default: null,
    max: 150,
  },
  polygons: {
    type: Array,
    required: true,
  },
});

const Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;
