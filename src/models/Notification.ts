import mongoose from "mongoose";
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  type: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
