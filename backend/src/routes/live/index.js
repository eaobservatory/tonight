const express = require("express");
const router = express.Router();

router.use("/jcmtwx", require("./jcmtwxRoutes"));
router.use("/jcmtnamakanui", require("./jcmtnamakanuiRoutes"));

module.exports = router;
