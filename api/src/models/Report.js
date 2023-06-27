const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//TODO FALTA LA CREACION DE SUBNODO
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
        minLength: 3,
        maxLength: 200

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
