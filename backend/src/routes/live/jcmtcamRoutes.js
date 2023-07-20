const express = require("express");
const router = express.Router();
const { getCam } = require("../../controllers/live/jcmtcamController");

router.get("/", getCam);

module.exports = router;
