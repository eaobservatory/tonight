const redis = require("redis");

const redisClient = redis.createClient(); // will need to pass production instance of redis

(async () => {
  try {
    await redisClient.connect();
    console.log("Redis client connected");
  } catch (err) {
    console.error("Error occurred with Redis client:", err);
  }
})();

module.exports = {
  redisClient,
};
