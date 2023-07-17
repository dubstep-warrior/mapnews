const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = Schema({ 
  article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  time: {
    type: Date,
    default: Date.now(),
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = Notification = mongoose.model("Article", notificationSchema);
