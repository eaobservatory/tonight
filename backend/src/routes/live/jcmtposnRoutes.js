const express = require("express");
const router = express.Router();
const { getPos } = require("../../controllers/live/jcmtposnController");

router.get("/", getPos);

module.exports = router;
