const { redisClient } = require("../../config/redis");

const getJCMTNAMAKANUI = async (req, res) => {
  try {
    const data = JSON.parse(await redisClient.get("jcmtnamakanui"));
    res.json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from Redis" });
  }
};

module.exports = {
  getJCMTNAMAKANUI,
};
