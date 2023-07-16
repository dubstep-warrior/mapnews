const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const configSchema = Schema({
  form: {
    type: Object, 
    required: false, 
  },
  name: {
    type: String,
    required: true
  }
}, {collection: 'form'});

module.exports = Config = mongoose.model("Config", configSchema);
