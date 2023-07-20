import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
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
    },
    profile_img: {
      type: String,
      required: false,
    },
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);
export default User;
