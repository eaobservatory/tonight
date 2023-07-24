const { queryPV } = require("../../utils/engarchive");
const { getDateArray } = require("../../utils/date");

const getJCMTWX = async (req, res) => {
  const dateArray = getDateArray();

  res.json({
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
  });
};

module.exports = {
  getJCMTWX,
};
