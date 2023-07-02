const { Double } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//TODO: AGREGAR EL CAMPO HORA??
const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  sinceDate: {
    type: Date,
    required: true,
  },
  untilDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
