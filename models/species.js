const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const speciesSchema = new Schema({
  name: {
    type: String,
  }
});

const Species = mongoose.model("Species", speciesSchema);

module.exports = Species;