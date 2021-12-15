const { Vehicle } = require('../models');

module.exports = {
    getVehciles(req, res) {
      Vehicle.find()
        .then((vihicles) => res.json(vihicles))
        .catch((err) => res.status(500).json(err));
    },
};