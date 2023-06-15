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
  //accessPoints: {
  //  type: Array,
  //  required: true,
  //}
});

const Campus = mongoose.model("Campus", campusSchema);

module.exports = Campus;