const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const suscriptionSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 5,
  },
  eventName: {
    type: String,
    required: true,
  },
});

const Suscription = mongoose.model("suscriptions", suscriptionSchema);
module.exports = Suscription;
