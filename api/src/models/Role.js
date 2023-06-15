const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 30,
    },
});

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;