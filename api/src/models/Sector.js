const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectorSchema = new Schema({
  number: {
    type: Number,
    required: true,
    min: 1,
    max: 30,
    unique: true,
  },
  polygons: [
    {
      value: { type: Number, required: true, min: 1, max: 10 },
    },
  ],
});

module.exports = mongoose.Schema("Sector", sectorSchema);
