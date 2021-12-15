const router = require("express").Router();
const Workout = require("../models/workout");

router.get("/", (req, res) => {
    res.sendFile('index.html', { root: 'public' })
});

module.exports = router;