const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
  },
  lastname: {
    type: String,
    required: true,
    min: 3,
    max: 25,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 30,
    unique: true,
  },
  avatar: {
    type: String,
    required: false,
    default:
      "https://i.pinimg.com/474x/5d/69/42/5d6942c6dff12bd3f960eb30c5fdd0f9.jpg",
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 30,
  },
  settings: {
    nofitication: {
      type: Boolean,
      required: false,
      default: false,
    },
    spam: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  role: {
    type: String,
    required: false,
  },
});

// Override the 'toJSON' function to customize the JSON output
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
