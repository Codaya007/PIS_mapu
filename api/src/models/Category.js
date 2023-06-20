const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,
    required: false,
    maxlength: 200,
  },
  icon: {
    type: String,
    required: false,
    maxlength: 500,
  }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;