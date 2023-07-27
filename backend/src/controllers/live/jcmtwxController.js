const { redisClient } = require("../../config/redis");

const getJCMTWX = async (req, res) => {
  const data = JSON.parse(await redisClient.get("jcmtwx"));
  res.json(data);
};

module.exports = {
  getJCMTWX,
};
