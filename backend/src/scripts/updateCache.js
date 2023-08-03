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
  const pvs = [
    "ws:wxt510:stat:airTemp",
    "ws:wxt510:stat:humidity",
    "ws:wxt510:stat:pressure",
    "ws:wxt510:stat:windSpd",
    "ws:wxt510:stat:windDir",
    "enviro:dewpoint",
    "scu2CCS:ls218a:t2",
    "scu2CCS:ls218b:t1",
    "scu2CCS:ls370a:chan1:k",
    "scu2CCS:ls370c:chan:k",
    "nmnCryo:ls:temp1",
    "nmnCryo:ls:temp2",
    "nmnCryo:ls:temp3",
    "nmnCryo:ls:temp4",
  ]; // PV names
  const results = {}; // PV data

  // query all PVs and store in results
  for (let pv of pvs) {
    const key = pv.replace(/:/g, "_");
    results[key] = await queryPV(pv, dateArray);
  }

  // jcmtwx
  const jcmtwx = {
    dateArray: dateArray,
    "ws:wxt510:stat:airTemp": {
      label: "temperature (deg C)",
      data: results["ws_wxt510_stat_airTemp"],
    },
    "ws:wxt510:stat:humidity": {
      label: "relative humidity (pct)",
      data: results["ws_wxt510_stat_humidity"],
    },
    "ws:wxt510:stat:pressure": {
      label: "barometric pressure (mbar)",
      data: results["ws_wxt510_stat_pressure"],
    },
    "ws:wxt510:stat:windSpd": {
      label: "wind speed (mph)",
      data: results["ws_wxt510_stat_windSpd"],
    },
    "ws:wxt510:stat:windDir": {
      label: "wind direction (deg)",
      data: results["ws_wxt510_stat_windDir"],
    },
    "enviro:dewpoint": {
      label: "dewpoint",
      data: results["enviro_dewpoint"],
    },
  };
  await redisClient.set("jcmtwx", JSON.stringify(jcmtwx));

  // jcmtsc2
  const jcmtsc2 = {
    dateArray: dateArray,
    "scu2CCS:ls218a:t2": {
      label: "60k shield ptc near (< 41.0 K)",
      data: results["scu2CCS_ls218a_t2"],
    },
    "scu2CCS:ls218b:t1": {
      label: "4k box ptc near (< 4.8 K)",
      data: results["scu2CCS_ls218b_t1"],
    },
    "scu2CCS:ls370a:chan1:k": {
      label: "still (< 1.0 K)",
      data: results["scu2CCS_ls370a_chan1_k"],
    },
    "scu2CCS:ls370c:chan:k": {
      label: "mix chamb (< 0.105 K)",
      data: results["scu2CCS_ls370c_chan_k"],
    },
  };
  await redisClient.set("jcmtsc2", JSON.stringify(jcmtsc2));

  // jcmtnama
  const jcmtnama = {
    dateArray: dateArray,
    "nmnCryo:ls:temp1": {
      label: "cold head 2nd stage (< 3.5 K)",
      data: results["nmnCryo_ls_temp1"],
    },
    "nmnCryo:ls:temp2": {
      label: "4K plate (< 4.2 K)",
      data: results["nmnCryo_ls_temp2"],
    },
    "nmnCryo:ls:temp3": {
      label: "cold head 1st stage (< 22 K)",
      data: results["nmnCryo_ls_temp3"],
    },
    "nmnCryo:ls:temp4": {
      label: "outer shield (< 100 K)",
      data: results["nmnCryo_ls_temp4"],
    },
  };
  await redisClient.set("jcmtnama", JSON.stringify(jcmtnama));

  console.log("\n**** CACHE UPDATED ****\n");
}

// clears the Redis cache (scheduled for every midnight in server.js)
async function clearCache() {
  return new Promise((resolve, reject) => {
    client.flushdb((err, succeeded) => {
      if (err) reject(err);
      else resolve(succeeded);
    });
  });
}

module.exports = {
  updateCache,
  clearCache,
};
