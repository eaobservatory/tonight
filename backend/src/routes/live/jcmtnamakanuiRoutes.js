const express = require("express");
const router = express.Router();
const {
  getJCMTNAMAKANUI,
} = require("../../controllers/live/jcmtnamakanuiController");

router.get("/", getJCMTNAMAKANUI);

module.exports = router;
