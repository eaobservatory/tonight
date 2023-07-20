const express = require("express");
const router = express.Router();
const { getStatus } = require("../../controllers/live/jcmtsc2Controller");

router.get("/", getStatus);

module.exports = router;
