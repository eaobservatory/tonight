const express = require("express");
const router = express.Router();

router.use("/jcmtwx", require("./jcmtwxRoutes"));

module.exports = router;
