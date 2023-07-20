const express = require("express");
const router = express.Router();

router.use("/jcmtwx", require("./jcmtwxRoutes"));
router.use("/smaphase", require("./smaphaseRoutes"));
router.use("/mkopac", require("./mkopacRoutes"));
router.use("/jcmttemp", require("./jcmttempRoutes"));
router.use("/jcmtcam", require("./jcmtcamRoutes"));
router.use("/jcmtdome", require("./jcmtdomeRoutes"));
router.use("/ukirtdome", require("./ukirtdomeRoutes"));
router.use("/jcmtposn", require("./jcmtposnRoutes"));
router.use("/jcmtsmuns", require("./jcmtsmunsRoutes"));
router.use("/jcmtsmuew", require("./jcmtsmuewRoutes"));
router.use("/jcmtharp", require("./jcmtharpRoutes"));
router.use("/jcmtnamakanui", require("./jcmtnamakanuiRoutes"));
router.use("/jcmtsc2", require("./jcmtsc2Routes"));
router.use("/sc2perffcf", require("./sc2perffcfRoutes"));
router.use("/sc2perfnefd", require("./sc2perfnefdRoutes"));
router.use("/sc2perfflat", require("./sc2perfflatRoutes"));
router.use("/sc2perfnoise", require("./sc2perfnoiseRoutes"));

module.exports = router;
