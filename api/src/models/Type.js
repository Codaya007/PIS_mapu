const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  desc: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
});

const Type = mongoose.model("Type", typeSchema);
module.exports = Type;
