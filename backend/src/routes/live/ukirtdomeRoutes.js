const express = require("express");
const router = express.Router();
const { getCam } = require("../../controllers/live/ukirtdomeController");

router.get("/", getCam);

module.exports = router;
