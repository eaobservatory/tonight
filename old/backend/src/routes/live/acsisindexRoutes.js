const express = require("express");
const router = express.Router();
const {
  getACSISINDEX,
} = require("../../controllers/live/acsisindexController");

router.get("/", getACSISINDEX);

module.exports = router;
