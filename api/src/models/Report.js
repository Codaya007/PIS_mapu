const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    node: {
        type: Number,
        required: false,
    },
    subnode: {
        type: Number,
        required: false,
    },
    comment: {
        type: String,
        required: false,
        default: ""
    },
    revised: {
        type: Boolean,
        required: true,
    },
    lostPoint: {
        type: Schema.Types.ObjectId,
        ref: "LostPoint",
        requiered: false
    }
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
