const express = require("express");
const router = express.Router();
const { getPerf } = require("../../controllers/live/sc2perfnoiseController");

router.get("/", getPerf);

module.exports = router;
