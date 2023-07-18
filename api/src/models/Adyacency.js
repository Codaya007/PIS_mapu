const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adyacencySchema = new Schema({
  origen: {
    type: String,
    required: true,
    ref: "Node",
  },
  detination: {
    type: String,
    required: true,
    ref: "Node",
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Adyacency = mongoose.model("Adyacency", adyacencySchema);

module.exports = Adyacency;
