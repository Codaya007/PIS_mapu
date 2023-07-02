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
  accessPoints: {
    type: [[String]],
    required: true,
    // validate: {
    //   validator: function (arr) {
    //     return arr.length === 1 && arr[0].length === 2;
    //   },
    //   message:
    //     "accessPoints must be an array of a single array with 2 elements.",
    // },
  },
});

const Campus = mongoose.model("Campus", campusSchema);

module.exports = Campus;
