const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adyacencySchema = new Schema({
  origen: {
    type: String,
    required: true,
    minLenght: 1,
    maxLenght: 10,
  },
  detination: {
    type: String,
    required: true,
    minLenght: 1,
    maxLenght: 10,
  },
  weight: {
    type: Number,
    required: true,
    min: 1,
  },
});

const Adyacency = mongoose.model("Adyacency", adyacencySchema);

module.exports = Adyacency;
