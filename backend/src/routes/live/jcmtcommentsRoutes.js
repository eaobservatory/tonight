const express = require("express");
const router = express.Router();
const {
  getJCMTCOMMENTS,
} = require("../../controllers/live/jcmtcommentsController");

router.get("/", getJCMTCOMMENTS);

module.exports = router;
