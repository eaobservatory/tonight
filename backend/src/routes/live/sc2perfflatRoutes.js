const express = require("express");
const router = express.Router();
const { getPerf } = require("../../controllers/live/sc2perfflatController");

router.get("/", getPerf);

module.exports = router;
