const express = require("express");
const router = express.Router();
const { getJCMTSMU } = require("../../controllers/live/jcmtsmuController");

router.get("/", getJCMTSMU);

module.exports = router;
