const { queryPV } = require("../../utils/engarchive");
const { getDateArray } = require("../../utils/date");

const getJCMTNAMAKANUI = async (req, res) => {
  const dateArray = getDateArray();
  const nmnCryo_ls_temp1 = await queryPV("nmnCryo:ls:temp1", dateArray);
  const nmnCryo_ls_temp2 = await queryPV("nmnCryo:ls:temp2", dateArray);
  const nmnCryo_ls_temp3 = await queryPV("nmnCryo:ls:temp3", dateArray);
  const nmnCryo_ls_temp4 = await queryPV("nmnCryo:ls:temp4", dateArray);

  res.json({
    "nmnCryo:ls:temp1": {
      label: "Cold Head 2nd stage (<3.5 K)",
      data: nmnCryo_ls_temp1,
    },
    "nmnCryo:ls:temp2": {
      label: "4K Plate (<4.2 K)",
      data: nmnCryo_ls_temp2,
    },
    "nmnCryo:ls:temp3": {
      label: "Cold Head 1st stage (< 22 K)",
      data: nmnCryo_ls_temp3,
    },
    "nmnCryo:ls:temp4": {
      label: "Outer shield (< 100 K)",
      data: nmnCryo_ls_temp4,
    },
  });
};

module.exports = {
  getJCMTNAMAKANUI,
};
