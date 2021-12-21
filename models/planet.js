const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const planetSchema = new Schema({
  name: {
    type: String,
  }
});

const Planet = mongoose.model("Planet", planetSchema);

module.exports = Planet;