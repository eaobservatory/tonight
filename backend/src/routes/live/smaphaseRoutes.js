const express = require("express");
const router = express.Router();
const { getSeeing } = require("../../controllers/live/smaphaseController");

router.get("/", getSeeing);

module.exports = router;
