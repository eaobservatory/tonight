const express = require("express");
const router = express.Router();
const { getJCMTNAMA } = require("../../controllers/live/jcmtnamaController");

router.get("/", getJCMTNAMA);

module.exports = router;
