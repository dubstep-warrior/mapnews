import mongoose from "mongoose";
import { INotification } from "../utils/interfaces/notification.interface";
const Schema = mongoose.Schema;

const notificationSchema = new Schema<INotification>({
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
