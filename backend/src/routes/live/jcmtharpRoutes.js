const express = require("express");
const router = express.Router();
const { getStatus } = require("../../controllers/live/jcmtharpController");

router.get("/", getStatus);

module.exports = router;
