const { redisClient } = require("../../config/redis");

const getJCMTSC2 = async (req, res) => {
  try {
    const data = JSON.parse(await redisClient.get("jcmtsc2"));
    res.json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from Redis" });
  }
};

module.exports = {
  getJCMTSC2,
};
