const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  node: {
    type: Schema.Types.ObjectId,
    ref: "Node",
    required: false,
  },
  subnode: {
    type: Schema.Types.ObjectId,
    ref: "Subnode",
    required: false,
  },
  comment: {
    type: String,
    required: false,
    default: "",
    maxLength: 200,
  },
  revised: {
    type: Boolean,
    required: true,
  },
  lostPoint: {
    type: Schema.Types.ObjectId,
    ref: "LostPoint",
    requiered: false,
  },
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
