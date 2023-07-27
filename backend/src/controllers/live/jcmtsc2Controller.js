const { redisClient } = require("../../config/redis");

const getJCMTSC2 = async (req, res) => {
  const data = JSON.parse(await redisClient.get("jcmtnamakanui"));
  res.json(data);
};

module.exports = {
  getJCMTSC2,
};
