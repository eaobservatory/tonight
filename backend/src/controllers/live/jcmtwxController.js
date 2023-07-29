const { redisClient } = require("../../config/redis");

const getJCMTWX = async (req, res) => {
  try {
    const data = JSON.parse(await redisClient.get("jcmtwx"));
    res.json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from Redis" });
  }
};

module.exports = {
  getJCMTWX,
};
