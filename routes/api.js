const router = require("express").Router();
const {
    getVehicles,
  } = require('../controllers/controllers');
   
module.exports = router;


router.route('/vehicles').get(getVehicles);
