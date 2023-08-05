const express = require("express");
const router = express.Router();
const { getComments } = require("../../controllers/live/commentsController");

router.get("/", getComments);

module.exports = router;
