const { queryPV } = require("../../utils/engarchive");
const { getDateArray } = require("../../utils/date");

const getJCMTNAMAKANUI = async (req, res) => {
  const dateArray = getDateArray();

  res.json({
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
  });
};

module.exports = {
  getJCMTNAMAKANUI,
};
