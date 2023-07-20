const express = require("express");
const router = express.Router();
const { getError } = require("../../controllers/live/jcmtsmunsController");

router.get("/", getError);

module.exports = router;
