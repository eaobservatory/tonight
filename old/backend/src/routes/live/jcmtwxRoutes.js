const express = require("express");
const router = express.Router();
const { getJCMTWX } = require("../../controllers/live/jcmtwxController");

router.get("/", getJCMTWX);

module.exports = router;
