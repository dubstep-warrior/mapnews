import mongoose from "mongoose";
const Schema = mongoose.Schema;

const configSchema = new Schema(
  {
    form: {
      type: Object,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { collection: "form" }
);

const Config = mongoose.model("Config", configSchema);
export default Config;
