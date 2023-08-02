const express = require("express");
const router = express.Router();

router.use("/jcmtwx", require("./jcmtwxRoutes"));
router.use("/jcmtnama", require("./jcmtnamaRoutes"));
router.use("/jcmtsc2", require("./jcmtsc2Routes"));
router.use("/jcmtsmu", require("./jcmtsmuRoutes"));
router.use("/comments", require("./commentsRoutes"));
router.use("/acsisindex", require("./acsisindexRoutes"));
router.use("/sc2index", require("./sc2indexRoutes"));

module.exports = router;
