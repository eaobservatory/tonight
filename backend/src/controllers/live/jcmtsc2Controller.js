const { queryPV } = require("../../utils/engarchive");
const { getDateArray } = require("../../utils/date");

const getJCMTSC2 = async (req, res) => {
  const dateArray = getDateArray();

  res.json({
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
  });
};

module.exports = {
  getJCMTSC2,
};
