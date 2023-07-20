const express = require("express");
const router = express.Router();
const { getError } = require("../../controllers/live/jcmtsmuewController");

router.get("/", getError);

module.exports = router;
