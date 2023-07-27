const { redisClient } = require("../../config/redis");

const getJCMTNAMAKANUI = async (req, res) => {
  const data = JSON.parse(await redisClient.get("jcmtnamakanui"));
  res.json(data);
};

module.exports = {
  getJCMTNAMAKANUI,
};
