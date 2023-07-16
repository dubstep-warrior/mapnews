const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  profile_img: {
    type: String,
    required: false
  }
}, {collection: 'users'});

module.exports = User = mongoose.model("User", userSchema);
