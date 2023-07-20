const express = require("express");
const router = express.Router();
const { getPerf } = require("../../controllers/live/sc2perffcfController");

router.get("/", getPerf);

module.exports = router;
