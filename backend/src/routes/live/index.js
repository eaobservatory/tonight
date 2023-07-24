const express = require("express");
const router = express.Router();

router.use("/jcmtwx", require("./jcmtwxRoutes"));
router.use("/jcmtnamakanui", require("./jcmtnamakanuiRoutes"));
router.use("/jcmtsc2", require("./jcmtsc2Routes"));

module.exports = router;
