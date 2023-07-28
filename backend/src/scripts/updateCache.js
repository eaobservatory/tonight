const { redisClient } = require("../config/redis");
const { queryPV } = require("../utils/engarchive");
const { getDateArray } = require("../utils/date");

/**
 * Queries PVs from the engineering archive and stores the data in the Redis cache.
 * The Redis cache is then retrieved by API calls.
 *
 * @async
 * @function
 * @throws Will throw an error if the Redis client fails to set the data.
 */
async function updateCache() {
  const currentTime = new Date();
  console.log("\n**** UPDATING CACHE ****\t", currentTime, "\n");
  const dateArray = getDateArray();

  // jcmtwx
  const jcmtwx = {
    dateArray: dateArray,
    "ws:wxt510:stat:airTemp": {
      label: "temperature (deg C)",
      data: await queryPV("ws:wxt510:stat:airTemp", dateArray),
    },
    "ws:wxt510:stat:humidity": {
      label: "relative humidity (pct)",
      data: await queryPV("ws:wxt510:stat:humidity", dateArray),
    },
    "ws:wxt510:stat:pressure": {
      label: "barometric pressure (mbar)",
      data: await queryPV("ws:wxt510:stat:pressure", dateArray),
    },
    "ws:wxt510:stat:windSpd": {
      label: "wind speed (mph)",
      data: await queryPV("ws:wxt510:stat:windSpd", dateArray),
    },
    "ws:wxt510:stat:windDir": {
      label: "wind direction (deg)",
      data: await queryPV("ws:wxt510:stat:windDir", dateArray),
    },
    "enviro:dewpoint": {
      label: "dewpoint",
      data: await queryPV("enviro:dewpoint", dateArray),
    },
  };
  await redisClient.set("jcmtwx", JSON.stringify(jcmtwx));

  // jcmtsc2
  const jcmtsc2 = {
    dateArray: dateArray,
    "scu2CCS:ls218a:t2": {
      label: "60k shield ptc near (< 41.0 K)",
      data: await queryPV("scu2CCS:ls218a:t2", dateArray),
    },
    "scu2CCS:ls218b:t1": {
      label: "4k box ptc near (< 4.8 K)",
      data: await queryPV("scu2CCS:ls218b:t1", dateArray),
    },
    "scu2CCS:ls370a:chan1:k": {
      label: "still (< 1.0 K)",
      data: await queryPV("scu2CCS:ls370a:chan1:k", dateArray),
    },
    "scu2CCS:ls370c:chan:k": {
      label: "mix chamb (< 0.105 K)",
      data: await queryPV("scu2CCS:ls370c:chan:k", dateArray),
    },
  };
  await redisClient.set("jcmtsc2", JSON.stringify(jcmtsc2));

  // jcmtnamakanui
  const jcmtnamakanui = {
    dateArray: dateArray,
    "nmnCryo:ls:temp1": {
      label: "cold head 2nd stage (< 3.5 K)",
      data: await queryPV("nmnCryo:ls:temp1", dateArray),
    },
    "nmnCryo:ls:temp2": {
      label: "4K plate (< 4.2 K)",
      data: await queryPV("nmnCryo:ls:temp2", dateArray),
    },
    "nmnCryo:ls:temp3": {
      label: "cold head 1st stage (< 22 K)",
      data: await queryPV("nmnCryo:ls:temp3", dateArray),
    },
    "nmnCryo:ls:temp4": {
      label: "outer shield (< 100 K)",
      data: await queryPV("nmnCryo:ls:temp4", dateArray),
    },
  };
  await redisClient.set("jcmtnamakanui", JSON.stringify(jcmtnamakanui));

  console.log("\n**** CACHE UPDATED ****\n");
}

module.exports = {
  updateCache,
};
