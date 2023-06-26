const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lostPointSchema = new Schema({
  latitude: {
    type: Number,
    required: true,
    min: -200,
    max: 200
  },  
  length: {
    type: Number,
    required: true,
    min: -200,
    max: 200
  },
});

const LostPoint = mongoose.model("LostPoint", lostPointSchema);

module.exports = LostPoint;
