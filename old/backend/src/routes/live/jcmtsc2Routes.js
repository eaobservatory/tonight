const express = require("express");
const router = express.Router();
const { getJCMTSC2 } = require("../../controllers/live/jcmtsc2Controller");

router.get("/", getJCMTSC2);

module.exports = router;
