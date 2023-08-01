const express = require("express");
const router = express.Router();
const { getSC2INDEX } = require("../../controllers/live/sc2indexController");

router.get("/", getSC2INDEX);

module.exports = router;
