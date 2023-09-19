import mongoose from "mongoose";
import { IUser } from "../utils/interfaces/user.interface";
const Schema = mongoose.Schema;

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profile_img: {
      type: String,
      required: false,
    },
    usage: {
      type: Object,
      select: false,
    },
  },
  { collection: "users" },
);

const User = mongoose.model("User", userSchema);
export default User;
