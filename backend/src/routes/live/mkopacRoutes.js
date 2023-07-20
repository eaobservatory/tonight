const express = require("express");
const router = express.Router();
const { getTau } = require("../../controllers/live/mkopacController");

router.get("/", getTau);

module.exports = router;
