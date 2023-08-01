const { queryJCMT } = require("../../config/mysql");
const { getDateArray } = require("../../utils/date");

const getSC2INDEX = async (req, res) => {
  const dateUTC = getDateArray()[2];
  // const dateStr = `${dateUTC[0]}${dateUTC[1]}${dateUTC[2]}`;
  const dateStr = "20230715"; // for testing only
  const rows = await queryJCMT(
    `SELECT backend, obsnum, utdate, project, object, map_wdth, map_hght, tau225en, wvmtauen, seeingen, roofsten, date_obs FROM SCUBA2 LEFT JOIN COMMON ON SCUBA2.obsid = COMMON.obsid WHERE utdate = ? ORDER BY obsnum DESC`,
    [dateStr]
  );

  res.json(rows);
};

module.exports = {
  getSC2INDEX,
};
