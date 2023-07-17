const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actionSchema = Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  actionType: {
    type: String,
    required: true,
  },
  article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  time: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = Action = mongoose.model("Article", actionSchema);
