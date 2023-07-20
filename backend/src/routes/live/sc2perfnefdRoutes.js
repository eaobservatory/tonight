const express = require("express");
const router = express.Router();
const { getPerf } = require("../../controllers/live/sc2perfnefdController");

router.get("/", getPerf);

module.exports = router;
