const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const weaponSchema = new Schema({
  name: {
    type: String,
  }
});

const Weapon = mongoose.model("Weapon", weaponSchema);

module.exports = Weapon;