const express = require("express");
const router = express.Router();
const { getWeather } = require("../../controllers/live/jcmtwxController");

router.get("/", getWeather);

module.exports = router;
