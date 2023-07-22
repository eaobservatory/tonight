const { queryPV } = require("../../utils/engarchive");
const { getDateArray } = require("../../utils/date");

const getJCMTWX = async (req, res) => {
  dateArray = getDateArray();
  // const ws_wxt510_stat_airTemp = await queryPV("ws:wxt510:stat:airTemp");
  // const ws_wxt510_stat_humidity = await queryPV("ws:wxt510:stat:humidity");
  // const ws_wxt510_stat_pressure = await queryPV("ws:wxt510:stat:pressure");
  // const ws_wxt510_stat_windSpd = await queryPV("ws:wxt510:stat:windSpd");
  const ws_wxt510_stat_windDir = await queryPV(
    "ws:wxt510:stat:windDir",
    dateArray
  );

  res.json({
    // "ws:wxt510:stat:airTemp": {
    //   label: "temperature (deg C)",
    //   data: ws_wxt510_stat_airTemp,
    // },
    // "ws:wxt510:stat:humidity": {
    //   label: "relative humidity (pct)",
    //   data: ws_wxt510_stat_humidity,
    // },
    // "ws:wxt510:stat:pressure": {
    //   label: "barometric pressure (mbar)",
    //   data: ws_wxt510_stat_pressure,
    // },
    // "ws:wxt510:stat:windSpd": {
    //   label: "wind speed (mph)",
    //   data: ws_wxt510_stat_windSpd,
    // },
    "ws:wxt510:stat:windDir": {
      label: "wind direction (deg)",
      data: ws_wxt510_stat_windDir,
    },
    // "enviro:dewpoint": "enviro:dewpoint",
  });
};

module.exports = {
  getJCMTWX,
};
