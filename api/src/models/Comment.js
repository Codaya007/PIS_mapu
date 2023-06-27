const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,  // Tipo ObjectId para referencia
    ref: 'User',  // Nombre del modelo referenciado
    required: true
  },
  node: {
    type: Schema.Types.ObjectId,  // Tipo ObjectId para referencia
    ref: 'User',  // Nombre del modelo referenciado
    required: true
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;