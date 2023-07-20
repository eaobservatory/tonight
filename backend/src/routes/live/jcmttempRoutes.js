const express = require("express");
const router = express.Router();
const { getTemp } = require("../../controllers/live/jcmttempController");

router.get("/", getTemp);

module.exports = router;
