const express = require("express");
const router = express.Router();
const { getStatus } = require("../../controllers/live/jcmtnamakanuiController");

router.get("/", getStatus);

module.exports = router;
