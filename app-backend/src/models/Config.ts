import mongoose from "mongoose";
import { IForm } from "../utils/interfaces/form.interface";
const Schema = mongoose.Schema;

const configSchema = new Schema<IForm>(
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
  { collection: "form" },
);

const Config = mongoose.model("Config", configSchema);
export default Config;
