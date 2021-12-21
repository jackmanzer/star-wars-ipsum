const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  name: {
    type: String,
  }
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;