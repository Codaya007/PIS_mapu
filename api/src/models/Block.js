const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blockSchema = new Schema({
  number: {
    type: String,
    required: true,
    unique: true
  },  
  avaible: {
    type: Boolean,
    required: true,
    default: true
  },
  faculty: {
    type: Schema.Types.ObjectId,  // Tipo ObjectId para referencia
    ref: 'Faculty',  // Nombre del modelo referenciado
    required: true
  },
});

const Block = mongoose.model("Block", blockSchema);

module.exports = Block;
